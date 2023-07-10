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

            <label class="label label-default" for="nombre_es">
                {{ $t('EditarIncidencia.nombre_es') }}*
            </label>
            <input type="text" id="nombre_es" class="form-control" v-model="nombre_es" :placeholder= "preNombre_es">

            <label class="label label-default" for="nombre_en">
                {{ $t('EditarIncidencia.nombre_en') }}*
            </label>
            <input type="text" id="nombre_en" class="form-control" v-model="nombre_en" :placeholder= "preNombre_en">
            
            <label class="label label-default" for="tipo">
                {{ $t('EditarIncidencia.tipo') }}*
            </label>
            <select id="tipo" class="form-control" v-model="tipo" >
                <option value="" disabled selected hidden>
                    <div v-if="getIdioma === Idiomas.ES">
                        {{ getTypeIncidence[getRegistroInfo.Tipo].name_es }} 
                    </div>
                    <div v-else-if="getIdioma === Idiomas.EN">
                        {{ getTypeIncidence[getRegistroInfo.Tipo].name_en }} 
                    </div>
                </option>
                <option v-for="(incidence, key) in getTypeIncidence" :key="key" :value="key">
                    <div v-if="getIdioma === Idiomas.ES">
                        {{ incidence.name_es }}
                    </div>
                    <div v-else-if="getIdioma === Idiomas.EN">
                        {{ incidence.name_en }}
                    </div>
                </option>
            </select>

            <label class="label label-default" for="coordenadas">
                {{ $t('EditarIncidencia.coordenadas') }}* 
            </label>
            <input type="text" id="coordenadas" class="form-control" v-model="coordenadas" :placeholder= "preCoordenadas"> 
            
            <label class="label label-default" for="imagen">
                {{ $t('EditarIncidencia.imagen') }}
            </label>
            <input class="form-control" type="file" id="imagen" name="imagen" @change="buscarImagen" accept="image/png, image/jpeg, image/jpg">
            
            <label for="descripcion_es" class="form-label">
                {{ $t('EditarIncidencia.descripcion_es') }}
            </label>
            <textarea class="form-control" id="descripcion_es" rows="2" maxlength="1000" v-model="descripcion_es" :placeholder= "preDescripcion_es"></textarea>

            <label for="descripcion_en" class="form-label" style="padding-top: 20px;">
                {{ $t('EditarIncidencia.descripcion_en') }}
            </label>
            <textarea class="form-control" id="descripcion_en" rows="2" maxlength="1000" v-model="descripcion_en" :placeholder= "preDescripcion_en" style="margin-top: 20px;"></textarea>

            <button  type="button" :disabled="sendingData" class="btn btn-success" style="margin-top: 6%;" @click="updateUserInfo">{{ $t('EditarIncidencia.enviar') }}</button>
            <button  type="button" :disabled="sendingData" class="btn btn-danger"  @click="deleteIncidencia">{{ $t('EditarIncidencia.borrar') }}</button>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref,  watch, computed, onMounted, toValue } from "vue";
import { useMapStore } from "@/composables/useMapStore";
import { useAuthStore } from "@/composables/useAuthStore";
import { useI18nStore } from "@/composables/useI18nStore"
import { responseRegistrosIncidenciasControl} from '@/api/mapAPI'
import { Buffer } from 'buffer';
import router from '@/router';

import { Idiomas } from  "../i18n/index"

export default defineComponent({
    name: 'ElementInfo',
    setup() {

        const nombre_es = ref();
        const nombre_en = ref();
        const tipo = ref(""); //importante pobner "" para que se detecte su placeholder
        const coordenadas = ref();
        let imagen: File | undefined;
        const descripcion_es = ref();
        const descripcion_en = ref();
        const preNombre_es = ref();
        const preNombre_en = ref();
        const preDescripcion_es = ref();
        const preDescripcion_en = ref();

        const { 
            getRegistroInfo,
            getElementInfoID,
            getTypeIncidence,
            sendingData,
            getBbox,
            mapResponse,
            updateIncidencia,
            deleteIncidencia
          } = useMapStore();

        const {
            getUserToken,
        } = useAuthStore();

        const {
          getIdioma,
        } = useI18nStore();

        if(getRegistroInfo.value.Validada){
            preNombre_es.value = getRegistroInfo.value.Nombre_es;
            preNombre_en.value = getRegistroInfo.value.Nombre_en;

            if(getRegistroInfo.value.Descripcion_es){
                preDescripcion_es.value = getRegistroInfo.value.Descripcion_es;
                preDescripcion_en.value = getRegistroInfo.value.Descripcion_en;
            }
        } else {
            preNombre_en.value = preNombre_es.value = getRegistroInfo.value.Nombre;

            if(getRegistroInfo.value.Descripcion){
                preDescripcion_es.value = preDescripcion_en.value = getRegistroInfo.value.Descripcion;
            }
        }

        const preCoordenadas = getRegistroInfo.value.Latitud+","+getRegistroInfo.value.Longitud;

        const responseError = computed(()=>(mapResponse.value && mapResponse.value !== responseRegistrosIncidenciasControl.ok)? mapResponse.value:undefined);

        watch(mapResponse, () => {
          if(mapResponse.value == responseRegistrosIncidenciasControl.ok) router.push({ name: "VisorLaPalma" })
        })

        return {
            nombre_es,
            nombre_en,
            tipo,
            coordenadas,
            descripcion_es,
            descripcion_en,

            preNombre_es,
            preNombre_en,
            preDescripcion_es,
            preDescripcion_en,
            preCoordenadas,

            getElementInfoID,
            getRegistroInfo,
            getTypeIncidence,
            Buffer,

            sendingData,
            responseError,
            responseRegistrosIncidenciasControl,

            getIdioma,
            Idiomas,

            buscarImagen: (event: Event) => {
                event.preventDefault();
                
                const imagenInput = event.target as HTMLInputElement
                imagen = imagenInput.files![0];
            },

          updateUserInfo: () => {
                if(!nombre_es.value) nombre_es.value = preNombre_es.value
                if(!nombre_en.value) nombre_en.value = preNombre_en.value
                if(!tipo.value) tipo.value = getRegistroInfo.value.Tipo
                if(!coordenadas.value) coordenadas.value = preCoordenadas
                if(!descripcion_es.value) descripcion_es.value = preDescripcion_es.value
                if(!descripcion_en.value) descripcion_en.value = preDescripcion_en.value
                if(!imagen) imagen = undefined

                updateIncidencia(getUserToken.value, getRegistroInfo.value._id, nombre_es.value, nombre_en.value, tipo.value, coordenadas.value, imagen, descripcion_es.value, descripcion_en.value, getRegistroInfo.value.Validada, getBbox.value);
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