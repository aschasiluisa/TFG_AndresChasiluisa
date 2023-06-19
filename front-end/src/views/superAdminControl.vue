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

        <div class="window super" v-show="!showClientInfo">
            <h2>Super Admin Control</h2>

            <label class="label label-default" for="usuario">
                Usuario a modificar:
            </label>
            <input type="text" id="usuario" class="form-control" v-model="usuarioCliente">

            <button type="button" class="btn btn-success" @click="superAdminControl">
                buscar usuario
            </button>
        </div>

        <div class="window userInfo" v-show="showClientInfo">
            <h2>{{ clienteUsuario }}</h2>
            <p><strong>Nombre:</strong>         {{ clienteNombre }}</p>
            <p><strong>Apellido: </strong>       {{ clienteApellido }}</p>
            <p><strong>Municipio: </strong>      {{ clienteMunicipio }}</p>
            <p><strong>Mail: </strong>           {{ clienteMail }}</p>
            <div><strong>Rol: </strong>            {{ clienteRol }}</div>
            <ins style="color:darkorange; cursor:pointer" @click="changeRole">cambiar rol</ins> 
            <del style="color:red; cursor:pointer;" @click="deleteUser">{{ clienteUsuario }}</del>
            <button type="button" class="btn btn-danger" @click="cambiarMode">Volver</button>
        </div>
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

    .window{

        &.super{
            display: grid;
            grid-template-columns: 48% 50%;
            grid-column-gap: 2%;
            grid-template-rows: auto;

            h2 {
                grid-column: 1/3;
                text-align: center;
                white-space: nowrap;
                padding-bottom: 10px;
            }

            label{
                grid-column: 1;
                align-self: center;
                padding-left: 20px;
                margin-bottom: 20px;
            }
        
            input{
                align-self: center;
                grid-column: 2;
                margin-bottom: 20px;
                padding: 4px;
                width: 90%;
            }

            button{
                grid-column: 1/3;
                margin: 10px 40px 9px 40px;
            }

        }

        &.userInfo{
            display: grid;
            grid-template-columns: 49% 49%;
            grid-column-gap: 2%;
            grid-template-rows: auto;

            h2 {
                grid-column: 1/3;
                text-align: center;
                padding-bottom: 15px;
                white-space: nowrap;
            }

            button{
                grid-column: 1/3;
                margin: 10px 40px 9px 40px;
            }

            p{
                white-space: nowrap;
                padding: 2px 60px 2px 7px;

                strong{
                    padding-right: 3px ;
                }
            }

            div{
                grid-column: 1/3;
                text-align: center;
            }

            ins , del{
                text-align: center;
                padding: 20px 5px 5px 25px;
            }
        }
    }
</style>