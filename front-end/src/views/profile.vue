<template>
    <div class="page">

        <div v-show="!!responseError">    
            <div class="alert">
                <p v-if="responseError === responseProfileControl.emailError">
                    <strong>{{ $t('Profile.error.error') }}!</strong> {{ $t('Profile.error.email') }}
                </p>
                <p v-if="responseError === responseProfileControl.emailFormatError">
                    <strong>{{ $t('Profile.error.error') }}!</strong> {{ $t('Profile.error.emailFormat') }}
                </p>
                <p v-if="responseError === responseProfileControl.serverError">
                    <strong>{{ $t('Profile.error.error') }}!</strong> {{ $t('Profile.error.server') }}
                </p>
            </div>
        </div>

        <div class="window form">
            <h1>{{ $t('Profile.titulo') }}</h1>

            <label class="label label-default" for="nombre">
                {{ $t('Profile.nombre') }}:
            </label>
            <input type="text" id="nombre" class="form-control" v-model="nombre" :placeholder= "preNombre" :readonly="readOnly">
            
            <label class="label label-default" for="apellido">
                {{ $t('Profile.apellido') }}:
            </label>
            <input type="text" id="apellido" class="form-control" v-model="apellido" :placeholder= "preApellido" :readonly="readOnly"> 

            <label class="label label-default" for="municipio">
                {{ $t('Profile.municipio') }}:
            </label>
            <select id="municipio" class="form-control" v-model="municipio" :disabled="readOnly">
                <option value = "" disabled selected hidden> {{ preMunicipio }} </option>
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

            <label class="label label-default" for="mail">
                {{ $t('Profile.mail') }}:
            </label>
            <input type="text" id="mail" class="form-control" v-model="mail" :placeholder= "preMail" :readonly="readOnly"> 

            <button type="button" v-show="readOnly" class="btn btn-success" @click="cambiarMode">{{ $t('Profile.editar') }}</button>
            <button type="button" v-show="!readOnly" class="btn btn-success" @click="updateUserInfo">{{ $t('Profile.enviar') }}</button>
            <button type="button" v-show="!readOnly" class="btn btn-danger" @click="cambiarMode">{{ $t('Profile.volver') }}</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { useAuthStore } from "@/composables/useAuthStore"
    import { ref, watch, onMounted, computed } from "vue"
    import { responseProfileControl } from "@/api/authenticationAPI"

    export default{
        name:'profile',
        setup(){

            const nombre = ref();
            const apellido = ref();
            const municipio = ref("");
            const mail = ref();
            const preNombre = ref("");
            const preApellido = ref("");
            const preMunicipio = ref();
            const preMail = ref("");
            const readOnly = ref(true);

            const { 
                userInfo,
                updateUserInfo,
                getUserToken,
                profileUserInfo,
                getEmail,
                authResponse,
            } = useAuthStore();
            
            const cambiarMode = () => {
                    readOnly.value = !readOnly.value;
                    nombre.value = undefined;
                    apellido.value = undefined;
                    municipio.value = "";
                    mail.value = undefined;
            };

            const responseError = computed(()=>(authResponse.value && authResponse.value !== responseProfileControl.ok)? authResponse.value:undefined);

            watch(profileUserInfo, () => {
                preNombre.value = profileUserInfo.value.Nombre;
                preApellido.value = profileUserInfo.value.Apellido;
                preMunicipio.value = profileUserInfo.value.Municipio;
                preMail.value = getEmail.value;
            })

            onMounted(async () => {
                userInfo(getUserToken.value);
            })

            return{
                nombre,
                apellido,
                municipio,
                mail,
                preNombre,
                preApellido,
                preMunicipio,
                preMail,

                readOnly,
                cambiarMode,

                responseError, 
                responseProfileControl,              

                updateUserInfo: () => {

                    if(!nombre.value) nombre.value = preNombre.value
                    if(!apellido.value) apellido.value = preApellido.value
                    if(!municipio.value) municipio.value = preMunicipio.value
                    if(!mail.value || mail.value === preMail.value) mail.value = ""

                    updateUserInfo(getUserToken.value, nombre.value, apellido.value, municipio.value, mail.value);

                    cambiarMode();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/css/globalStyles.scss";
</style>
