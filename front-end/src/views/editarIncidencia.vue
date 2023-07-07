<template>
    <div class="page">

        <div v-show="!!responseError">    
            <div class="alert">
                <p v-if="responseError === responseRegistrosIncidenciasControl.coorBboxError">
                    <strong>{{ $t('EditarIncidencia.error.error') }}!</strong> {{ $t('EditarIncidencia.error.coorBbox') }}
                </p>
                <p v-if="responseError === responseRegistrosIncidenciasControl.imageFormatError">
                    <strong>{{ $t('EditarIncidencia.error.error') }}!</strong> {{ $t('EditarIncidencia.error.imageFormat') }}
                </p>
                <p v-if="responseError === responseRegistrosIncidenciasControl.coorFormatError">
                    <strong>{{ $t('EditarIncidencia.error.error') }}!</strong> {{ $t('EditarIncidencia.error.coorFormat') }}
                </p>
                <p v-if="responseError === responseRegistrosIncidenciasControl.serverError">
                    <strong>{{ $t('EditarIncidencia.error.error') }}!</strong> {{ $t('EditarIncidencia.error.server') }}
                </p>
            </div>
        </div>

        <div class="window form">
            <h1>{{ $t('EditarIncidencia.titulo') }}</h1>

            <label class="label label-default" for="nombre">
                {{ $t('EditarIncidencia.nombre') }}*
            </label>
            <input type="text" id="nombre" class="form-control" v-model="nombre" :placeholder= "`${getRegistroInfo.Nombre}`">
            
            <label class="label label-default" for="tipo">
                {{ $t('EditarIncidencia.tipo') }}*
            </label>
            <select id="tipo" class="form-control" v-model="tipo" >
                <option value="" disabled selected hidden> {{ getRegistroInfo.Tipo }} </option>
                <option value="Accidente de Trafico">{{ $t('EditarIncidencia.tipoIncidencia.accidente') }}</option>
                <option value="Derrumbe">{{ $t('EditarIncidencia.tipoIncidencia.derrumbe') }}</option>
                <option value="Incendio">{{ $t('EditarIncidencia.tipoIncidencia.incendio') }}</option>
                <optionn value="Inundación">{{ $t('EditarIncidencia.tipoIncidencia.inundacion') }}</optionn>
                <option value="Calima">{{ $t('EditarIncidencia.tipoIncidencia.calima') }}</option>
                <option value="Erupción">{{ $t('EditarIncidencia.tipoIncidencia.erupcion') }}</option>
                <option value="Escape de gases">{{ $t('EditarIncidencia.tipoIncidencia.escape') }}</option>
                <option value="Otro">{{ $t('EditarIncidencia.tipoIncidencia.otro') }}</option>
            </select>

            <label class="label label-default" for="coordenadas">
                {{ $t('EditarIncidencia.coordenadas') }}* 
            </label>
            <input type="text" id="coordenadas" class="form-control" v-model="coordenadas" :placeholder= "preCoordenadas"> 
            
            <label class="label label-default" for="imagen">
                {{ $t('EditarIncidencia.imagen') }}
            </label>
            <input class="form-control" type="file" id="imagen" name="imagen" @change="buscarImagen" accept="image/png, image/jpeg, image/jpg">
            
            <label for="exampleFormControlTextarea1" class="form-label">
                {{ $t('EditarIncidencia.descripcion') }}
            </label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" maxlength="1000" v-model="descripcion" :placeholder= "preDescripcion"></textarea>

            <button  type="button" :disabled="sendingData" class="btn btn-success" style="margin-top: 6%;" @click="updateUserInfo">{{ $t('EditarIncidencia.enviar') }}</button>
            <button  type="button" :disabled="sendingData" class="btn btn-danger"  @click="deleteIncidencia">{{ $t('EditarIncidencia.borrar') }}</button>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref,  watch, computed, onMounted, toValue } from "vue";
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
        const preDescripcion = ref();

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

        if(getRegistroInfo.value.Descripcion){
            preDescripcion.value = getRegistroInfo.value.Descripcion;
        }
        
        return {
            nombre,
            tipo,
            coordenadas,
            descripcion,

            preDescripcion,
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

                updateIncidencia(getUserToken.value, getRegistroInfo.value._id, nombre.value, tipo.value, coordenadas.value, imagen, descripcion.value, getRegistroInfo.value.Validada, getBbox.value);
            },

            deleteIncidencia: () => {
                deleteIncidencia(getUserToken.value, getRegistroInfo.value._id, getRegistroInfo.value.Validada, getRegistroInfo.value.Nombre);
            },        
        }
    },
})
</script>

<style lang="scss" scoped>
  @import "@/css/globalStyles.scss";
</style>