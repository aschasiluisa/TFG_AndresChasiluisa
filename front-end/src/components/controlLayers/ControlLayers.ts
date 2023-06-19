import { defineComponent, ref,  watch, computed } from "vue";
import { useMapStore } from "@/composables/useMapStore";
import ElementInfo from '../elementInfo/ElementInfo.vue'

export default defineComponent({
    name: 'ControlLayers',
    components:{
      ElementInfo,
    },
    setup() {
        // Variables reactivas para controlar el estado de las opciones de mapas y capas
        const showMapOptions = ref(false);
        const layerID = ref();

        const { 
          baseMaps,
          selectedBaseMap,
          layers,
          layersControl,
          getElementInfoID,
          setBaseMap,
          resetLayersControl,
        } = useMapStore();

        resetLayersControl();

        watch(getElementInfoID,() => {
          layerID.value = getElementInfoID.value.layerID;
        })
    
        return {
          showMapOptions,
          selectedBaseMap,

          baseMaps,
          layers,
          layersControl,

          getElementInfoID,

          layerID,

          // Método para mostrar u ocultar las opciones de mapas
          toggleMapOptions: () => {
            showMapOptions.value = !showMapOptions.value;
          },

          selectBaseMap: ( map: { id: number, name: string } ) => {
            setBaseMap(map);
            showMapOptions.value = false;
          },

          layerInfo: ( id:number ) => {
            layerID.value = id;
            console.log(layers)
          },

          resetLayerID: () => {
            layerID.value = undefined;
          },
        };
      },
});