import { defineComponent, ref,  watch, onMounted } from "vue";
import { useMapStore } from "@/composables/useMapStore";
import { useAuthStore } from "@/composables/useAuthStore";
import { useI18nStore } from "@/composables/useI18nStore";

import { Idiomas } from  "../../i18n/index"
import { Buffer } from 'buffer';
import router from '@/router';

export default defineComponent({
    name: 'ElementInfo',
    setup() {
        const Nombre_es = ref();
        const Nombre_en = ref();
        const Descripcion_es = ref();
        const Descripcion_en = ref();

        const { 
            getRegistroInfo,
            getElementInfoID,
            getTypeIncidence,
            layersControl,
            deleteAlarma,
            resetAlarma,
            resetregistrosAlarmas,
          } = useMapStore();

        const {
            getUserToken,
            getAdmin,
        } = useAuthStore();

        const {
            getIdioma,
          } = useI18nStore();

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

            if(getAdmin.value && getElementInfoID.value == 2){
                const editRegistroButton = document.getElementById('editRegistro');

                editRegistroButton!.addEventListener('click', function() {
                    router.push({ name: "EditarIncidencia" });
                });
            }
        })
        
        return {
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