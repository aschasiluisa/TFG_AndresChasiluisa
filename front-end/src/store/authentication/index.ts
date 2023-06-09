import { Module } from 'vuex'
import { StateInterface } from '../index'

import state, { AuthenticationState } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'


const authenticationModule: Module<AuthenticationState, StateInterface> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}

export default authenticationModule