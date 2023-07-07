import { GetterTree } from "vuex"
import { I18nState } from './state'
import { StateInterface } from '../index'

const getters: GetterTree<I18nState, StateInterface> = {

    getIdioma(state){
        return state.idioma;
    }

}

export default getters