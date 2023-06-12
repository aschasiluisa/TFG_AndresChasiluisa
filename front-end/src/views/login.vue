<template>
    <div class="page">

        <div v-show="!!authError">    
            <div class="alert">
                <p v-if="authError === responseLoginControl.emptyFieldError">
                    <strong>Error!</strong> campos Vacios
                </p>
                <p v-if="authError === responseLoginControl.loginError">
                    <strong>Error!</strong> usuario o contraseña incorrectos
                </p>
                <p v-if="authError === responseLoginControl.serverError">
                    <strong>Error!</strong> error en el servidor
                </p>
            </div>
        </div>

        <form class="form">
            <h1>LOGIN</h1>

            <label class="label label-default" for="usuario">
                Usuario:
            </label>
            <input type="text" id="usuario" class="form-control" v-model="usuario">
            
            <label class="label label-default" for="contraseña">
                Contraseña:
            </label>
            <input type="password" id="contraseña" class="form-control" v-model="contraseña"> 

            <button type="button" :disabled="authenticathing" class="btn btn-success" @click="login">
                acceso
            </button>
        </form>
    </div>
</template>

<script lang="ts">
    import { useAuthStore } from "@/composables/useAuthStore";
    import { ref, watch, computed } from "vue"
    import router from '@/router';
    import { responseLoginControl } from "@/api/authenticationAPI"

    export default{
        name: "Login",
        setup () {
            
            const usuario = ref("");
            const contraseña = ref("");
            
            const { 
                login,
                userAuthenticated,
                authenticathing,
                authResponse,
                clearAuthResponse
            } = useAuthStore();

            const authError = computed(()=>(authResponse.value && authResponse.value !== responseLoginControl.ok)? authResponse.value:undefined);
            
            watch(userAuthenticated, () =>{
                if(userAuthenticated.value){
                    router.push({ name: "VisorLaPalma" })
                }
            })

            return{
                usuario,
                contraseña,
                authenticathing,
                authError,
                clearAuthResponse,
                responseLoginControl,

                login: () => {
                    login(
                        usuario.value, 
                        contraseña.value
                        ) 
                },
            }
        }
    }
</script>

<style lang="scss" scoped>

@import "@/css/globalStyles.scss";

</style>
