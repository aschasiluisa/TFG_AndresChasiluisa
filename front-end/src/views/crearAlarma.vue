<template>
    <div class="page">

        <div v-show="!!responseError">    
            <div class="alert">
                <p v-if="responseError === responseRegistrosAlarmasControl.emptyFieldError">
                    <strong>{{ $t('CrearAlarma.error.error') }}!</strong> {{ $t('CrearAlarma.error.emptyField') }}
                </p>
                <p v-if="responseError === responseRegistrosAlarmasControl.coorBboxError">
                    <strong>{{ $t('CrearAlarma.error.error') }}!</strong> {{ $t('CrearAlarma.error.coorBbox') }}
                </p>
                <p v-if="responseError === responseRegistrosAlarmasControl.coorFormatError">
                    <strong>{{ $t('CrearAlarma.error.error') }}!</strong> {{ $t('CrearAlarma.error.coorFormat') }}
                </p>
                <p v-if="responseError === responseRegistrosAlarmasControl.rangoError">
                    <strong>{{ $t('CrearAlarma.error.error') }}!</strong> {{ $t('CrearAlarma.error.rango') }}
                </p>
                <p v-if="responseError === responseRegistrosAlarmasControl.serverError">
                    <strong>{{ $t('CrearAlarma.error.error') }}!</strong> {{ $t('CrearAlarma.error.server') }}
                </p>
            </div>
        </div>

        <div class="window form">
            <h1>{{ $t('CrearAlarma.titulo') }}</h1>

            <label class="label label-default" for="nombre">
                {{ $t('CrearAlarma.nombre') }}*
            </label>
            <input type="text" id="nombre" class="form-control" v-model="nombre">

            <label class="label label-default" for="rango">
                {{ $t('CrearAlarma.rango') }}*
            </label>
            <input type="text" id="rango" class="form-control" v-model="rango" :placeholder="$t('CrearAlarma.rangoPlaceholder')">

            <label class="label label-default" for="coordenadas">
                {{ $t('CrearAlarma.coordenadas') }}* 
            </label>
            <input type="text" id="coordenadas" class="form-control" v-model="coordenadas" :placeholder="$t('CrearAlarma.coordenadasPlaceholder')"> 

            <button  type="button" :disabled="sendingData" class="btn btn-success" style="margin-top: 6%;" @click="nuevaAlarma">{{ $t('CrearAlarma.guardar') }}</button>
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