<script lang="ts" src="./ElementInfo.ts"></script>

<template>
  <div v-if="getElementInfoID.layerID == 1 && getRegistrosCalidadAire" class="containerCalidadAireInfo">
    <h6>
       Estacion {{ getRegistrosCalidadAire[getElementInfoID.elementID].Nombre }}
    </h6>
    <p>
        <strong> Fecha: </strong>
        {{ getRegistrosCalidadAire[getElementInfoID.elementID].Fecha.slice(0, -7) }}
    </p>
    <p>
        <strong> Temperatura: </strong>
        {{ getRegistrosCalidadAire[getElementInfoID.elementID].Temperatura }}
    </p>
    <p>
        <strong> Humedad: </strong>
        {{ getRegistrosCalidadAire[getElementInfoID.elementID].Humedad }}
    </p>
    <p v-if="getRegistrosCalidadAire[getElementInfoID.elementID].CO != 0 && getRegistrosCalidadAire[getElementInfoID.elementID].CO != 1">
        <strong> CO: </strong>
        {{ getRegistrosCalidadAire[getElementInfoID.elementID].CO }}
    </p>
    <p v-if="getRegistrosCalidadAire[getElementInfoID.elementID].NO2 != 0 && getRegistrosCalidadAire[getElementInfoID.elementID].NO2 != 1">
        <strong> NO2: </strong>
        {{ getRegistrosCalidadAire[getElementInfoID.elementID].NO2 }}
    </p>
    <p v-if="getRegistrosCalidadAire[getElementInfoID.elementID].O3 != 0 && getRegistrosCalidadAire[getElementInfoID.elementID].O3 != 1">
        <strong> O3: </strong>
        {{ getRegistrosCalidadAire[getElementInfoID.elementID].O3 }}
    </p>
    <p v-if="getRegistrosCalidadAire[getElementInfoID.elementID].SO2 != 0 && getRegistrosCalidadAire[getElementInfoID.elementID].SO2 != 1">
        <strong> SO2: </strong>
        {{ getRegistrosCalidadAire[getElementInfoID.elementID].SO2 }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
    @import "@/css/globalStyles.scss";

    .containerCalidadAireInfo{
        margin-top: 3%;
        display: grid;
        grid-template-columns: 50% 50%;
        grid-column-gap: 0%;
        white-space: nowrap;

        h6{
            grid-column: 1/3;
        }
    }
</style>