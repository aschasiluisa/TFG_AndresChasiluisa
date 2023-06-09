import { defineComponent, watch, ref } from "vue";
import { useAuthStore } from "@/composables/useAuthStore";
import { useRoute } from "vue-router";
import router from '@/router';

export default defineComponent ({
    name: 'Header',
    setup(){
        
        const { 
            userAuthenticated,
            getUserToken,
            logout
        } = useAuthStore();

        const route = useRoute();

        const noIsCurrentRoute = (path: string) => {
            return route.path != path;
        }

        return{
            userAuthenticated,
            noIsCurrentRoute,

            logout: () => { logout(getUserToken.value); router.push({ name: "VisorLaPalma" }) }
        }
    }
})