<template>
    <div class="page">

        <div v-show="!!authError">    
            <div class="alert">
                <p v-if="authError === responseSignupControl.emptyFieldError">
                    <strong>{{ $t('Signup.error.error') }}!</strong> {{ $t('Signup.error.emptyField') }}
                </p>
                <p v-if="authError === responseSignupControl.usernameError">
                    <strong>{{ $t('Signup.error.error') }}!</strong> {{ $t('Signup.error.username') }}
                </p>
                <p v-if="authError === responseSignupControl.emailError">
                    <strong>{{ $t('Signup.error.error') }}!</strong> {{ $t('Signup.error.email') }}
                </p>
                <p v-if="authError === responseSignupControl.emailFormatError">
                    <strong>{{ $t('Signup.error.error') }}!</strong> {{ $t('Signup.error.emailFormat') }}
                </p>
                <p v-if="authError === responseSignupControl.serverError">
                    <strong>{{ $t('Signup.error.error') }}!</strong> {{ $t('Signup.error.server') }}
                </p>
            </div>
        </div>

        <div class="window form" @submit.prevent="signup">
            <h1>{{ $t('Signup.titulo') }}</h1>
            <label class="label label-default" for="nombre">
                {{ $t('Signup.nombre') }}*
            </label>
            <input  type="text" id="nombre" class="form-control" v-model="nombre">
            
            <label class="label label-default" for="apellido">
                {{ $t('Signup.apellido') }}*
            </label>
            <input type="text" id="apellido" class="form-control" v-model="apellido">
            
            <label class="label label-default" for="municipio">
                {{ $t('Signup.municipio') }}
            </label>
            <select id="municipio" class="form-control" v-model="municipio">
                <option>Garafía</option>
                <option>Barlovento</option>
                <option>San Andrés y Sauces</option>
                <option>Puntallana</option>
                <option>Santa Cruz de La Palma</option>
                <option>Breña Alta</option>
                <option>Breña Baja</option>
                <option>Villa de Mazo</option>
                <option>Fuencaliente de La Palma</option>
                <option>Los Llanos de Aridane</option>
                <option>El Paso</option>
                <option>Tazacorte</option>
                <option>Tijarafe</option>
                <option>Puntagorda</option>
            </select>

            <label class="label label-default" for="usuario">
                {{ $t('Signup.usuario') }}*
            </label>
            <input type="text" id="usuario" class="form-control" v-model="usuario">
            
            <label class="label label-default" for="mail">
                {{ $t('Signup.mail') }}*
            </label>
            <input type="text" id="mail" class="form-control" v-model="mail">
            
            <label class="label label-default" for="contraseña">
                {{ $t('Signup.contraseña') }}*
            </label>
            <input type="password" id="contraseña" class="form-control" v-model="contraseña"> 
            <button type="button" :disabled="authenticathing" class="btn btn-success" @click="signup">
                {{ $t('Signup.boton') }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { ref, watch, computed } from "vue"
    import { useAuthStore } from "@/composables/useAuthStore";
    import router from '@/router';

    import { responseSignupControl } from "@/api/authenticationAPI"

    export default{
        name: "Signup",
        setup () {

            const nombre = ref();
            const apellido = ref();
            const municipio = ref();
            const usuario = ref();
            const mail = ref();
            const contraseña = ref();

            const { 
                signup,
                userAuthenticated,
                authenticathing,
                authResponse
            } = useAuthStore();

            const authError = computed(()=>(authResponse.value && authResponse.value !== responseSignupControl.ok)? authResponse.value:undefined);

            watch(userAuthenticated, () =>{
                if(userAuthenticated.value){
                    router.push({ name: "VisorLaPalma" })
                }
            })

            return{
                nombre,
                apellido,
                municipio,
                usuario,
                mail,
                contraseña,
                authenticathing,
                authError,
                responseSignupControl,

                signup: () => {

                     signup(
                        usuario.value,  
                        mail.value,
                        contraseña.value,
                        municipio.value, 
                        nombre.value, 
                        apellido.value
                    )
                },
            }
        }
    }
</script>

<style lang="scss" scoped>

@import "@/css/globalStyles.scss";

</style>