import { GetterTree } from "vuex"
import { AuthenticationState } from './state'
import { StateInterface } from '../index'

const getters: GetterTree<AuthenticationState, StateInterface> = {
    
    userAuthenticated (state){
        return !!state.token;
    },

    getUserToken (state) {
        return state.token ? state.token: "";
    },

    getEmail(state) {
        return state.email ? state.email: "" ;
    },

    getUser(state) {
        return state.user ? state.user: "" ;
    },

    getRole(state) {
        return state.role ? state.role: undefined ;
    },
}

export default getters