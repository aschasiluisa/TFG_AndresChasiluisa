import { defineComponent, onMounted, ref, watch } from "vue";

import { useMapStore } from "@/composables/useMapStore";
import { useAuthStore } from "@/composables/useAuthStore";

import L from 'leaflet';

import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import {Geocoder, geocoders} from 'leaflet-control-geocoder';


export default defineComponent({
    name:'Mapa',
    setup(){
        const currentBaseMap = ref(1);
        const RegistrosCalidadAire = L.layerGroup();
        const RegistrosIncidencias = L.layerGroup();
        const home = ref(false);

        const { 
            selectedBaseMap,
            baseMapsConnections,
            layersControl,
            getRegistrosCalidadAire,
            getRegistrosIncidencias,
            getElementInfoID,
            getBbox,
            registrosCalidadAire,
            registroCalidadAireInfo,
            registrosIncidencias,
            registroIncidenciaInfo,
            resetElementInfoID,
        } = useMapStore();

        const {
            getUserToken,
        } = useAuthStore();

        const limites = L.latLngBounds(
            L.latLng(getBbox.value[0], getBbox.value[1]), // Esquina superior izquierda
            L.latLng(getBbox.value[2], getBbox.value[3])   // Esquina inferior derecha
        );

        const localizacionGeocode = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

        const localizacionEstaciones = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        
        const localizacionIncidenciasVer = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        
        const localizacionIncidencias = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

       onMounted(() => {

        let mapa = L.map("Mapa",{zoomSnap:0.2, maxZoom: 18, minZoom: 10}).setView([28.655, -17.865],11).setMaxBounds(limites);

        baseMapsConnections.value[currentBaseMap.value].addTo(mapa);

        L.control.scale().addTo(mapa);

        const osmGeocoder = new Geocoder({
            geocoder: new geocoders.Nominatim(),
            position: 'topright',
            placeholder: 'Enter street address',
            defaultMarkGeocode: false,
        }).addTo(mapa); 

        let resultMarker: L.Marker;

        // handle geocoding result event
        osmGeocoder.on('markgeocode', e => {
            // center map on result
            mapa.setView([e.geocode.center.lat, e.geocode.center.lng], 17);

            // popup for location
            // todo: use custom icon

            if(resultMarker){
                mapa.removeLayer(resultMarker);
            }

            resultMarker= L.marker([e.geocode.center.lat, e.geocode.center.lng], {icon: localizacionGeocode}).addTo(mapa);

            // add popup to marker with result text
            resultMarker.bindPopup(e.geocode.name).openPopup();
        });

        mapa.on('contextmenu', function (e) {
            // Obtener las coordenadas del punto
            const lat = e.latlng.lat.toFixed(6);
            const lng = e.latlng.lng.toFixed(6);
            const coordinates = `${lat},${lng}`;
          
            // Crear el pop-up y mostrar las coordenadas
            const popup = L.popup()
              .setLatLng(e.latlng)
              .setContent('<button style=" background: transparent; border: none;" id="coor" >'+coordinates+'</button>')
              .openOn(mapa);
          
            // Agregar el evento de clic al pop-up para copiar las coordenadas
            const popupButton = document.getElementById('coor');

            popupButton!.addEventListener('click', function() {
                const textarea = document.createElement('textarea');
                textarea.value = coordinates;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
              });

          });


        if (mapa.hasLayer(baseMapsConnections.value[currentBaseMap.value])) {
            mapa.removeLayer(baseMapsConnections.value[currentBaseMap.value]);
            baseMapsConnections.value[currentBaseMap.value].addTo(mapa);
        }

        watch(selectedBaseMap, () =>{
            mapa.removeLayer(baseMapsConnections.value[currentBaseMap.value]);
            baseMapsConnections.value[selectedBaseMap.value.id].addTo(mapa);
            currentBaseMap.value = selectedBaseMap.value.id;
        })

        watch(layersControl.value, async () => {
            if (layersControl.value[1]){
                
                if(!getRegistrosCalidadAire.value) await registrosCalidadAire(); 

                if(RegistrosCalidadAire.getLayers().length == 0){
                    for (let i = 0; i < getRegistrosCalidadAire.value.length; i++){
                        const marker =L.marker([getRegistrosCalidadAire.value[i].Latitud,getRegistrosCalidadAire.value[i].Longitud],{icon: localizacionEstaciones}).addTo(RegistrosCalidadAire);

                        marker.on('click', async function() {
                            // Obtenemos las coordenadas del marcador
                            const latlng = marker.getLatLng();
                            await registroCalidadAireInfo(getRegistrosCalidadAire.value[i]._id);
                            // Hacemos un flyTo hacia las coordenadas del marcador con una duración de 2 segundo y un zoom de 16
                            mapa.flyTo(latlng, 16, {
                              duration: 2,
                            });
                          });
                    }
                }


                
                RegistrosCalidadAire.addTo(mapa);
            } else {
                mapa.removeLayer(RegistrosCalidadAire);
                if(getElementInfoID.value == 1){
                    resetElementInfoID();
                }
            }

            if (layersControl.value[2]){

                if(!getRegistrosIncidencias.value) await registrosIncidencias(getUserToken.value); 

                if(RegistrosIncidencias.getLayers().length == 0){
                    for (let i = 0; i < getRegistrosIncidencias.value.length; i++){

                        let marker: L.Marker;

                        if(getRegistrosIncidencias.value[i].Validada){
                            marker =L.marker([getRegistrosIncidencias.value[i].Latitud,getRegistrosIncidencias.value[i].Longitud], {icon: localizacionIncidenciasVer}).addTo(RegistrosIncidencias);
                        } else {
                            marker =L.marker([getRegistrosIncidencias.value[i].Latitud,getRegistrosIncidencias.value[i].Longitud], {icon: localizacionIncidencias}).addTo(RegistrosIncidencias);
                        }

                        marker.on('click', async function() {
                            // Obtenemos las coordenadas del marcador
                            const latlng = marker.getLatLng()
                            await registroIncidenciaInfo(getRegistrosIncidencias.value[i]._id)
                            // Hacemos un flyTo hacia las coordenadas del marcador con una duración de 2 segundo y un zoom de 16
                            mapa.flyTo(latlng, 16, {
                              duration: 2,
                            });
                          });
                    }
                }
                
                RegistrosIncidencias.addTo(mapa);
            } else {
                mapa.removeLayer(RegistrosIncidencias);
                if(getElementInfoID.value == 2){
                    resetElementInfoID();
                }
            }
        })

        watch( home, () =>{
            if (home.value){
                mapa.setView([28.655, -17.865],11)
                home.value = false;
            }
        })

       })

       return {
         home : () => home.value = true,
       }
    }
})