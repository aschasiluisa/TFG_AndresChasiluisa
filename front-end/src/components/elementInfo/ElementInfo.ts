import { defineComponent, ref,  watch, onMounted } from "vue";
import { useMapStore } from "@/composables/useMapStore";
import { useAuthStore } from "@/composables/useAuthStore";
import { Buffer } from 'buffer';
import router from '@/router';

export default defineComponent({
    name: 'ElementInfo',
    setup() {
        const { 
            getRegistroInfo,
            getElementInfoID,
          } = useMapStore();

        const {
            getRole,
        } = useAuthStore();

        onMounted(() => {
            if(getRole.value == 1 && getElementInfoID.value == 2){
                const editRegistroButton = document.getElementById('editRegistro');

                editRegistroButton!.addEventListener('click', function() {
                    router.push({ name: "EditarIncidencia" });
                });
            }
        })
        
        return {
            getElementInfoID,
            getRegistroInfo,
            Buffer,

            getRole,
        }
    },
})