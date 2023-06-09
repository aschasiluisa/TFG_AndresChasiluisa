<template>
    <div class="page">
        <form class="form" @submit.prevent="signup">
            <h1>SIGNUP</h1>
            <label class="label label-default" for="nombre">
                Nombre:
            </label>
            <input  type="text" id="nombre" class="form-control" v-model="nombre">
            
            <label class="label label-default" for="apellido">
                Apellido:
            </label>
            <input type="text" id="apellido" class="form-control" v-model="apellido">
            
            <label class="label label-default" for="municipio">
                Municipio:
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
                Usuario:
            </label>
            <input type="text" id="usuario" class="form-control" v-model="usuario">
            
            <label class="label label-default" for="mail">
                Mail:
            </label>
            <input type="email" id="mail" class="form-control" v-model="mail">
            
            <label class="label label-default" for="contraseña">
                Contraseña:
            </label>
            <input type="password" id="contraseña" class="form-control" v-model="contraseña"> 
            <button type="submit" :disabled="authenticathing" class="btn btn-success">
                registro
            </button>
        </form>
    </div>
</template>

<script lang="ts">
    import { ref, watch } from "vue"
    import { useAuthStore } from "@/composables/useAuthStore";
    import router from '@/router';

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
                authenticathing
            } = useAuthStore();

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