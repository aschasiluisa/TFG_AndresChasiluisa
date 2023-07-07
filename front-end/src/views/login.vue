<template>
    <div class="page">
        <div v-show="!!authError">    
            <div class="alert">
                <p v-if="authError === responseLoginControl.emptyFieldError">
                    <strong>{{ $t('Login.error.error') }}!</strong> {{ $t('Login.error.emptyField') }}
                </p>
                <p v-if="authError === responseLoginControl.loginError">
                    <strong>{{ $t('Login.error.error') }}!</strong> {{ $t('Login.error.login') }}
                </p>
                <p v-if="authError === responseLoginControl.serverError">
                    <strong>{{ $t('Login.error.error') }}!</strong> {{ $t('Login.error.server') }}
                </p>
            </div>
        </div>

        <div class="window form">
            <h1>{{ $t('Login.titulo') }}</h1>

            <label class="label label-default" for="usuario">
                {{ $t('Login.usuario') }}
            </label>
            <input type="text" id="usuario" class="form-control" v-model="usuario">
            
            <label class="label label-default" for="contraseña">
                {{ $t('Login.contraseña') }}
            </label>
            <input type="password" id="contraseña" class="form-control" v-model="contraseña"> 

            <button type="button" :disabled="authenticathing" class="btn btn-success" @click="login">
                {{ $t('Login.boton') }}
            </button>
        </div>
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
                getRole,
            } = useAuthStore();

            const authError = computed(()=>(authResponse.value && authResponse.value !== responseLoginControl.ok)? authResponse.value:undefined);
            
            watch(userAuthenticated, () =>{
                if(userAuthenticated.value){
                    if(getRole.value === 5) router.push({ name: "SuperAdminControl" })
                    else router.push({ name: "VisorLaPalma" })
                }
            })

            return{
                usuario,
                contraseña,
                authenticathing,
                authError,
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
