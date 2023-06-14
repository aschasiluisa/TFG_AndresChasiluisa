import { computed } from 'vue'
import { useStore } from 'vuex'
import { StateInterface } from '@/store'
import getters from '@/store/authentication/getters';

export const useAuthStore = () => {

    const store = useStore<StateInterface>();

    return {
        // STATE //
        authenticathing: computed(() => store.state.auth.authenticathing),

        authResponse: computed(() => store.state.auth.authResponse),

        profileUserInfo: computed(() => store.state.auth.userInfo),

        userClientInfo: computed(() => store.state.auth.userClientInfo),

        // GETTERS //
        userAuthenticated: computed<boolean>(() => store.getters['auth/userAuthenticated'] ),

        getUserToken: computed<string>(() => store.getters['auth/getUserToken'] ),

        getUser: computed<string>(() => store.getters['auth/getUser']),

        getEmail: computed<string>(() => store.getters['auth/getEmail']),

        getRole: computed<number>(() => store.getters['auth/getRole']),

        // ACTIONS //
        login: (usuario: string, contraseña: string) => 
                store.dispatch('auth/login', { usuario, contraseña }),

        signup: (usuario: string, mail: string, contraseña: string, municipio: string, nombre:string, apellido: string,) =>
                store.dispatch('auth/signup', {usuario, mail, contraseña, municipio, nombre, apellido }),

        logout: (token: string) => store.dispatch('auth/logout', {token}),

        userInfo: (token: string) => store.dispatch('auth/userInfo', {token}),

        updateUserInfo: (token: string, nombre: string, apellido: string, municipio: string, mail: string) => 
                        store.dispatch('auth/updateUserInfo', {token, nombre, apellido, municipio, mail}),

        superAdminControl: (token: string, usuarioCliente: string) => store.dispatch('auth/superAdminControl',{token, usuarioCliente}),

        changeRole: (token: string, usuarioCliente: string, role: number) => store.dispatch('auth/changeRole',{token, usuarioCliente, role}),

        deleteUser: (token: string, usuarioCliente: string) => store.dispatch('auth/deleteUser',{token, usuarioCliente}),

        // MUTATIONS //
        clearAuthResponse: () => store.commit('auth/clearAuthResponse'),

    }

}