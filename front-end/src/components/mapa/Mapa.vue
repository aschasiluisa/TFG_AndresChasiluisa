<script lang="ts" src="./Mapa.ts"></script>

<template>
  <div class="ContenedorMapa">
    <!-- Mapa -->
    <div id="Mapa" :style="{cursor: dibujar? 'crosshair' : 'grab'}">

      <button type="button" id="home"  :class=" { 'zoom-home-boton user': userAuthenticated == true, 'zoom-home-boton nouser': userAuthenticated === false}" @click="goHome"></button>
      <button type="button" :class=" { 'leyenda-boton activo': leyenda == true, 'leyenda-boton inactivo': leyenda === false}" @click="changeLeyenda"></button>
      <button v-show="userAuthenticated" type="button" id="rule" :class=" { 'rule-boton activo': ruler == true, 'rule-boton inactivo': ruler === false}" @click="changeRuler"></button>

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
          <tr>
            <td>
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png" style="height: 25px">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.registros.incidencias')}}
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
          <tr v-show="userAuthenticated && getAdmin">
            <td>
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png" style="height: 25px">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.registros.incidenciaDGT')}}
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
              <img src="http://localhost:8082/geoserver/CAPAStfg/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=tfg-lapalma_perimetro_cola">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.capas.coladasVolcanicas')}}
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
              <img src="http://localhost:8082/geoserver/TFG-LaPalma/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=carreteras&STYLE=terremotosLeyenda">
            </td>
            <td>
              &emsp; {{$t('MapaLeyenda.capas.terremotos')}}
            </td>
          </tr>
        </table>
      </div>

      <div v-if="ruler" class="ruleMenu">
        <h5 class="tituloLeyenda">{{ $t('MapaRule.titulo') }}</h5>
        <div v-if="distancia" style="text-align: center;">
          {{ $t('MapaRule.resultadoDistancia1') }}<b>{{ distancia }}</b>{{ $t('MapaRule.resultadoDistancia2') }}
          <br>
          <button @click="resetRuler" class = "botonReset">{{ $t('MapaRule.botonReset') }}</button>
        </div>
        <div v-else> {{ $t('MapaRule.explicacionHerramienta1') }} <br> {{ $t('MapaRule.explicacionHerramienta2') }}</div>
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

      &.user {
        top: 130px;
      }

      &.nouser{
        top: 90px;
      }
  }

  .leyenda-boton {
      position: absolute;
      top: 50px;
      right: 11px;
      padding: 14px;
      border-color: #ccc;
      z-index: 1000;
      cursor: pointer;

      &.activo{
        width: 8px;
        height: 8px;
        background: url(../../../public/imagenes/leyenda.png);
        background-position: center;
        background-size: contain;
        background-color: white;
      }

      &.inactivo{
        width: 8px;
        height: 8px;
        background: url(../../../public/imagenes/leyenda2.png);
        background-position: center;
        background-size: contain;
        background-color: white;
      }
  }

  .rule-boton {
      position: absolute;
      top: 90px;
      right: 11px;
      padding: 14px;
      border-color: #ccc;
      z-index: 1000;
      cursor: pointer;

      &.activo{
        width: 8px;
        height: 8px;
        background: url(../../../public/imagenes/rule.png);
        background-position: center;
        background-size: contain;
        background-color: white;
      }

      &.inactivo{
        width: 8px;
        height: 8px;
        background: url(../../../public/imagenes/rule2.png);
        background-position: center;
        background-size: contain;
        background-color: white;
      }
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

  .ruleMenu{
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

  .botonReset{
    border-radius: 5px;
    border: none;
    padding: 2px 10px 2px 10px;
    margin: 3px 0 0px 0;
    background-color: $light-color;
    color: $primary-color;
  }
</style>