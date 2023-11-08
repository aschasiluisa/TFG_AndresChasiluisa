import { defineComponent, onMounted, ref, watch } from "vue";

import { useMapStore } from "@/composables/useMapStore";
import { useI18nStore } from "@/composables/useI18nStore";

import { Idiomas } from "@/i18n/index"

import L from 'leaflet';
import 'leaflet.heat';

import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import {Geocoder, geocoders} from 'leaflet-control-geocoder';

export default defineComponent({
    name:'MapaCoor',
    setup(){

        const { 
            mapaCoor,
            getBbox,
            getCentrarCoor,
            setMapaCoor,
            setCentrarCoor,
        } = useMapStore();

        const {
            getIdioma,
        } = useI18nStore();

        const limites = L.latLngBounds(
            L.latLng(getBbox.value[0], getBbox.value[1]), // Esquina superior izquierda
            L.latLng(getBbox.value[2], getBbox.value[3])   // Esquina inferior derecha
        );

        const localizacionGeocode = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        const localizacionCoor = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        function canCentrarCoor(coor: string | undefined) {
            const coorVal = /^\d+(\.\d+)?,-?\d+(\.\d+)?$/;

            let latitud: number = 0;
            let longitud: number = 0;
            let localizarIncidencia = false;

            if(coor && coorVal.test(coor)){
                const coorSeparadas = coor.split(",");
                latitud  = parseFloat(coorSeparadas[0].trim())
                longitud = parseFloat(coorSeparadas[1].trim())
                localizarIncidencia = (getBbox.value[0] < latitud || latitud < getBbox.value[2] || getBbox.value[1] < longitud || longitud < getBbox.value[3])
            }

            return  {"bool": localizarIncidencia, "lat": latitud, "lon": longitud}
        }

        onMounted(() => {

            let mapa : L.Map;
            let coorMarker: L.Marker;

            const localizarIncidencia= canCentrarCoor(mapaCoor.value);
            if(localizarIncidencia.bool){
                mapa = L.map("Mapa",{zoomSnap:0.2, maxZoom: 18, minZoom: 10}).setView([localizarIncidencia.lat, localizarIncidencia.lon],16).setMaxBounds(limites);
                coorMarker= L.marker([localizarIncidencia.lat, localizarIncidencia.lon], {icon: localizacionCoor}).addTo(mapa);
            } else {
                mapa = L.map("Mapa",{zoomSnap:0.2, maxZoom: 18, minZoom: 10}).setView([28.655, -17.865],11).setMaxBounds(limites);
            }

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                zIndex:0,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(mapa);

            const osmGeocoder = new Geocoder({
                geocoder: new geocoders.Nominatim(),
                position: 'topright',
                placeholder: 'Enter street address',
                defaultMarkGeocode: false,
            }).addTo(mapa); 

            let resultMarker: L.Marker;

            // handle geocoding result event
            osmGeocoder.on('markgeocode', e => {
                // center map on result
                mapa.setView([e.geocode.center.lat, e.geocode.center.lng], 17);

                // popup for location
                // todo: use custom icon

                if(resultMarker){
                    mapa.removeLayer(resultMarker);
                }

                resultMarker= L.marker([e.geocode.center.lat, e.geocode.center.lng], {icon: localizacionGeocode}).addTo(mapa);

                // add popup to marker with result text
                resultMarker.bindPopup(e.geocode.name).openPopup();
            });

            // Agregar un evento de clic al mapa
            mapa.on('click', function(e) {
                setCentrarCoor(undefined);
                var latlng = e.latlng; // Obtiene las coordenadas del clic

                if(coorMarker){
                    mapa.removeLayer(coorMarker);
                }

                coorMarker= L.marker(latlng, {icon: localizacionCoor}).addTo(mapa);

                setMapaCoor(latlng.lat+","+latlng.lng)

                if(getIdioma.value == Idiomas.EN){
                    coorMarker.bindPopup("Selected coordinates").openPopup();
                } else {
                    coorMarker.bindPopup("Coordenadas seleccionadas").openPopup();
                }
                
                mapa.flyTo(latlng, 16, {
                    duration: 2,
                });
            });

            var boton = document.getElementById('home');

            // Agrega un manejador de eventos al botón
            boton!.addEventListener('click', function (e) {
                mapa.setView([28.655, -17.865],11)
                e.stopPropagation(); // Detiene la propagación del evento
            });

            watch(getIdioma, () => {
                if(coorMarker && coorMarker.getPopup()){
                    if(getIdioma.value == Idiomas.EN){
                        coorMarker.getPopup()!.setContent("Selected coordinates");
                    } else {
                        coorMarker.getPopup()!.setContent("Coordenadas seleccionadas");
                    }
                }
            });

            watch(getCentrarCoor,() => {
                const centrarNewIncidencia = canCentrarCoor(getCentrarCoor.value);
                if(centrarNewIncidencia.bool){
                    if(coorMarker){
                        mapa.removeLayer(coorMarker);
                    }
    
                    coorMarker= L.marker([centrarNewIncidencia.lat, centrarNewIncidencia.lon], {icon: localizacionCoor}).addTo(mapa);

                    mapa.flyTo([centrarNewIncidencia.lat, centrarNewIncidencia.lon], 16, {
                        duration: 2,
                    });
                }
            })
        })
    }
})