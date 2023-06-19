import { defineComponent, ref,  watch, computed } from "vue";
import { useMapStore } from "@/composables/useMapStore";

export default defineComponent({
    name: 'ElementInfo',
    setup() {

        const { 
            getRegistrosCalidadAire,
            getElementInfoID,
          } = useMapStore();

        return {
            getElementInfoID,
            getRegistrosCalidadAire,
        }
    },
})