<script lang="ts" src="./Mapa.ts"></script>

<template>
  <div class="ContenedorMapa">
    <!-- Mapa -->
    <div id="Mapa"/>
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
</style>