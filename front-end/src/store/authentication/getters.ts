import { GetterTree } from "vuex"
import { AuthenticationState } from './state'
import { StateInterface } from '../index'
import { roles } from '@/api/authenticationAPI'

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
        if ( Object.values(roles).includes(state.role!)){
            return state.role
        } else {
            return undefined
        }
    },
}

export default getters