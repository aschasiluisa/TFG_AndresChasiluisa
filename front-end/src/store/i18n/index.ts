import { Module } from 'vuex'
import { StateInterface } from '../index'

import state, { I18nState } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'


const i18nModule: Module<I18nState, StateInterface> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}

export default i18nModule