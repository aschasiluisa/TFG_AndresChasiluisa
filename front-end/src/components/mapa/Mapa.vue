<script lang="ts" src="./Mapa.ts"></script>

<template>
  <div class="ContenedorMapa">
    <!-- Mapa -->
    <div id="Mapa">

      <button type="button" class="zoom-home-boton" @click="home"></button>
      <button type="button" class="leyenda-boton" @click="changeLeyenda"></button>

      <div v-if="leyenda" class="leyenda">
        <table>
          <tr>
            <th colspan="2" class="tituloLeyenda">
              <h5>{{$t('MapaLeyenda.titulo')}}</h5>
            </th>
          </tr>
          <tr>
            <td>
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png" style="height: 25px">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.busqueda')}}
            </td>
          </tr>
          <tr>
            <th colspan="2" class="seccionLeyenda">
              {{$t('MapaLeyenda.registrosTitulo')}}
            </th>
          </tr>
          <tr>
            <td>
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png" style="height: 25px">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.registros.calidadAire')}}
            </td>
          </tr>
          <tr v-show="userAuthenticated">
            <td>
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png" style="height: 25px">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.registros.incindeciasVer')}}
            </td>
          </tr>
          <tr>
            <td>
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png" style="height: 25px">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.registros.incidencias')}}
            </td>
          </tr>
          <tr  v-show="userAuthenticated">
            <td>
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png" style="height: 25px">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.registros.alarmas')}}
            </td>
          </tr>
          <tr  v-show="userAuthenticated">
            <td>
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png" style="height: 25px">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.registros.alarmasAct')}}
            </td>
          </tr>
          <tr>
            <th colspan="2" class="seccionLeyenda">
              {{$t('MapaLeyenda.capasTitulo')}}
            </th>
          </tr>
          <tr>
            <td>
              <img src="http://localhost:8082/geoserver/TFG-LaPalma/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=carreteras&STYLE=carreterasLeyenda">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.capas.carreteras')}}
            </td>
          </tr>
          <tr>
            <td>
              <img src="http://localhost:8082/geoserver/CAPAStfg/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=tfg-lapalma_edificaciones">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.capas.edificios')}}
            </td>
          </tr>
          <tr>
            <td>
              <img src="http://localhost:8082/geoserver/CAPAStfg/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=tfg-lapalma_parcelas&STYLE=parcelasLeyenda">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.capas.parcelas')}}
            </td>
          </tr>
          <tr>
            <td>
              <img src="http://localhost:8082/geoserver/CAPAStfg/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=tfg-lapalma_boca_volcan">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.capas.bocasVolcanicas')}}
            </td>
          </tr>
          <tr>
            <td>
              <img src="http://localhost:8082/geoserver/CAPAStfg/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=tfg-lapalma_perimetro_cola">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.capas.coladasVolcanicas')}}
            </td>
          </tr>
          <tr>
            <td>
              <img src="http://localhost:8082/geoserver/TFG-LaPalma/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=carreteras&STYLE=terremotosLeyenda">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.capas.terremotos')}}
            </td>
          </tr>
        </table>
      </div>

    </div>

  </div>

</template>

<style lang="scss" scoped>

@import "@/css/globalStyles.scss";

  #Mapa {
    height: 98%;
    width: 98%;
    align-self: center;
    border-radius: 20px;
  }

  .ContenedorMapa {
    margin-left: 20%;
    grid-column: 1;
    border-radius: 20px;
    box-shadow: 0px 0px 38px -5px rgba(0,0,0,0.45);
    display: flex;
    justify-content: center;
    height: 95%;
    width: 68%;
    background-color: $light-color;
  }

  .zoom-home-boton {
      position: absolute;
      top: 90px;
      right: 11px;
      width: 8px;
      height: 8px;
      padding: 14px;
      background: url(../../../public/imagenes/casa.png);
      background-position: center;
      background-size: contain;
      background-color: white;
      border-color: #ccc;
      z-index: 1000;
      cursor: pointer;
  }

  .leyenda-boton {
      position: absolute;
      top: 50px;
      right: 11px;
      width: 8px;
      height: 8px;
      padding: 14px;
      background: url(../../../public/imagenes/leyenda.png);
      background-position: center;
      background-size: contain;
      background-color: white;
      border-color: #ccc;
      z-index: 1000;
      cursor: pointer;
  }

  .leyenda{
      position: absolute;
      top: 10px; 
      right: 50px;
      padding: 10px;
      background-color: white;
      border-color: #ccc;
      z-index: 1000;
      border-radius: 5px;
  }

  .tituloLeyenda {
    text-align: center;
    font-family: Cambria;
    color: $secondary-color;
  }

  .seccionLeyenda{
    text-align: center;
    font-family: Cambria;
    color: $primary-color;
  }

</style>