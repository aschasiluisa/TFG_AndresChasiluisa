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
          getLast_registroInfoIDlayer,
          setBaseMap,
          resetLayersControl,
          setElementoInfoID,
          resetElementInfoID,
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
          showMapOptions.value = getElementInfoID.value? false : showMapOptions.value;
        })
    
        return {
          showMapOptions,
          selectedBaseMap,

          layers,
          baseMaps,
          layersControl,

          getElementInfoID,
          getLast_registroInfoIDlayer,
          layerID,

          userAuthenticated,

          getIdioma,
          Idiomas,

          // Método para mostrar u ocultar las opciones de mapas
          toggleMapOptions: () => {
            showMapOptions.value = !showMapOptions.value;
            if(showMapOptions.value) resetElementInfoID();
          },

          selectBaseMap: ( map: { id: number, name_es: string, name_en: string } ) => {
            setBaseMap(map);
            showMapOptions.value = false;
          },

          layerInfo: ( id:number ) => {
            setElementoInfoID(id);
            if(showMapOptions.value) showMapOptions.value = false;
            layerID.value = id;
          },

          resetLayerID: () => {
            layerID.value = undefined;
            resetElementInfoID()
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