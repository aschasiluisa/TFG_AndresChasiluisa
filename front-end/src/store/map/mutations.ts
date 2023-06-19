import { MutationTree } from "vuex"
import { MapState } from './state'

const mutations: MutationTree<MapState> = {

    setBaseMap(state, map) {
        state.selectedBaseMap = map;
    },

    setMapResponse(state, mapResponse){
        state.mapResponse = mapResponse
    },

    setRegistrosCalidadAire(state, registrosCalidadAire){
        state.registrosCalidadAire = registrosCalidadAire;
    },

    resetLayersControl(state){
        for (var key in state.layersControl) state.layersControl[key] = false;
        state.elementInfoID = undefined;        
    },

    setElementInfoID(state, elementInfoID){
        state.elementInfoID = elementInfoID;
    },

    resetElementInfoID(state){
        state.elementInfoID = undefined;
    },

}

export default mutations