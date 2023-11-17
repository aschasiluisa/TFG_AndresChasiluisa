<script lang="ts" src="./MapaCoor.ts"></script>

<template>
    <div class="ContenedorMapa">
        <div id="Mapa" :style="{cursor: dibujar? 'crosshair' : 'grab'}">
            <button type="button" class="zoom-home-boton" id="home"></button>
            <button type="button" id="rule" :class=" { 'rule-boton activo': ruler == true, 'rule-boton inactivo': ruler === false}" @click="changeRuler"></button>

            <div v-show="ruler" class="ruleMenu">
              <h5 class="tituloLeyenda">{{ $t('MapaRule.titulo') }}</h5>
              <div v-if="distancia" style="text-align: center;">
                {{ $t('MapaRule.resultadoDistancia1') }}<b>{{ distancia }}</b>{{ $t('MapaRule.resultadoDistancia2') }}
                <br>
                <button id="ruleReset" @click="resetRuler" class = "botonReset">{{ $t('MapaRule.botonReset') }}</button>
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

  .rule-boton {
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

  .botonReset{
    border-radius: 5px;
    border: none;
    padding: 2px 10px 2px 10px;
    margin: 3px 0 0px 0;
    background-color: $light-color;
    color: $primary-color;
  }

</style>