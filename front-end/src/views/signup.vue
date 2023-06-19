<template>
    <div class="page">

        <div v-show="!!authError">    
            <div class="alert">
                <p v-if="authError === responseSignupControl.emptyFieldError">
                    <strong>Error!</strong> campos Vacios
                </p>
                <p v-if="authError === responseSignupControl.usernameError">
                    <strong>Error!</strong> nombre de usuario ya existente
                </p>
                <p v-if="authError === responseSignupControl.emailError">
                    <strong>Error!</strong> email ya en uso
                </p>
                <p v-if="authError === responseSignupControl.emailFormatError">
                    <strong>Error!</strong> formato de email incorrecto
                </p>
                <p v-if="authError === responseSignupControl.serverError">
                    <strong>Error!</strong> error en el servidor
                </p>
            </div>
        </div>

        <div class="window form" @submit.prevent="signup">
            <h1>SIGNUP</h1>
            <label class="label label-default" for="nombre">
                Nombre*
            </label>
            <input  type="text" id="nombre" class="form-control" v-model="nombre">
            
            <label class="label label-default" for="apellido">
                Apellido*
            </label>
            <input type="text" id="apellido" class="form-control" v-model="apellido">
            
            <label class="label label-default" for="municipio">
                Municipio
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
                Usuario*
            </label>
            <input type="text" id="usuario" class="form-control" v-model="usuario">
            
            <label class="label label-default" for="mail">
                Mail*
            </label>
            <input type="text" id="mail" class="form-control" v-model="mail">
            
            <label class="label label-default" for="contraseña">
                Contraseña*
            </label>
            <input type="password" id="contraseña" class="form-control" v-model="contraseña"> 
            <button type="button" :disabled="authenticathing" class="btn btn-success" @click="signup">
                registro
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