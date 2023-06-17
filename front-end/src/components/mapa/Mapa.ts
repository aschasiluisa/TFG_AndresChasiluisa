import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";

import leaflet from "leaflet";

export default defineComponent({
    name:'Mapa',
    setup(){

        const CO_data = ref();
        const NO2_data = ref();
        const O3_data = ref();
        const SO2_data = ref();
        let mapa ;
        
        const getData = async () => {
            await axios.get(process.env.VUE_APP_SERVIDOR_URL,{})
            .then(function(response){
                CO_data.value = response.data.registrosCO_data;
                NO2_data.value = response.data.registrosNO2_data;
                O3_data.value = response.data.registrosO3_data;
                SO2_data.value = response.data.registrosSO2_data;
            })  
            .catch(function(error){
                console.log(error);
            })
        }
       

        onMounted( async () => {

            await getData();

            mapa = leaflet.map("Mapa",{zoomSnap:0.1}).setView([28.655, -17.865],10.5);

            leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapa);

            //Mapas Base
            const OpenStreetMap = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
            
            const OpenTopoMap = leaflet.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'});
            
            const Stadia_AlidadeSmoothDark = leaflet.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'});
            
            const Esri_WorldImagery = leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'});

            const MapasBase={
                "OpenStreetMap" : OpenStreetMap,
                "OpenTopoMap" : OpenTopoMap,
                "Mapa oscuro" : Stadia_AlidadeSmoothDark,
                "Ortofoto" : Esri_WorldImagery,
            };
            
            const RegistrosCO = leaflet.layerGroup();

            for (let i = 0; i < CO_data.value.length; i++){
                leaflet.marker([CO_data.value[i].Latitud,CO_data.value[i].Longitud]).addTo(RegistrosCO).bindPopup(`${CO_data.value[i].CO}`);
            }

            const RegistrosNO2 = leaflet.layerGroup();

            for (let i = 0; i < NO2_data.value.length; i++){
                leaflet.marker([NO2_data.value[i].Latitud,NO2_data.value[i].Longitud]).addTo(RegistrosNO2).bindPopup(`${NO2_data.value[i].NO2}`);
            }

            const RegistrosO3 = leaflet.layerGroup();

            for (let i = 0; i < O3_data.value.length; i++){
                leaflet.marker([O3_data.value[i].Latitud,O3_data.value[i].Longitud]).addTo(RegistrosO3).bindPopup(`${O3_data.value[i].O3}`);
            }

            const RegistrosSO2 = leaflet.layerGroup();

            for (let i = 0; i < SO2_data.value.length; i++){
                leaflet.marker([SO2_data.value[i].Latitud,SO2_data.value[i].Longitud]).addTo(RegistrosSO2).bindPopup(`${SO2_data.value[i].SO2}`);
            }

            const Capas={
                "Registros de CO" : RegistrosCO,
                "Registros de NO2" : RegistrosNO2,
                "Registros de O3" : RegistrosO3,
                "Registros de SO2" : RegistrosSO2,
            }
            
            leaflet.control.layers(MapasBase,Capas).addTo(mapa);
		    leaflet.control.scale().addTo(mapa);
        })

        return {
  
        }
    }
})