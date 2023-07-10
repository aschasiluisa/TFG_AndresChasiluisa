import L from 'leaflet';
import { responseRegistrosControl, responseRegistrosIncidenciasControl, responseRegistrosAlarmasControl} from '@/api/mapAPI'

export interface MapState {
    baseMaps: { id: number, name_es: string, name_en: string }[];
    selectedID_BaseMap: { id: number, name_es: string, name_en: string };
    baseMapsConnections: { [key: number]: L.TileLayer };
    layers:{id: number, name_es: string, name_en: string }[];
    layersControl:{ [key: number]: boolean };
    typeIncidence: { [key: string]: { name_es: string, name_en: string}};
    registrosCalidadAire?: any;
    registrosIncidencias?: any;
    registrosAlarmas?: any;
    registroInfo?: any;
    mapResponse: responseRegistrosControl | responseRegistrosIncidenciasControl | responseRegistrosAlarmasControl | undefined;
    elementInfoIDlayer: number | undefined;
    bbox: number[];
    sendingData: boolean;
}

function state(): MapState {
    return {
        baseMaps:[
            { id: 1, name_es: 'OpenStreetMap', name_en: 'OpenStreetMap'},
            { id: 2, name_es: 'OpenTopoMap', name_en: 'OpenTopoMap'},
            { id: 3, name_es: 'Mapa oscuro', name_en: 'Dark Map'},
            { id: 4, name_es: 'Ortofoto', name_en: 'Orthophoto'}
        ],

        selectedID_BaseMap: { id: 1, name_es: 'OpenStreetMap', name_en: 'OpenStreetMap' },

        baseMapsConnections: {
            1 : L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
            
            2 : L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'}),
            
            3 : L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'}),
            
            4 : L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'})
        },
        
        layers: [
            { id: 1, name_es: 'Resultados de estaciones medidoras de calidad del aire', name_en: 'Results of air quality measuring stations' },
            { id: 2, name_es: 'Insidencias registradas', name_en: 'Logged Incidences' },
            { id: 3, name_es: 'Alarmas registradas', name_en: 'Logged alarms' },
        ],

        layersControl:{
            1 : false,
            2 : false,
            3 : false,
        },

        typeIncidence:{
            'ACC': { name_es: 'Accidente de Trafico', name_en: 'Traffic Accident'},
            'DER': { name_es: 'Derrumbe', name_en: 'Landslide'},
            'INC': { name_es: 'Incendio', name_en: 'Fire'},
            'INU': { name_es: 'Inundación', name_en: 'Flood'},
            'CAL': { name_es: 'Calima', name_en: 'Calima'},
            'ERU': { name_es: 'Erupción', name_en: 'Rash'},
            'ESC': { name_es: 'Escape de gases', name_en: 'Gas exhaust'},
            'OTR': { name_es: 'Otro', name_en: 'Other'},
        },

        elementInfoIDlayer: undefined,
        registrosCalidadAire: undefined,
        registrosIncidencias: undefined,
        registrosAlarmas: undefined,
        registroInfo: undefined,
        mapResponse: undefined,
        bbox: [28.384151, -18.102722, 28.926439, -17.620697],
        sendingData: false,
    }
}

export default state