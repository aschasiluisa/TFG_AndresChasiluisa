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

      <label class="label label-default" for="nombre">
        {{ $t('CrearIncidencia.nombre') }}*
      </label>
      <input type="text" id="nombre" class="form-control" v-model="nombre">
      
      <label class="label label-default" for="tipo">
        {{ $t('CrearIncidencia.tipo') }}*
      </label>
      <select id="tipo" class="form-control" v-model="tipo" >
          <option value="Accidente de Trafico">{{ $t('CrearIncidencia.tipoIncidencia.accidente') }}</option>
          <option value="Derrumbe">{{ $t('CrearIncidencia.tipoIncidencia.derrumbe') }}</option>
          <option value="Incendio">{{ $t('CrearIncidencia.tipoIncidencia.incendio') }}</option>
          <option value="Inundación">{{ $t('CrearIncidencia.tipoIncidencia.inundacion') }}</option>
          <option value="Calima">{{ $t('CrearIncidencia.tipoIncidencia.calima') }}</option>
          <option value="Erupción">{{ $t('CrearIncidencia.tipoIncidencia.erupcion') }}</option>
          <option value="Escape de gases">{{ $t('CrearIncidencia.tipoIncidencia.escape') }}</option>
          <option value="Otro">{{ $t('CrearIncidencia.tipoIncidencia.otro') }}</option>
      </select>

      <label class="label label-default" for="coordenadas">
        {{ $t('CrearIncidencia.coordenadas') }}* 
      </label>
      <input type="text" id="coordenadas" class="form-control" v-model="coordenadas" :placeholder="$t('CrearIncidencia.coordenadasPlaceholder')"> 
      
      <label class="label label-default" for="imagen">
        {{ $t('CrearIncidencia.imagen') }}
      </label>
      <input class="form-control" type="file" id="imagen" name="imagen" @change="buscarImagen" accept="image/png, image/jpeg, image/jpg">
      
      <label for="exampleFormControlTextarea1" class="form-label">
        {{ $t('CrearIncidencia.descripcion') }}
      </label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" maxlength="1000" v-model="descripcion"></textarea>

      <button  type="button" :disabled="sendingData" class="btn btn-success" style="margin-top: 6%;" @click="nuevaIncidencia">{{ $t('CrearIncidencia.enviar') }}</button>
    </div>
  </div>
</template>
  
<script lang="ts">
    import { useAuthStore } from "@/composables/useAuthStore"
    import { useMapStore } from "@/composables/useMapStore"
    import { ref, watch, onMounted, computed } from "vue"
    import { responseRegistrosIncidenciasControl} from '@/api/mapAPI'
    import router from '@/router';

    export default{
      name:'crearIncidencia',
      setup(){

        const nombre = ref();
        const tipo = ref();
        const coordenadas = ref();
        const descripcion = ref();
        let imagen: File;

        const { 
          getUserToken,
        } = useAuthStore();

        const {
          mapResponse,
          nuevaIncidencia,
          getBbox,
          sendingData,
        } = useMapStore();

        const responseError = computed(()=>(mapResponse.value && mapResponse.value !== responseRegistrosIncidenciasControl.ok)? mapResponse.value:undefined);

        watch(mapResponse, () => {
          if(mapResponse.value == responseRegistrosIncidenciasControl.ok) router.push({ name: "VisorLaPalma" })
        })

        return{
          nombre,
          tipo,
          coordenadas,
          descripcion,

          responseError,
          responseRegistrosIncidenciasControl,

          sendingData,

          buscarImagen: (event: Event) => {
            event.preventDefault();
            
            const imagenInput = event.target as HTMLInputElement
            imagen = imagenInput.files![0];
          },

          nuevaIncidencia: () => {
            nuevaIncidencia(getUserToken.value, nombre.value, tipo.value, coordenadas.value, imagen, descripcion.value, getBbox.value);
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "@/css/globalStyles.scss";
</style>