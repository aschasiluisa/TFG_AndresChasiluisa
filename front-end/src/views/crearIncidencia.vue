<template>
  <div class="page">

    <div v-show="!!responseError">    
        <div class="alert">
            <p v-if="responseError === responseRegistrosIncidenciasControl.emptyFieldError">
                <strong>{{ $t('CrearIncidencia.error.error') }}!</strong> {{ $t('CrearIncidencia.error.emptyField') }}
            </p>
            <p v-if="responseError === responseRegistrosIncidenciasControl.coorBboxError">
                <strong>{{ $t('CrearIncidencia.error.error') }}!</strong> {{ $t('CrearIncidencia.error.coorBbox') }}
            </p>
            <p v-if="responseError === responseRegistrosIncidenciasControl.imageFormatError">
                <strong>{{ $t('CrearIncidencia.error.error') }}!</strong> {{ $t('CrearIncidencia.error.imageFormat') }}
            </p>
            <p v-if="responseError === responseRegistrosIncidenciasControl.coorFormatError">
                <strong>{{ $t('CrearIncidencia.error.error') }}!</strong> {{ $t('CrearIncidencia.error.coorFormat') }}
            </p>
            <p v-if="responseError === responseRegistrosIncidenciasControl.serverError">
                <strong>{{ $t('CrearIncidencia.error.error') }}!</strong> {{ $t('CrearIncidencia.error.server') }}
            </p>
        </div>
    </div>

    <div class="window form">
      <h1>{{ $t('CrearIncidencia.titulo') }}</h1>

      <div v-if="getAdmin" style=" display: contents;">
        <label class="label label-default" for="nombre_es">
          {{ $t('CrearIncidencia.nombre_es') }}*
        </label>
        <input type="text" id="nombre_es" class="form-control" v-model="nombre_es">

        <label class="label label-default" for="nombre_en">
          {{ $t('CrearIncidencia.nombre_en') }}*
        </label>
        <input type="text" id="nombre_en" class="form-control" v-model="nombre_en">
      </div>

      <div v-else style=" display: contents;">
        <label class="label label-default" for="nombre">
          {{ $t('CrearIncidencia.nombre') }}*
        </label>
        <input type="text" id="nombre" class="form-control" v-model="nombre">
      </div>

      <label class="label label-default" for="tipo">
        {{ $t('CrearIncidencia.tipo') }}*
      </label>
      <select id="tipo" class="form-control" v-model="tipo" >
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
        {{ $t('CrearIncidencia.coordenadas') }}* 
      </label>
      <input type="text" id="coordenadas" class="form-control" v-model="coordenadas" :placeholder="$t('CrearIncidencia.coordenadasPlaceholder')"> 
      
      <label class="label label-default" for="imagen">
        {{ $t('CrearIncidencia.imagen') }}
      </label>
      <input class="form-control" type="file" id="imagen" name="imagen" @change="buscarImagen" accept="image/png, image/jpeg, image/jpg">

      <div v-if="getAdmin" style=" display: contents;">
        <label for="descripcion_es" class="form-label">
          {{ $t('CrearIncidencia.descripcion_es') }}
        </label>
        <textarea class="form-control" id="descripcion_es" rows="2" maxlength="1000" v-model="descripcion_es"></textarea>

        <label for="descripcion_en" class="form-label" style="padding-top: 20px;">
          {{ $t('CrearIncidencia.descripcion_en') }}
        </label>
        <textarea class="form-control" id="descripcion_en" rows="2" maxlength="1000" v-model="descripcion_en" style="margin-top: 20px;"></textarea>
      </div>

      <div v-else style=" display: contents;">
        <label for="descripcion" class="form-label">
          {{ $t('CrearIncidencia.descripcion') }}
        </label>
        <textarea class="form-control" id="descripcion" rows="3" maxlength="1000" v-model="descripcion"></textarea>
      </div>

      <div v-if="getAdmin" style=" display: contents;">
        <button  type="button" :disabled="sendingData" class="btn btn-success" style="margin-top: 6%;" @click="nuevaIncidenciaAdmin">{{ $t('CrearIncidencia.enviar') }}</button>
      </div>      
      
      <div v-else style=" display: contents;">
        <button  type="button" :disabled="sendingData" class="btn btn-success" style="margin-top: 6%;" @click="nuevaIncidencia">{{ $t('CrearIncidencia.enviar') }}</button>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
    import { useAuthStore } from "@/composables/useAuthStore"
    import { useMapStore } from "@/composables/useMapStore"
    import { useI18nStore } from "@/composables/useI18nStore"
    import { ref, watch, onMounted, computed } from "vue"
    import { responseRegistrosIncidenciasControl} from '@/api/mapAPI'
    import router from '@/router';

    import { Idiomas } from  "../i18n/index"

    export default{
      name:'crearIncidencia',
      setup(){

        const nombre = ref();
        const nombre_es = ref();
        const nombre_en = ref();
        const tipo = ref();
        const coordenadas = ref();
        const descripcion = ref();
        const descripcion_es = ref();
        const descripcion_en = ref();
        let imagen: File;

        const { 
          getUserToken,
          getAdmin,
        } = useAuthStore();

        const {
          mapResponse,
          nuevaIncidencia,
          nuevaIncidenciaAdmin,
          getBbox,
          getTypeIncidence,
          sendingData,
        } = useMapStore();

        const {
          getIdioma,
        } = useI18nStore();

        const responseError = computed(()=>(mapResponse.value && mapResponse.value !== responseRegistrosIncidenciasControl.ok)? mapResponse.value:undefined);

        watch(mapResponse, () => {
          if(mapResponse.value == responseRegistrosIncidenciasControl.ok) router.push({ name: "VisorLaPalma" })
        })

        return{
          nombre,
          nombre_es,
          nombre_en,
          tipo,
          coordenadas,
          descripcion,
          descripcion_es,
          descripcion_en,

          responseError,
          responseRegistrosIncidenciasControl,

          sendingData,

          getTypeIncidence,

          getIdioma,
          Idiomas,

          getAdmin,

          buscarImagen: (event: Event) => {
            event.preventDefault();
            
            const imagenInput = event.target as HTMLInputElement
            imagen = imagenInput.files![0];
          },

          nuevaIncidencia: () => {
            nuevaIncidencia(getUserToken.value, nombre.value, tipo.value, coordenadas.value, imagen, descripcion.value, getBbox.value);
          },

          nuevaIncidenciaAdmin: () => {
            nuevaIncidenciaAdmin(getUserToken.value, nombre_es.value, nombre_en.value, tipo.value, coordenadas.value, imagen, descripcion_es.value, descripcion_en.value, getBbox.value);
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "@/css/globalStyles.scss";
</style>