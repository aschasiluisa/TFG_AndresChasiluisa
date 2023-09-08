import { defineComponent, ref,  watch, onMounted } from "vue";
import { useMapStore } from "@/composables/useMapStore";
import { useAuthStore } from "@/composables/useAuthStore";
import { useI18nStore } from "@/composables/useI18nStore";
import { periodos } from '@/api/mapAPI';

import { Idiomas } from  "../../i18n/index"
import { Buffer } from 'buffer';
import router from '@/router';

import GasesMedicion from '@/components/gasesMedicion/GasesMedicion.vue'

import axios from "axios"

export default defineComponent({
    name: 'ElementInfo',

    components:{
        GasesMedicion,
    },

    setup() {

        const RegistrosCalidadAire_count = ref(0);

        const Nombre_es = ref();
        const Nombre_en = ref();
        const Descripcion_es = ref();
        const Descripcion_en = ref();

        const { 
            getRegistroInfo,
            getElementInfoID,
            getTypeIncidence,
            layersControl,
            sublayers_4,
            sublayersControl_4,
            sublayers_5,
            sublayersControl_5,
            periodo,
            deleteAlarma,
            resetAlarma,
            resetregistrosAlarmas,
            setPeriodo,
          } = useMapStore();

        const {
            userAuthenticated,
            getUserToken,
            getAdmin,
        } = useAuthStore();

        const {
            getIdioma,
        } = useI18nStore();

        const periodo_ = ref(periodo.value);

        if(getRegistroInfo.value.Validada){
            Nombre_es.value = getRegistroInfo.value.Nombre_es;
            Nombre_en.value = getRegistroInfo.value.Nombre_en;

            if(getRegistroInfo.value.Descripcion_es){
                Descripcion_es.value = getRegistroInfo.value.Descripcion_es;
                Descripcion_en.value = getRegistroInfo.value.Descripcion_en;
            }
        } else {
            Nombre_en.value = Nombre_es.value = getRegistroInfo.value.Nombre;

            if(getRegistroInfo.value.Descripcion){
                Descripcion_es.value = Descripcion_en.value = getRegistroInfo.value.Descripcion;
            }
        }

        onMounted(() => {
    
            watch(getRegistroInfo, () => {

                if(getRegistroInfo.value.Validada){
                    Nombre_es.value = getRegistroInfo.value.Nombre_es;
                    Nombre_en.value = getRegistroInfo.value.Nombre_en;
        
                    if(getRegistroInfo.value.Descripcion_es){
                        Descripcion_es.value = getRegistroInfo.value.Descripcion_es;
                        Descripcion_en.value = getRegistroInfo.value.Descripcion_en;
                    }
                } else {
                    Nombre_en.value = Nombre_es.value = getRegistroInfo.value.Nombre;
        
                    if(getRegistroInfo.value.Descripcion){
                        Descripcion_es.value = Descripcion_en.value = getRegistroInfo.value.Descripcion;
                    }
                }
            })

            watch(periodo_, () => {
                setPeriodo(periodo_.value);
            })

            watch(layersControl.value, () => {
                if(layersControl.value[5]) periodo_.value = periodo.value;
            })

            if(getAdmin.value && getElementInfoID.value == 2){
                const editRegistroButton = document.getElementById('editRegistro');

                editRegistroButton!.addEventListener('click', function() {
                    router.push({ name: "EditarIncidencia" });
                });
            }
        })
        
        return {
            userAuthenticated,

            RegistrosCalidadAire_count,

            Nombre_es,
            Nombre_en,
            Descripcion_es,
            Descripcion_en,

            getElementInfoID,
            getRegistroInfo,
            getTypeIncidence,
            Buffer,

            getAdmin,

            getIdioma,
            Idiomas,

            sublayers_4,
            sublayersControl_4,

            sublayers_5,
            sublayersControl_5,

            periodo,
            periodo_,
            periodos,

            historialRegistroCalidadAire: async () => {

                let nombreArchivo: string;

                if(getIdioma.value == Idiomas.ES){
                    nombreArchivo = 'hitorialRegistros_'+getRegistroInfo.value.Nombre+'.csv';
                } else if (getIdioma.value == Idiomas.EN){
                    nombreArchivo = 'logHistory_'+getRegistroInfo.value.Nombre+'.csv';
                }

                axios({
                    url: process.env.VUE_APP_SERVIDOR_URL+`/historialRegistrosCalidadAire/${getRegistroInfo.value._id}`,
                    method: 'GET',
                    responseType: 'blob',
                    headers: {
                        token: getUserToken.value,
                        idioma: getIdioma.value
                    }
                  })
                  .then(response => {
                    const url = URL.createObjectURL(response.data); // Crea un objeto URL para el blob
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = nombreArchivo;
                    link.click();
                
                    // Libera el recurso URL.createObjectURL
                    URL.revokeObjectURL(url);
                  })
                  .catch(error => {
                    console.error('Error al descargar el archivo:', error);
                  });
            },

            deleteAlarma : async (id: string) =>  {
                await deleteAlarma(getUserToken.value, id);
                resetregistrosAlarmas();
                layersControl.value[3] = true;
            },

            resetAlarma : async (id: string) => {
                resetAlarma(getUserToken.value, id);
                resetregistrosAlarmas();
                layersControl.value[3] = true;
            },

        }
    },
})