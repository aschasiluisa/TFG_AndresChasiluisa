import { defineComponent, onMounted, ref, watch } from "vue";

import leaflet from "leaflet";
import { useMapStore } from "@/composables/useMapStore";

export default defineComponent({
    name:'Mapa',
    setup(){
        const currentBaseMap = ref(1);
        const RegistrosCalidadAire = leaflet.layerGroup();

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

       onMounted(() => {
        
        let mapa = leaflet.map("Mapa",{zoomSnap:0.2}).setView([28.655, -17.865],11);

        baseMapsConnections.value[currentBaseMap.value].addTo(mapa);

        leaflet.control.scale().addTo(mapa);

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
                        const marker =leaflet.marker([getRegistrosCalidadAire.value[i].Latitud,getRegistrosCalidadAire.value[i].Longitud]).addTo(RegistrosCalidadAire);

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