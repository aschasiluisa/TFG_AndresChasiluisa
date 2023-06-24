import { defineComponent, ref,  watch, computed } from "vue";
import router from '@/router';

import { useMapStore } from "@/composables/useMapStore";
import { useAuthStore } from "@/composables/useAuthStore"
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

        const {
          userAuthenticated,
        } = useAuthStore();

        resetLayersControl();

        watch(getElementInfoID,() => {
          layerID.value = getElementInfoID.value;
        })
    
        return {
          showMapOptions,
          selectedBaseMap,

          baseMaps,
          layers,
          layersControl,

          getElementInfoID,

          layerID,

          userAuthenticated,

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
          },

          resetLayerID: () => {
            layerID.value = undefined;
          },

          goCrearIncidencias: () => {
            router.push({ name: "CrearIncidencia" });
          },
        };
      },
});