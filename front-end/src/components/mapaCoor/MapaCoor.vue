<script lang="ts" src="./MapaCoor.ts"></script>

<template>
    <div class="ContenedorMapa">
        <div id="Mapa">
            <button type="button" class="zoom-home-boton" id="home"></button>
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
      top: 50px;
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

</style>