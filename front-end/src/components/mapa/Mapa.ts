import { defineComponent, onMounted, ref, watch } from "vue";

import { useMapStore } from "@/composables/useMapStore";
import { useAuthStore } from "@/composables/useAuthStore";

import L from 'leaflet';
import 'leaflet.heat';

import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import {Geocoder, geocoders} from 'leaflet-control-geocoder';
import { periodos } from "@/api/mapAPI";


export default defineComponent({
    name:'Mapa',
    setup(){
        const currentBaseMap = ref(1);
        const RegistrosCalidadAire = L.layerGroup();
        const RegistrosIncidencias = L.layerGroup();
        const RegistrosAlarmas = L.layerGroup();
        const RegistrosTerremotos = L.layerGroup();

        const CapaCarreteras = L.tileLayer.wms('http://localhost:8082/geoserver/TFG-LaPalma/wms', {
            layers: 'TFG-LaPalma:carreteras',
            format: 'image/png',
            minZoom:11,
            zIndex:3,
            transparent: true,
        })
        //http://localhost:8082/geoserver/CAPAStfg/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=200&HEIGHT=200&LAYER=tfg-lapalma_edificaciones
        const CapaEdificios = L.tileLayer.wms('http://localhost:8082/geoserver/CAPAStfg/wms', {
            layers: 'CAPAStfg:tfg-lapalma_edificaciones',
            format: 'image/png',
            minZoom:12,
            zIndex:2,
            transparent: true,
        })

        const CapaParcelas = L.tileLayer.wms('http://localhost:8082/geoserver/CAPAStfg/wms', {
            layers: 'CAPAStfg:tfg-lapalma_parcelas',
            format: 'image/png',
            minZoom:14,
            zIndex:1,
            transparent: true,
        })

        const CapaColaVolcanica = L.tileLayer.wms('http://localhost:8082/geoserver/CAPAStfg/wms', {
            layers: 'CAPAStfg:tfg-lapalma_perimetro_cola',
            format: 'image/png',
            minZoom:11,
            zIndex:4,
            transparent: true,
        })

        const CapaBocaVolcanica = L.tileLayer.wms('http://localhost:8082/geoserver/CAPAStfg/wms', {
            layers: 'CAPAStfg:tfg-lapalma_boca_volcan',
            format: 'image/png',
            transparent: true,
            pane:'popupPane',
        })

        const home = ref(false);

        const { 
            selectedBaseMap,
            baseMapsConnections,
            layersControl,
            sublayersControl_4,
            sublayersControl_5,
            periodo,
            mapaCalor_activada,
            getRegistrosCalidadAire,
            getRegistrosIncidencias,
            getRegistrosAlarmas,
            getRegistrosTerremotos,
            getElementInfoID,
            getLast_registroInfoIDlayer,
            getBbox,
            registrosCalidadAire,
            registroCalidadAireInfo,
            registrosIncidencias,
            registroIncidenciaInfo,
            registrosAlarmas,
            registroAlarmaInfo,
            registrosTerremotos,
            resetElementInfoID,
            resetLast_registroInfoIDlayer,
            resetMapaCalor_fueActivada,
            setElementoInfoID,
            setPeriodo,
            setSublayersControl_4,
            resetSublayersControl_4,
            setSublayersControl_5,
            resetSublayersControl_5,
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

        
        const localizacionIncidenciasVal = new L.Icon({
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

        const localizacionAlarmas = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        const localizacionAlarmasAct = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
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

        let no_activada_4 = true;
        let no_activada_5 = true;
        let lastPeriodo = "";
        let mapaCalor_fueActivada = false;

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
                if(getLast_registroInfoIDlayer.value == 1) resetLast_registroInfoIDlayer();
                if(getElementInfoID.value == 1)resetElementInfoID();
            }

            if (layersControl.value[2]){

                if(!getRegistrosIncidencias.value) await registrosIncidencias(getUserToken.value); 

                if(RegistrosIncidencias.getLayers().length == 0){
                    for (let i = 0; i < getRegistrosIncidencias.value.length; i++){

                        let marker: L.Marker;

                        if(getRegistrosIncidencias.value[i].Validada){
                            marker =L.marker([getRegistrosIncidencias.value[i].Latitud,getRegistrosIncidencias.value[i].Longitud], {icon: localizacionIncidenciasVal}).addTo(RegistrosIncidencias);
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
                if(getLast_registroInfoIDlayer.value == 2) resetLast_registroInfoIDlayer();
                if(getElementInfoID.value == 2)resetElementInfoID();
            }

            if (layersControl.value[3]){

                if(!getRegistrosAlarmas.value){
                    mapa.removeLayer(RegistrosAlarmas);
                    RegistrosAlarmas.clearLayers();
                    await registrosAlarmas(getUserToken.value); 
                }

                if(RegistrosAlarmas.getLayers().length == 0){
                    for (let i = 0; i < getRegistrosAlarmas.value.length; i++){

                        let marker: L.Marker;

                        if(getRegistrosAlarmas.value[i].Activada){
                            marker =L.marker([getRegistrosAlarmas.value[i].Latitud,getRegistrosAlarmas.value[i].Longitud], {icon: localizacionAlarmasAct}).addTo(RegistrosAlarmas);
                        } else {
                            marker =L.marker([getRegistrosAlarmas.value[i].Latitud,getRegistrosAlarmas.value[i].Longitud], {icon: localizacionAlarmas}).addTo(RegistrosAlarmas);
                        }

                        marker.on('click', async function() {
                            // Obtenemos las coordenadas del marcador
                            const latlng = marker.getLatLng()
                            await registroAlarmaInfo(getUserToken.value, getRegistrosAlarmas.value[i]._id)
                            // Hacemos un flyTo hacia las coordenadas del marcador con una duración de 2 segundo y un zoom de 16
                            mapa.flyTo(latlng, 16, {
                              duration: 2,
                            });
                          });
                    }
                }
                
                RegistrosAlarmas.addTo(mapa);
            } else {
                mapa.removeLayer(RegistrosAlarmas);
                if(getLast_registroInfoIDlayer.value == 3) resetLast_registroInfoIDlayer();
                if(getElementInfoID.value == 3)resetElementInfoID();
            }

            if (layersControl.value[4]){
                if(no_activada_4){
                    resetSublayersControl_4();
                    setSublayersControl_4();
                    setElementoInfoID(4);
                }
                no_activada_4 = false;
            } else {
                resetSublayersControl_4();
                if(getElementInfoID.value == 4 && !no_activada_4){
                    resetElementInfoID();
                }
                no_activada_4 = true;
            }

            if (layersControl.value[5]){
                if(no_activada_5){
                    resetSublayersControl_5();
                    setSublayersControl_5()
                    setElementoInfoID(5);
                }
                no_activada_5 = false;
            } else {
                resetSublayersControl_5();
                if(getElementInfoID.value == 5 && !no_activada_5){
                    resetElementInfoID();
                }
                no_activada_5 = true;
            }
        })

        watch(sublayersControl_4.value, () => {
            if(layersControl.value[4]){
                sublayersControl_4.value[1]? CapaCarreteras.addTo(mapa) : mapa.removeLayer(CapaCarreteras);
                sublayersControl_4.value[2]? CapaEdificios.addTo(mapa) : mapa.removeLayer(CapaEdificios);
                sublayersControl_4.value[3]? CapaParcelas.addTo(mapa) : mapa.removeLayer(CapaParcelas);
            } else {
                mapa.removeLayer(CapaCarreteras);
                mapa.removeLayer(CapaEdificios);
                mapa.removeLayer(CapaParcelas);
            }
        })

        watch([sublayersControl_5.value, periodo, mapaCalor_activada] , async () => {
            
            let nuevoPeriodo = false;

            if(layersControl.value[5]){
                sublayersControl_5.value[1]?  CapaBocaVolcanica.addTo(mapa) : mapa.removeLayer(CapaBocaVolcanica);
                sublayersControl_5.value[2]? CapaColaVolcanica.addTo(mapa) : mapa.removeLayer(CapaColaVolcanica);

                if(sublayersControl_5.value[3]){
                    if(!getRegistrosTerremotos.value || lastPeriodo != periodo.value){
                        
                        await registrosTerremotos(periodo.value);
                        lastPeriodo = periodo.value;
                        nuevoPeriodo = true;
                    } 

                    nuevoPeriodo = (mapaCalor_activada.value != mapaCalor_fueActivada)? true : nuevoPeriodo;
                    mapaCalor_fueActivada = mapaCalor_activada.value;

                    if(RegistrosTerremotos.getLayers().length == 0 || nuevoPeriodo ){
                        RegistrosTerremotos.clearLayers()
                        let heatData: (L.LatLng | L.HeatLatLngTuple)[] = [];
                        
                        for (let i = 0; i < getRegistrosTerremotos.value.length; i++){
                            
                           L.circleMarker([getRegistrosTerremotos.value[i][0], getRegistrosTerremotos.value[i][1]], {
                                color: '#8c009c',
                                fillColor: '#e600ff',
                                weight: 1,
                                fillOpacity: 1,
                                radius: 3,
                            }).addTo(RegistrosTerremotos);

                            if(mapaCalor_activada.value) heatData.push([getRegistrosTerremotos.value[i][0], getRegistrosTerremotos.value[i][1], getRegistrosTerremotos.value[i][2]*10+7]);
                        }

                        if(mapaCalor_activada.value) L.heatLayer(heatData,{radius:30}).addTo(RegistrosTerremotos); 
                    }
                    
                    RegistrosTerremotos.addTo(mapa);
                    
                } else {
                    mapa.removeLayer(RegistrosTerremotos);
                }

            } else {
                mapa.removeLayer(CapaBocaVolcanica);
                mapa.removeLayer(CapaColaVolcanica);
                mapa.removeLayer(RegistrosTerremotos);
                setPeriodo(periodos._3)
                resetMapaCalor_fueActivada()
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