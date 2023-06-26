<template>
    <div class="page">

        <div v-show="!!responseError">    
            <div class="alert">
                <p v-if="responseError === responseRegistrosAlarmasControl.emptyFieldError">
                    <strong>Error!</strong> campos obligatorios vacios
                </p>
                <p v-if="responseError === responseRegistrosAlarmasControl.coorBboxError">
                    <strong>Error!</strong> localización fuera de la isla
                </p>
                <p v-if="responseError === responseRegistrosAlarmasControl.coorFormatError">
                    <strong>Error!</strong> formato de coordenadas incorrecto
                </p>
                <p v-if="responseError === responseRegistrosAlarmasControl.serverError">
                    <strong>Error!</strong> error en el servidor
                </p>
                <p v-if="responseError === responseRegistrosAlarmasControl.rangoError">
                    <strong>Error!</strong> rango incorrecto
                </p>
            </div>
        </div>

        <div class="window form">
            <h1>Nueva Alarma</h1>

            <label class="label label-default" for="nombre">
                Nombre*
            </label>
            <input type="text" id="nombre" class="form-control" v-model="nombre">

            <label class="label label-default" for="rango">
                Rango*
            </label>
            <input type="text" id="rango" class="form-control" v-model="rango" placeholder="de 100 m a 3000 m">

            <label class="label label-default" for="coordenadas">
                Coordenadas* 
            </label>
            <input type="text" id="coordenadas" class="form-control" v-model="coordenadas" placeholder="latitud,longitud "> 

            <button  type="button" :disabled="sendingData" class="btn btn-success" style="margin-top: 6%;" @click="nuevaAlarma">Guardar Alarma</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { useAuthStore } from "@/composables/useAuthStore"
    import { useMapStore } from "@/composables/useMapStore"
    import { ref, watch, onMounted, computed } from "vue"
    import { responseRegistrosAlarmasControl} from '@/api/mapAPI'
    import router from '@/router';

    export default{
      name:'crearAlarma',
      setup(){

        const nombre = ref();
        const rango = ref();
        const coordenadas = ref();

        const { 
          getUserToken,
        } = useAuthStore();

        const {
          mapResponse,
          nuevaAlarma,
          getBbox,
          sendingData,
        } = useMapStore();

        const responseError = computed(()=>(mapResponse.value && mapResponse.value !== responseRegistrosAlarmasControl.ok)? mapResponse.value:undefined);

        watch(mapResponse, () => {
          if(mapResponse.value == responseRegistrosAlarmasControl.ok) router.push({ name: "VisorLaPalma" })
        })

        return{
            nombre,
            rango,
            coordenadas,

            sendingData,

            responseRegistrosAlarmasControl,
            responseError,

            nuevaAlarma: () => {
                nuevaAlarma(getUserToken.value, nombre.value, rango.value, coordenadas.value, getBbox.value);
            },
        }
      }
    }

</script>
  
<style lang="scss" scoped>
    @import "@/css/globalStyles.scss";
</style>