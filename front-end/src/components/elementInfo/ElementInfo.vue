<script lang="ts" src="./ElementInfo.ts"></script>

<template>
  <div v-if="getElementInfoID == 1 && getRegistroInfo" class="containerCalidadAireInfo">
    <h6>
       Estacion {{ getRegistroInfo.Nombre }}
    </h6>
    <p>
        <strong> Fecha: </strong>
        {{ getRegistroInfo.Fecha.slice(0, -7) }}
    </p>
    <p>
        <strong> Temperatura: </strong>
        {{ getRegistroInfo.Temperatura }}
    </p>
    <p>
        <strong> Humedad: </strong>
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
            <strong> {{ getRegistroInfo.Nombre }} </strong>
        </p>
        <p>
            <strong> Fecha: </strong>
            {{ getRegistroInfo.Fecha }}
        </p>
        <p>
            <strong> Tipo: </strong>
            {{ getRegistroInfo.Tipo }}
        </p>
    </div>

    <div class="image-container">
        <img :src="`data:${getRegistroInfo.Imagen.contentType};base64,${Buffer.from(getRegistroInfo.Imagen.data.data).toString('base64')}`" alt="Imagen" class="img-fluid d-block aumentarImagen" />
    </div>

    <p v-if="getRegistroInfo.Descripcion">
        <strong> Descripcion: </strong><br>
        {{ getRegistroInfo.Descripcion }}
    </p>

    <button v-if="getRole == 1" id="editRegistro" class="btn btn-success"> Editar Incidencia </button>

  </div>

  <div v-if="getElementInfoID == 3 && getRegistroInfo" class="containerAlarmasInfo">

    <p class="">
        <strong> Nombre: </strong>
        {{ getRegistroInfo.Nombre }}
    </p>
    <p>
        <strong> Rango: </strong>
        {{ getRegistroInfo.Rango }}
    </p>

    <button v-if="getRegistroInfo.Activada" class="btn btn-warning" @click="resetAlarma(getRegistroInfo._id)"> Resetear Alarma </button>

    <button v-if="getRegistroInfo.Activada" class="btn btn-danger" @click="deleteAlarma(getRegistroInfo._id)"> Borrar Alarma </button>

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