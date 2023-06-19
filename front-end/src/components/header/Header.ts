import { defineComponent, watch, ref, computed } from "vue";
import { useAuthStore } from "@/composables/useAuthStore";
import { useRoute } from "vue-router";
import router from '@/router';

export default defineComponent ({
    name: 'Header',
    setup(){
        
        const { 
            userAuthenticated,
            getUserToken,
            getRole,
            logout
        } = useAuthStore();

        const route = useRoute();

        const noSuperAdmin = computed(()=>(getRole.value !== 5 )? true : false);

        const noIsCurrentRoute = (path: string) => {
            return route.path != path;
        }

        return{
            userAuthenticated,
            noSuperAdmin,
            noIsCurrentRoute,

            logout: () => { logout(getUserToken.value); }
        }
    }
})