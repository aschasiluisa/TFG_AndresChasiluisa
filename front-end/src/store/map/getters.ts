import { GetterTree } from "vuex"
import { MapState } from './state'
import { StateInterface } from '../index'

const getters: GetterTree<MapState, StateInterface> = {

    getRegistrosCalidadAire(state){
        return state.registrosCalidadAire ? state.registrosCalidadAire : false ;
    },

    getRegistrosIncidencias(state){
        return state.registrosIncidencias ? state.registrosIncidencias : false ;
    },

    getRegistrosAlarmas(state){
        return state.registrosAlarmas ? state.registrosAlarmas : false ;
    },

    getRegistrosTerremotos(state){
        return state.registrosTerremotos ? state.registrosTerremotos : false ;
    },

    getRegistroInfo(state){
        return state.registroInfo ? state.registroInfo : false ;
    },

    getElementInfoID(state){
        return state.elementInfoIDlayer ? state.elementInfoIDlayer : false ;
    },

    getLast_registroInfoIDlayer(state){
        return state.last_registroInfoIDlayer;
    },

    getBbox(state){
        return state.bbox;
    },

    getTypeIncidence(state){
        return state.typeIncidence;
    },

    getCentrarCoor(state){
        return state.centrarCoor;
    },
}

export default getters