import { defineComponent, ref,  watch, computed } from "vue";
import router from '@/router';

import { useMapStore } from "@/composables/useMapStore";
import { useAuthStore } from "@/composables/useAuthStore";
import { useI18nStore } from "@/composables/useI18nStore";
import ElementInfo from '../elementInfo/ElementInfo.vue';

import { Idiomas } from  "../../i18n/index"

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

        const {
          getIdioma,
        } = useI18nStore();

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

          getIdioma,
          Idiomas,

          // Método para mostrar u ocultar las opciones de mapas
          toggleMapOptions: () => {
            showMapOptions.value = !showMapOptions.value;
          },

          selectBaseMap: ( map: { id: number, name_es: string, name_en: string } ) => {
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

          goCrearAlarmas: () => {
            router.push({ name: "CrearAlarma" });
          },
        };
      },
});