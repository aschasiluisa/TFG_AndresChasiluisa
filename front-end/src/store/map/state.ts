import L from 'leaflet';
import { responseRegistrosControl, responseRegistrosIncidenciasControl, responseRegistrosAlarmasControl, periodos} from '@/api/mapAPI'

export interface MapState {
    baseMaps: { id: number, name_es: string, name_en: string }[];
    selectedID_BaseMap: { id: number, name_es: string, name_en: string };
    baseMapsConnections: { [key: number]: L.TileLayer };
    layers:{id: number, name_es: string, name_en: string }[];
    layersControl:{ [key: number]: boolean };
    sublayers_4:{id: number, name_es: string, name_en: string }[];
    sublayersControl_4:{ [key: number]: boolean };
    sublayers_5:{id: number, name_es: string, name_en: string }[];
    sublayersControl_5:{ [key: number]: boolean };
    typeIncidence: { [key: string]: { name_es: string, name_en: string}};
    registrosCalidadAire?: any;
    registrosIncidencias?: any;
    registrosAlarmas?: any;
    registrosTerremotos?: any;
    periodo: periodos;
    mapaCalor_activada: boolean;
    registroInfo?: any;
    mapaCoor?: string;
    centrarCoor?: string;
    mapResponse: responseRegistrosControl | responseRegistrosIncidenciasControl | responseRegistrosAlarmasControl | undefined;
    elementInfoIDlayer: number | undefined;
    last_registroInfoIDlayer: number | undefined;
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
                zIndex:0,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
            
            2 : L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                zIndex:0,
                attribution: '<a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'}),
            
            3 : L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
                maxZoom: 18,
                zIndex:0,
                attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy'}),
            
            4 : L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                maxZoom: 18,
                zIndex:0,
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, USDA, USGS, IGN'})
        },

        layers: [
            { id: 1, name_es: 'Calidad del aire', name_en: 'Air quality' },
            { id: 2, name_es: 'Incidencias', name_en: 'Incidences' },
            { id: 3, name_es: 'Alarmas', name_en: 'Alarms' },
            { id: 4, name_es: 'Infraestructura', name_en:'Infrastructure'},
            { id: 5, name_es: 'Actividad volcánica', name_en:'Volcanic activity'},
        ],

        layersControl:{
            1 : false,
            2 : false,
            3 : false,
            4 : false,
            5 : false,
        },

        sublayers_4: [
            { id: 1, name_es: 'Carreteras principales', name_en: 'Main roads' },
            { id: 2, name_es: 'Edificios', name_en: 'Buildings' },
            { id: 3, name_es: 'Parcelas', name_en: 'Parcels' },
        ],

        sublayersControl_4:{
            1 : false,
            2 : false,
            3 : false,
        },     

        sublayers_5:[
            { id: 1, name_es: 'Bocas eruptivas', name_en: 'Eruptive mouths' },
            { id: 2, name_es: 'Coladas volcánicas', name_en: 'Volcanic flows' },
            { id: 3, name_es: 'Terremotos', name_en: 'Earthquakes' },
        ],

        sublayersControl_5:{
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
            'OLA': { name_es: 'Alto oleaje', name_en: 'High swell'},
            'OBR': { name_es: 'Obras', name_en: 'Works'},
            'OTR': { name_es: 'Otro', name_en: 'Other'},
        },

        elementInfoIDlayer: undefined,
        last_registroInfoIDlayer: undefined,
        registrosCalidadAire: undefined,
        registrosIncidencias: undefined,
        registrosAlarmas: undefined,
        registrosTerremotos: undefined,
        periodo: periodos._3,
        mapaCalor_activada: false,
        registroInfo: undefined,
        mapaCoor: undefined,
        centrarCoor: undefined,
        mapResponse: undefined,
        bbox: [28.384151, -18.102722, 28.926439, -17.620697],
        sendingData: false,
    }
}

export default state