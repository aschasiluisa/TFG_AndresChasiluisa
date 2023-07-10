<script lang="ts" src="./ElementInfo.ts"></script>

<template>
  <div v-if="getElementInfoID == 1 && getRegistroInfo" class="containerCalidadAireInfo">
    <h6>
        {{ $t('ElementInfo.estacion') }} {{ getRegistroInfo.Nombre }}
    </h6>
    <p>
        <strong> {{ $t('ElementInfo.fecha') }}: </strong>
        {{ getRegistroInfo.Fecha }}
    </p>
    <p>
        <strong> {{ $t('ElementInfo.temperatura') }}: </strong>
        {{ getRegistroInfo.Temperatura }}
    </p>
    <p>
        <strong> {{ $t('ElementInfo.humedad') }}: </strong>
        {{ getRegistroInfo.Humedad }}
    </p>
    <p v-if="getRegistroInfo.CO != 0 && getRegistroInfo.CO != 1">
        <strong> CO: </strong>
        {{ getRegistroInfo.CO }}
    </p>
    <p v-if="getRegistroInfo.NO2 != 0 && getRegistroInfo.NO2 != 1">
        <strong> NO2: </strong>
        {{ getRegistroInfo.NO2 }}
    </p>
    <p v-if="getRegistroInfo.O3 != 0 && getRegistroInfo.O3 != 1">
        <strong> O3: </strong>
        {{ getRegistroInfo.O3 }}
    </p>
    <p v-if="getRegistroInfo.SO2 != 0 && getRegistroInfo.SO2 != 1">
        <strong> SO2: </strong>
        {{ getRegistroInfo.SO2 }}
    </p>
  </div>

  <div v-if="getElementInfoID == 2 && getRegistroInfo" class="containerIncidenciasInfo">
    <div>
        <p>
            <strong> 
                <div v-if="getIdioma === Idiomas.ES">
                    {{ Nombre_es }}
                </div>
                <div v-else-if="getIdioma === Idiomas.EN">
                    {{ Nombre_en }}
                </div>
             </strong>
        </p>
        <p>
            <strong> {{ $t('ElementInfo.fecha') }}: </strong>
            {{ getRegistroInfo.Fecha }}
        </p>
        <p>
            <strong> {{ $t('ElementInfo.tipo') }}: </strong>
            <span v-if="getIdioma === Idiomas.ES">
                {{ getTypeIncidence[getRegistroInfo.Tipo].name_es }}
            </span>
            <span v-else-if="getIdioma === Idiomas.EN">
                {{ getTypeIncidence[getRegistroInfo.Tipo].name_en }}
            </span>
        </p>
    </div>

    <div class="image-container">
        <img :src="`data:${getRegistroInfo.Imagen.contentType};base64,${Buffer.from(getRegistroInfo.Imagen.data.data).toString('base64')}`" alt="Imagen" class="img-fluid d-block aumentarImagen" />
    </div>

    <p v-if="Descripcion_es && Descripcion_en">
        <strong> {{ $t('ElementInfo.descripcion') }}: </strong><br>
        <span v-if="getIdioma === Idiomas.ES">
            {{ Descripcion_es }}
        </span>
        <span v-else-if="getIdioma === Idiomas.EN">
            {{ Descripcion_en }}
        </span>
    </p>

    <button v-if="getAdmin" id="editRegistro" class="btn btn-success"> {{ $t('ElementInfo.modIncidencia') }} </button>

  </div>

  <div v-if="getElementInfoID == 3 && getRegistroInfo" class="containerAlarmasInfo">

    <p class="">
        <strong> {{ $t('ElementInfo.nombre') }}: </strong>
        {{ getRegistroInfo.Nombre }}
    </p>
    <p>
        <strong> {{ $t('ElementInfo.rango') }}: </strong>
        {{ getRegistroInfo.Rango }}
    </p>

    <button v-if="getRegistroInfo.Activada" class="btn btn-warning" @click="resetAlarma(getRegistroInfo._id)"> {{ $t('ElementInfo.resAlarma') }} </button>

    <button v-if="getRegistroInfo.Activada" class="btn btn-danger" @click="deleteAlarma(getRegistroInfo._id)"> {{ $t('ElementInfo.borrAlarma') }} </button>

    <input v-if="!getRegistroInfo.Activada" class="btn btn-danger" type="button" value="Borrar Alarma" @click="deleteAlarma(getRegistroInfo._id)">

  </div>
</template>

<style lang="scss" scoped>
    @import "@/css/globalStyles.scss";

    .containerCalidadAireInfo{
        margin-top: 3%;
        display: grid;
        grid-template-columns: 50% 50%;
        white-space: nowrap;

        h6{
            grid-column: 1/3;
        }
    }

    .containerIncidenciasInfo{
        margin-top: 3%;
        display: grid;
        grid-template-columns: 50% 50%;

        p, button {
            grid-column: 1/3;
        }

        button {
            margin: 0px 50px 9px 50px;
        }
    }

    .containerAlarmasInfo{
        margin-top: 3%;
        display: grid;
        width: 100%;
        grid-template-columns: 50% 50%;
        white-space: nowrap;

        input{
            grid-column: 1/3;
            margin: 0 20% 0 20% ;
        }

        button{
            margin: 0 10% 5% 10% ;
        }
    }

    .image-container{
        width: 200px; /* Ancho de la caja en píxeles */
        height: 200px; /* Alto de la caja en píxeles */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .aumentarImagen:hover{
        transform: scale(2.5)
    }

    .aumentarImagen{
        transition: transform 1s;
        z-index: 1000;
    }
</style>