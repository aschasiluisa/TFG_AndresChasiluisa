import { GetterTree } from "vuex"
import { MapState } from './state'
import { StateInterface } from '../index'

const getters: GetterTree<MapState, StateInterface> = {

    getRegistrosCalidadAire(state){
        return state.registrosCalidadAire ? state.registrosCalidadAire : false ;
    },

    getElementInfoID(state){
        return state.elementInfoID ? state.elementInfoID : false ;
    },
}

export default getters