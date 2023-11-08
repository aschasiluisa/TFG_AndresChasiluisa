<template>
    <div class="page" id="grid-Map">
        <MapaCoor />
        <div style="margin-right: 40%;">
            <div v-show="!!responseError">    
                <div class="alert" style="margin-left: 20%;">
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
                <input type="text" id="coordenadas" class="form-control" v-model="mapaCoor" :placeholder="$t('CrearAlarma.coordenadasPlaceholder')"> 

                <button  type="button" :disabled="sendingData" class="btn btn-success" style="margin-top: 6%;" @click="nuevaAlarma">{{ $t('CrearAlarma.guardar') }}</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { useAuthStore } from "@/composables/useAuthStore"
    import { useMapStore } from "@/composables/useMapStore"
    import { ref, watch, onMounted, computed } from "vue"
    import { responseRegistrosAlarmasControl} from '@/api/mapAPI'
    import router from '@/router';

    import MapaCoor from '@/components/mapaCoor/MapaCoor.vue'

    export default{
      name:'crearAlarma',
      components:{
            MapaCoor,
      },
      setup(){

        const nombre = ref();
        const rango = ref();
        const coordenadas = ref();

        const { 
          getUserToken,
        } = useAuthStore();

        const {
          mapaCoor,
          mapResponse,
          setMapaCoor,
          setCentrarCoor,
          nuevaAlarma,
          getBbox,
          sendingData,
        } = useMapStore();

        const responseError = computed(()=>(mapResponse.value && mapResponse.value !== responseRegistrosAlarmasControl.ok)? mapResponse.value:undefined);

        watch(mapResponse, () => {
          if(mapResponse.value == responseRegistrosAlarmasControl.ok) router.push({ name: "VisorLaPalma" })
        })

        setMapaCoor(undefined);

        onMounted(() => {
        const inputCoor = document.getElementById('coordenadas');

        inputCoor!.addEventListener('blur', function(event) {     
            const elemento = event.target;
            if(elemento instanceof HTMLInputElement) {
            setCentrarCoor(elemento.value);
            setMapaCoor(elemento.value)
            }
        });
        })

        return{
            nombre,
            rango,
            mapaCoor,

            sendingData,

            responseRegistrosAlarmasControl,
            responseError,

            nuevaAlarma: () => {
                nuevaAlarma(getUserToken.value, nombre.value, rango.value, mapaCoor.value!, getBbox.value);
            },
        }
      }
    }

</script>
  
<style lang="scss" scoped>
    @import "@/css/globalStyles.scss";

    #grid-Map{
        display: grid;
        grid-template-columns: 50% 50%;
    }

</style>