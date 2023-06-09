<template>
    <div class="page">
        <form class="form">
            <h1>PROFILE</h1>

            <label class="label label-default" for="nombre">
                Nombre:
            </label>
            <input type="text" id="nombre" class="form-control" v-model="nombre" :placeholder= "preNombre" :readonly="readOnly">
            
            <label class="label label-default" for="apellido">
                Apellido:
            </label>
            <input type="text" id="apellido" class="form-control" v-model="apellido" :placeholder= "preApellido" :readonly="readOnly"> 

            <label class="label label-default" for="municipio">
                Municipio:
            </label>
            <select id="municipio" class="form-control" v-model="municipio" :disabled="readOnly">
                <option value = "" disabled selected hidden> {{preMunicipio}} </option>
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
                Mail:
            </label>
            <input type="text" id="mail" class="form-control" v-model="mail" :placeholder= "preMail" :readonly="readOnly"> 

            <button type="button" v-show="readOnly" class="btn btn-success" @click="cambiarMode">Editar</button>
            <button type="button" v-show="!readOnly" class="btn btn-success" @click="updateUserInfo">Enviar cambios</button>
            <button type="button" v-show="!readOnly" class="btn btn-danger" @click="cambiarMode">Volver</button>
        </form>
    </div>
</template>

<script lang="ts">
    import { useAuthStore } from "@/composables/useAuthStore";
    import { ref, watch, onMounted } from "vue"

    export default{
        name:'profile',
        setup(){

            const nombre = ref("");
            const apellido = ref("");
            const municipio = ref("");
            const mail = ref("");
            const preNombre = ref("");
            const preApellido = ref("");
            const preMunicipio = ref("");
            const preMail = ref("");
            const readOnly = ref(true);

            const { 
                userInfo,
                updateUserInfo,
                getUserToken,
                profileUserInfo,
                getEmail,
            } = useAuthStore();
            
            const cambiarMode = () => {
                    readOnly.value = !readOnly.value;
                    nombre.value = "";
                    apellido.value = "";
                    municipio.value = "";
                    mail.value = "";
            };

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
                

                updateUserInfo: () => {
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
