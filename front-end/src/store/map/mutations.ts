import { MutationTree } from "vuex"
import { MapState } from './state'

const mutations: MutationTree<MapState> = {

    setBaseMap(state, map) {
        state.selectedBaseMap = map;
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

    resetLayersControl(state){
        for (var key in state.layersControl) state.layersControl[key] = false;
        state.elementInfoIDlayer = undefined;
        state.registrosIncidencias = undefined;
        state.selectedBaseMap= { id: 1, name: 'OpenStreetMap' };     
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
}

export default mutations