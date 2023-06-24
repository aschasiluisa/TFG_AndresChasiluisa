<template>
    <div class="page">

        <div v-show="!!responseError">    
            <div class="alert">
                <p v-if="responseError === responseRegistrosIncidenciasControl.coorBboxError">
                    <strong>Error!</strong> localización fuera de la isla
                </p>
                <p v-if="responseError === responseRegistrosIncidenciasControl.imageFormatError">
                    <strong>Error!</strong> formato de imagen incorrecto
                </p>
                <p v-if="responseError === responseRegistrosIncidenciasControl.coorFormatError">
                    <strong>Error!</strong> formato de coordenadas incorrecto
                </p>
                <p v-if="responseError === responseRegistrosIncidenciasControl.serverError">
                    <strong>Error!</strong> error en el servidor
                </p>
            </div>
        </div>

        <div class="window form">
            <h1>Edición de Incidencia</h1>

            <label class="label label-default" for="nombre">
                Nombre*
            </label>
            <input type="text" id="nombre" class="form-control" v-model="nombre" :placeholder= "`${getRegistroInfo.Nombre}`">
            
            <label class="label label-default" for="tipo">
                Tipo de incidencia*
            </label>
            <select id="tipo" class="form-control" v-model="tipo" >
                <option value="" disabled selected hidden> {{ getRegistroInfo.Tipo }} </option>
                <option>Accidente de Trafico</option>
                <option>Derrumbe</option>
                <option>Incendio</option>
                <option>Inundación</option>
                <option>Calima</option>
                <option>Erupción</option>
                <option>Escape de gases</option>
                <option>Otro</option>
            </select>

            <label class="label label-default" for="coordenadas">
                Coordenadas* 
            </label>
            <input type="text" id="coordenadas" class="form-control" v-model="coordenadas" :placeholder= "preCoordenadas"> 
            
            <label class="label label-default" for="imagen">
                Imagen
            </label>
            <input class="form-control" type="file" id="imagen" name="imagen" @change="buscarImagen" accept="image/png, image/jpeg, image/jpg">
            
            <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" maxlength="1000" v-model="descripcion" :placeholder= "`${getRegistroInfo.Descripcion}`"></textarea>

            <button  type="button" :disabled="sendingData" class="btn btn-success" style="margin-top: 6%;" @click="updateUserInfo">Guardar cambios y validar Incidencia</button>
            <button  type="button" :disabled="sendingData" class="btn btn-danger"  @click="deleteIncidencia">Borrar Incidencia</button>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref,  watch, computed, onMounted } from "vue";
import { useMapStore } from "@/composables/useMapStore";
import { useAuthStore } from "@/composables/useAuthStore";
import { responseRegistrosIncidenciasControl} from '@/api/mapAPI'
import { Buffer } from 'buffer';
import router from '@/router';

export default defineComponent({
    name: 'ElementInfo',
    setup() {

        const nombre = ref();
        const tipo = ref(""); //importante pobner "" para que se detecte su placeholder
        const coordenadas = ref();
        let imagen: File | undefined;
        const descripcion = ref();

        const { 
            getRegistroInfo,
            getElementInfoID,
            sendingData,
            getBbox,
            mapResponse,
            updateIncidencia,
            deleteIncidencia
          } = useMapStore();

        const {
            getUserToken,
        } = useAuthStore();

        const preCoordenadas = getRegistroInfo.value.Latitud+","+getRegistroInfo.value.Longitud;

        const responseError = computed(()=>(mapResponse.value && mapResponse.value !== responseRegistrosIncidenciasControl.ok)? mapResponse.value:undefined);

        watch(mapResponse, () => {
          if(mapResponse.value == responseRegistrosIncidenciasControl.ok) router.push({ name: "VisorLaPalma" })
        })
        
        return {
            nombre,
            tipo,
            coordenadas,
            descripcion,

            preCoordenadas,

            getElementInfoID,
            getRegistroInfo,
            Buffer,

            sendingData,
            responseError,
            responseRegistrosIncidenciasControl,

            buscarImagen: (event: Event) => {
                event.preventDefault();
                
                const imagenInput = event.target as HTMLInputElement
                imagen = imagenInput.files![0];
            },

          updateUserInfo: () => {
                if(!nombre.value) nombre.value = getRegistroInfo.value.Nombre
                if(!tipo.value) tipo.value = getRegistroInfo.value.Tipo
                if(!coordenadas.value) coordenadas.value = preCoordenadas
                if(!descripcion.value) descripcion.value = getRegistroInfo.value.Descripcion
                if(!imagen) imagen = undefined

                updateIncidencia(getUserToken.value, getRegistroInfo.value._id, nombre.value, tipo.value, coordenadas.value, imagen, descripcion.value, getBbox.value);
            },

            deleteIncidencia: () => {
                deleteIncidencia(getUserToken.value, getRegistroInfo.value._id);
            },        
        }
    },
})
</script>

<style lang="scss" scoped>
  @import "@/css/globalStyles.scss";
</style>