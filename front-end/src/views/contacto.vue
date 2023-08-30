<template>
     <div class="page">

        <div v-show="!!authError">    
            <div class="alert">
                <p v-if="authError === responseContactoControl.emptyFieldError">
                    <strong>{{ $t('Signup.error.error') }}!</strong> {{ $t('Signup.error.emptyField') }}
                </p>
                <p v-if="authError === responseContactoControl.emailFormatError">
                    <strong>{{ $t('Signup.error.error') }}!</strong> {{ $t('Signup.error.emailFormat') }}
                </p>
                <p v-if="authError === responseContactoControl.serverError">
                    <strong>{{ $t('Signup.error.error') }}!</strong> {{ $t('Signup.error.server') }}
                </p>
            </div>
        </div>

        <div class="window form">
            <h1>
                {{ $t('Contacto.titulo') }}
            </h1>

            <label class="label label-default" for="nombre">
                {{ $t('Contacto.nombre') }}*
            </label>
            <input  type="text" id="nombre" class="form-control" v-model="nombre">
            
            <label class="label label-default" for="apellido">
                {{ $t('Contacto.apellido') }}*
            </label>
            <input type="text" id="apellido" class="form-control" v-model="apellido">

            <label class="label label-default" for="mail">
                {{ $t('Contacto.mail') }}*
            </label>
            <input type="text" id="mail" class="form-control" v-model="mail">

            <label class="label label-default" for="asunto">
                {{ $t('Contacto.asunto') }}*
            </label>
            <select id="asunto" class="form-control" v-model="asunto">
                <option value="Ayuda">{{ $t('Contacto.asuntos.ayuda') }}</option>
                <option value="Fallo">{{ $t('Contacto.asuntos.fallo') }}</option>
                <option value="Funcionalidad">{{ $t('Contacto.asuntos.funcionalidad') }}</option>
                <option value="Colaboración">{{ $t('Contacto.asuntos.colaboracion') }}</option>
                <option value="Otro">{{ $t('Contacto.asuntos.otro') }}</option>
            </select>

            <label for="mensaje" class="form-label">
                {{ $t('Contacto.mensaje') }}*
            </label>
            <textarea class="form-control" id="mensaje" rows="4" maxlength="1000" v-model="mensaje"></textarea>
            
            <button type="button" :disabled="authenticathing" class="btn btn-success" @click="enviarContacto">
                {{ $t('Contacto.enviar') }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { ref, watch, onMounted, computed } from "vue"
    import { useAuthStore } from "@/composables/useAuthStore";
    import router from '@/router';

    import { responseContactoControl } from "@/api/authenticationAPI"

    export default{
        name:'contacto',
        setup(){
            const nombre = ref();
            const apellido = ref();
            const mail = ref();
            const asunto = ref();
            const mensaje = ref();

            const {
                postContacto,
                authenticathing,
                authResponse
            } = useAuthStore()

            const authError = computed(()=>(authResponse.value && authResponse.value !== responseContactoControl.ok)? authResponse.value:undefined);

            watch(authResponse, () => {
                if(authResponse.value == responseContactoControl.ok) router.push({ name: "VisorLaPalma" })
            })

            return {
                nombre,
                apellido,
                mail,
                asunto,
                mensaje,

                authenticathing,
                authError,
                responseContactoControl,

                enviarContacto : () => {
                    postContacto(nombre.value, apellido.value, mail.value, asunto.value, mensaje.value)
                },

            }
        }
    }

</script>

<style lang="scss" scoped>
     @import "@/css/globalStyles.scss";
</style>
