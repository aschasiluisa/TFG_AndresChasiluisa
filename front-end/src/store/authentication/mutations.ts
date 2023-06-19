import { MutationTree } from "vuex"
import { AuthenticationState } from './state'
import { roles } from '@/api/authenticationAPI'

const mutations: MutationTree<AuthenticationState> = {
    setUserInfo(state, { user, email, role, token} ){
        state.user = user;
        state.email = email;
        state.token = token;

        if ( Object.values(roles).includes(role)){
            state.role = role;
        } else {
            state.role = undefined;
        }
    },

    setAuthenticating(state){
        state.authenticathing = true;
        state.authResponse = undefined
    },

    setAuthResponse(state, authResponse){
        state.authenticathing = false;
        state.authResponse = authResponse
    },

    resetUserInfo(state){
        state.user = undefined;
        state.email = undefined;
        state.role = undefined;
        state.token = undefined;
        state.userInfo = undefined;
    },

    setProfileUserInfo(state, userInfo){
        state.userInfo = userInfo;
    },

    setSuperAdminControlUserInfo(state, userInfo){
        state.userClientInfo = userInfo;
    },

    setEmail(state,email){
        state.email = email;
    },

    clearAuthResponse(state){
        state.authResponse = undefined;
    }
}

export default mutations