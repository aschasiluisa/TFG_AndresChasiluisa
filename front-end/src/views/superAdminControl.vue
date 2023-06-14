<template>
    <div class="page">

        <div v-show="!!responseError">    
            <div class="alert">
                <p v-if="responseError === responseSuperAdminControlControl.userFindError">
                    <strong>Error!</strong> usuario no encontrado
                </p>
                <p v-if="responseError === responseSuperAdminControlControl.serverError">
                    <strong>Error!</strong> error en el servidor
                </p>
            </div>
        </div>

        <form class="form" v-show="!showClientInfo">
            <h1>Super Admin Control</h1>

            <label class="label label-default" for="usuario">
                Usuario a modificar:
            </label>
            <input type="text" id="usuario" class="form-control" v-model="usuarioCliente">

            <button type="button" class="btn btn-success" @click="superAdminControl">
                buscar usuario
            </button>
        </form>

        <form class="form" v-show="showClientInfo">
            <h1>{{ clienteUsuario }}</h1>
            <p><strong>Nombre</strong> : {{ clienteNombre }}</p>
            <p><strong>Apellido</strong> : {{ clienteApellido }}</p>
            <p><strong>Municipio</strong> : {{ clienteMunicipio }}</p>
            <p><strong>Mail</strong> : {{ clienteMail }}</p>
            <p><strong>Rol</strong> : {{ clienteRol }}</p>
            <p>
                <ins style="color:darkorange; cursor:pointer" @click="changeRole">cambiar rol</ins>
                 &nbsp; | &nbsp; 
                <del style="color:red; cursor:pointer;" @click="deleteUser">{{ clienteUsuario }}</del>
            </p>
            <button type="button" class="btn btn-danger" @click="cambiarMode">Volver</button>
        </form>
    </div>
</template>

<script lang="ts">
    import { useAuthStore } from "@/composables/useAuthStore";
    import { ref, watch, computed } from "vue"
    import { responseSuperAdminControlControl, roles } from "@/api/authenticationAPI"

    export default{
        name:"superAdminControl",
        setup(){
            
            const usuarioCliente = ref("");

            const clienteUsuario = ref("");
            const clienteNombre = ref("");
            const clienteApellido = ref("");
            const clienteMunicipio = ref("-");
            const clienteMail = ref("");
            const clienteRol = ref("");
            let nextPosibleRol : roles;

            const showClientInfo = ref(false);

            const { 
                superAdminControl,
                changeRole,
                deleteUser,
                userClientInfo,
                getUserToken,
                authResponse,
            } = useAuthStore();

            const cambiarMode = () => {
                showClientInfo.value = false;
                usuarioCliente.value = "";
            };

            const responseError = computed(()=>(authResponse.value && authResponse.value !== responseSuperAdminControlControl.ok)? authResponse.value:undefined);

            watch(userClientInfo, () => {
                if(userClientInfo){
                    clienteUsuario.value = userClientInfo.value.Usuario;
                    clienteNombre.value = userClientInfo.value.Nombre;
                    clienteApellido.value = userClientInfo.value.Apellido;
                    clienteMail.value = userClientInfo.value.Mail;

                    if(userClientInfo.value.Municipio){
                        clienteMunicipio.value = userClientInfo.value.Municipio;
                    } else {
                        clienteMunicipio.value = "Sin municipio elegido"
                    }
                    
                    if(userClientInfo.value.Rol == roles.admin){
                        clienteRol.value = "admin";
                        nextPosibleRol = roles.user;
                    } else {
                        clienteRol.value = "user";
                        nextPosibleRol = roles.admin;
                    }
                    showClientInfo.value = true;
                }
            })

            return {
                clienteUsuario,
                clienteNombre,
                clienteApellido,
                clienteMunicipio,
                clienteMail,
                clienteRol,
                showClientInfo,
                usuarioCliente,
                cambiarMode,
                
                responseSuperAdminControlControl,
                responseError,

                superAdminControl: () => {
                    superAdminControl(getUserToken.value, usuarioCliente.value)
                },

                changeRole: () => {
                    changeRole(getUserToken.value, usuarioCliente.value, nextPosibleRol)
                },

                deleteUser: () => {
                    deleteUser(getUserToken.value, usuarioCliente.value);
                    cambiarMode();
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/css/globalStyles.scss";
</style>