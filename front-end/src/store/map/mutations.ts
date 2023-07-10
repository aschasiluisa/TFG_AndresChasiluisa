import { MutationTree } from "vuex"
import { MapState } from './state'

const mutations: MutationTree<MapState> = {

    setBaseMap(state, map) {
        state.selectedID_BaseMap = map;
    },

    setMapResponse(state, mapResponse){
        state.sendingData = false;
        state.mapResponse = mapResponse
    },

    setRegistrosCalidadAire(state, registrosCalidadAire){
        state.registrosCalidadAire = registrosCalidadAire;
    },

    setRegistrosIncidencias(state, registrosIncidencias){
        state.registrosIncidencias = registrosIncidencias;
    },
    
    setRegistrosAlarmas(state, registrosAlarmas){
        state.registrosAlarmas = registrosAlarmas;
    },

    resetLayersControl(state){
        for (var key in state.layersControl) state.layersControl[key] = false;
        state.elementInfoIDlayer = undefined;
        state.registrosIncidencias = undefined;
        state.registrosAlarmas = undefined;
        state.selectedID_BaseMap= { id: 1, name_es: 'OpenStreetMap', name_en: 'OpenStreetMap' };     
    },

    resetElementInfoID(state){
        state.elementInfoIDlayer = undefined;
    },

    setSendingData(state){
        state.sendingData = true;
        state.mapResponse = undefined;
    },

    setRegistroInfo(state, registroInfo,){
        state.registroInfo = registroInfo.data;
        state.elementInfoIDlayer = registroInfo.id;
    },

    clearMapResponse(state){
        state.mapResponse = undefined;
    },

    resetregistrosAlarmas(state){
        state.layersControl[3] = false
        state.registrosAlarmas = undefined;
        state.registroInfo = undefined;
        state.elementInfoIDlayer = undefined;
    }
}

export default mutations