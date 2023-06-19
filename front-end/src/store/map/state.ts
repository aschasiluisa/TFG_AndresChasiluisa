import leaflet from "leaflet";
import { responseRegistrosCalidadAireControl} from '@/api/mapAPI'

export interface MapState {
    baseMaps: { id: number, name: string }[];
    selectedBaseMap: { id: number, name: string};
    baseMapsConnections: { [key: number]: L.TileLayer };
    layers:{id: number, name: string }[];
    layersControl:{ [key: number]: boolean };
    registrosCalidadAire?: any;
    mapResponse: responseRegistrosCalidadAireControl | undefined;
    elementInfoID: {layerID: number,elementID: number} | undefined;
}

function state(): MapState {
    return {
        baseMaps:[
            { id: 1, name: 'OpenStreetMap', },
            { id: 2, name: 'OpenTopoMap', },
            { id: 3, name: 'Mapa oscuro', },
            { id: 4, name: 'Ortofoto',}
        ],

        selectedBaseMap: { id: 1, name: 'OpenStreetMap' },

        baseMapsConnections: {
            1 : leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
            
            2 : leaflet.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                maxZoom: 17,
                attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'}),
            
            3 : leaflet.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
                maxZoom: 20,
                attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'}),
            
            4 : leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'})
        },
        
        layers: [
            { id: 1, name: 'Resultados de estaciones medidoras de calidad del aire' },
            { id: 2, name: 'Insidencias registradas' },
            { id: 3, name: 'Alarmas registradas' },
        ],

        layersControl:{
            1 : false,
            2 : false,
            3 : false,
        },

        elementInfoID: undefined,
        registrosCalidadAire: undefined,
        mapResponse: undefined,
    }
}

export default state