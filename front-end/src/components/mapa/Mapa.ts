import { defineComponent, onMounted, ref, watch } from "vue";

import { useMapStore } from "@/composables/useMapStore";

import L from 'leaflet';
import { Icon } from 'leaflet';

import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import {Geocoder, geocoders} from 'leaflet-control-geocoder';


export default defineComponent({
    name:'Mapa',
    setup(){
        const currentBaseMap = ref(1);
        const RegistrosCalidadAire = L.layerGroup();

        const { 
            selectedBaseMap,
            baseMapsConnections,
            layersControl,
            getRegistrosCalidadAire,
            getElementInfoID,
            registrosCalidadAire,
            setElementInfoID,
            resetElementInfoID,
        } = useMapStore();

        const limites = L.latLngBounds(
            L.latLng(28.384151, -18.102722), // Esquina superior izquierda
            L.latLng(28.926439, -17.620697)   // Esquina inferior derecha
        );

        const localizacionGeocode = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
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
                        const marker =L.marker([getRegistrosCalidadAire.value[i].Latitud,getRegistrosCalidadAire.value[i].Longitud]).addTo(RegistrosCalidadAire);

                        marker.on('click', function() {
                            // Obtenemos las coordenadas del marcador
                            const latlng = marker.getLatLng();
                            setElementInfoID({layerID: 1,elementID: i});
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
                if(getElementInfoID.value.layerID == 1){
                    resetElementInfoID();
                }
            }
        })

       })
    }
})