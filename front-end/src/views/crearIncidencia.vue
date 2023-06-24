<template>
  <div class="page">

    <div v-show="!!responseError">    
        <div class="alert">
            <p v-if="responseError === responseRegistrosIncidenciasControl.emptyFieldError">
                <strong>Error!</strong> campos obligatorios vacios
            </p>
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
      <h1>Nueva Incidencia</h1>

      <label class="label label-default" for="nombre">
          Nombre*
      </label>
      <input type="text" id="nombre" class="form-control" v-model="nombre">
      
      <label class="label label-default" for="tipo">
          Tipo de incidencia*
      </label>
      <select id="tipo" class="form-control" v-model="tipo" >
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
      <input type="text" id="coordenadas" class="form-control" v-model="coordenadas" placeholder="latitud,longitud "> 
      
      <label class="label label-default" for="imagen">
          Imagen
      </label>
      <input class="form-control" type="file" id="imagen" name="imagen" @change="buscarImagen" accept="image/png, image/jpeg, image/jpg">
      
      <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" maxlength="1000" v-model="descripcion"></textarea>

      <button  type="button" :disabled="sendingData" class="btn btn-success" style="margin-top: 6%;" @click="nuevaIncidencia">Enviar Incidencia</button>
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