<template>
    <div class="page">
        <form class="form" @submit.prevent="login">
            <h1>LOGIN</h1>

            <label class="label label-default" for="usuario">
                Usuario:
            </label>
            <input type="text" id="usuario" class="form-control" v-model="usuario">
            
            <label class="label label-default" for="contraseña">
                Contraseña:
            </label>
            <input type="password" id="contraseña" class="form-control" v-model="contraseña"> 

            <button type="submit" :disabled="authenticathing" class="btn btn-success">
                acceso
            </button>
        </form>
    </div>
</template>

<script lang="ts">
    import { useAuthStore } from "@/composables/useAuthStore";
    import { ref, watch } from "vue"
    import router from '@/router';

    export default{
        name: "Login",
        setup () {
            
            const usuario = ref("");
            const contraseña = ref("");
            
            const { 
                login,
                userAuthenticated,
                authenticathing
            } = useAuthStore();

            watch(userAuthenticated, () =>{
                if(userAuthenticated.value){
                    router.push({ name: "VisorLaPalma" })
                }
            })

            return{
                usuario,
                contraseña,
                authenticathing,

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
