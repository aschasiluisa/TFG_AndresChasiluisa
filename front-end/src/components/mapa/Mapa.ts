import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
    name:'Mapa',
    setup(){

        const data = ref();
        
        axios.get(process.env.VUE_APP_SERVIDOR_URL!,{})
        .then(function(response){
            data.value = response ;
        })
        .catch(function(error){
            console.log(error);
        })

        return {
            data
        }
    }
})