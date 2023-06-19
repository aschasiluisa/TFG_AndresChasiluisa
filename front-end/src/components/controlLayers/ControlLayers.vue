<script lang="ts" src="./ControlLayers.ts"></script>

<template>
  <table class="tablaLayers">

    <thead>
      <tr class="titulosTabla">
        <h3><strong>CONTROL LAYERS</strong></h3>
      </tr>
    </thead>

    <tr class="titulosTabla">
      Mapa Base
    </tr>

    <tr class="inputBaseMap">
      {{ selectedBaseMap.name }}
      <div v-if="!showMapOptions">
        <button class="btn dropdown-toggle" @click="toggleMapOptions" style="color: rgb(0, 138, 184);" ></button>
      </div>
      <div v-else class="dropup">
        <button class="btn dropdown-toggle" @click="toggleMapOptions" style="color: rgb(0, 138, 184);" ></button>
      </div>
    </tr>

    <div v-if="showMapOptions">
      <div v-for="map in baseMaps" :key="map.id" @click="selectBaseMap(map)">
        <tr v-if="selectedBaseMap.name != map.name" class="desplegable">
          {{ map.name }}
        </tr>
      </div>
    </div>

    <tr class="titulosTabla">
      Layers
    </tr>
    
    <div v-for="layer in layers" :key="layer.id">

      <tr class="inputLayerMap">

        <div class="styled-input-single">
          <input type="checkbox" :id="layer.name"  v-model="layersControl[layer.id]" />
          <label :for="layer.name">{{ layer.name }}</label>
        </div>
        <div v-show="getElementInfoID.layerID == layer.id">
          <div v-if="layerID == layer.id" class="dropup">
            <button class="btn dropdown-toggle" style="color: rgb(0, 138, 184);" @click="resetLayerID" ></button>
          </div>
          <button v-else class="btn dropdown-toggle" style="color: rgb(0, 138, 184);" @click="layerInfo(layer.id)" ></button>
        </div>
      </tr>

      <tr  v-if="layerID == layer.id " class="desplegable">
        <div>
          <ElementInfo/>
        </div>
      </tr>

    </div>

    <tr class="titulosTabla">

    </tr>

  </table>
</template>

<style lang="scss" scoped>

@import "@/css/globalStyles.scss";

.tablaLayers {
  grid-column: 2;
  margin-right: 40%;
  background-color: transparent;
  box-shadow: 0px 0px 40px -5px rgba(0,0,0,0.5);
  border-radius: 20px;

  tr {
    display: flex; 
    align-items: center; 
    text-align: center;
  }
}

.titulosTabla:first-child{
  height:50px;
  width: 100%;

  border-top-left-radius: 20px; 
  border-top-right-radius: 20px;

  font-family: Cambria;
  color: $primary-color;
  background-color: $light-color;
  
  justify-content: center;
}

.titulosTabla:nth-child(n+2) {
  height:43px;
  width: 100%;
  border-top: 1px solid $secondary-color;
  background-color: $primary-color;
  color: white;
  font-family: Cambria;
  justify-content: center;
}

.titulosTabla:last-child:not(:first-child){
  width: 100%;
  background-color: $light-color;
  color: $light-color;
  border-bottom-left-radius: 20px; 
  border-bottom-right-radius: 20px;
}

.inputBaseMap {
  width: 100%;
  border-top: 1px solid $secondary-color;
  background-color: $light-color;
  justify-content: center;
}

.inputLayerMap {
  width: 100%;
  border-top: 1px solid $secondary-color;
  background-color: $light-color;
  height:40px;
}

.desplegable {
  width: 99.4%;
 
  border: 2px solid $light-color;
  border-left: 10px solid $light-color;
  border-right: 10px solid $light-color;
 
  background-color: white;
  cursor: pointer;

  align-self: center;
  justify-content: center;
  position:relative;
  left: 0.3%;
}

.styled-input-single {
  position: relative;
  padding: 20px 0 20px 35px;
  text-align: left;
  
  label {
    cursor: pointer;
    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 60%;
      border-radius: 50%;
    }
    &:before {
      left: 0;
      width: 18px;
      height: 18px;
      margin: -15px 8px 0;
      background: white;
      box-shadow: 0 0 1px grey;
      border: 1px solid $secondary-color;
    }
    &:after {
      left: 3px;
      width: 12px;
      height: 12px;
      margin: -11.5px 8px 0 ;
      opacity: 0;
      background: $primary-color
    }
  }
  
   input[type="checkbox"] {
    position: absolute;
    top: 0;
    left: -9999px;
    visibility: hidden;
    
    &:checked + label {
      &:after {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
    }
  }
}

</style>