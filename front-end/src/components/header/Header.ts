import { defineComponent, watch, ref, computed } from "vue";
import { useAuthStore } from "@/composables/useAuthStore";
import { useI18nStore } from "@/composables/useI18nStore";
import { useRoute } from "vue-router";

import { Idiomas } from  "../../i18n/index"

export default defineComponent ({
    name: 'Header',
    setup(){
        
        const { 
            userAuthenticated,
            getUserToken,
            getSuper,
            logout
        } = useAuthStore();

        const {
            getIdioma,
            setIdioma,
        } = useI18nStore();

        const route = useRoute();
        const idiomaSelector = ref(false);

        const noIsCurrentRoute = (path: string) => {
            return route.path != path;
        }

        watch(idiomaSelector,() => {
            if(idiomaSelector.value){
                setIdioma(Idiomas.EN);
            } else {
                setIdioma(Idiomas.ES);
            }
        })

        return{
            userAuthenticated,
            getSuper,
            idiomaSelector,
            noIsCurrentRoute,
            
            getIdioma,
            Idiomas,

            logout: () => { logout(getUserToken.value); },
        }
    }
})