import { MutationTree } from "vuex"
import { I18nState } from './state'

const mutations: MutationTree<I18nState> = {

    setIdioma(state, idioma){
        state.idioma = idioma
    }

}

export default mutations