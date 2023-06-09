import { ActionTree } from 'vuex'
import { AuthenticationState } from './state'
import { StateInterface } from '../index'

import { authenticationAPI, responseLoginControl, responseSignupControl } from '@/api/authenticationAPI'

const actions: ActionTree<AuthenticationState, StateInterface> = {

    async login({commit}, { usuario, contraseña }) {
        try{

            commit("setAuthenticating");

            const responseLogin = await authenticationAPI.post('/login', { usuario, contraseña});

            let responseControl: responseLoginControl | undefined = undefined;

            if(responseLogin.data && responseLogin.data.result){

                commit("setUserInfo", {
                    user:  responseLogin.data.user.User,
                    email: responseLogin.data.user.Email,
                    role: responseLogin.data.user.Role, 
                    token: responseLogin.data.user.Token
                } );

                responseControl = responseLoginControl.ok

            } else {

                responseControl = responseLoginControl.serverError;

                if(responseLogin.data && responseLogin.data.msg === responseLoginControl.loginError){
                    responseControl = responseLoginControl.loginError;
                } 
            }

            commit("setAuthResponse", responseControl);

        }
        catch{
            commit("setAuthResponse", responseLoginControl.serverError);
        }
    },

    async signup({commit},  { usuario, mail, contraseña, municipio, nombre, apellido }) {
        try{
            commit("setAuthenticating");

            const responseSignup = await authenticationAPI.post('/signup', { usuario, mail, contraseña, municipio, nombre, apellido});

            let responseControl: responseSignupControl | undefined = undefined;

            
            if(responseSignup.data && responseSignup.data.result){

                commit("setUserInfo", {
                    user:  responseSignup.data.user.User,
                    email: responseSignup.data.user.Email,
                    role: responseSignup.data.user.Role, 
                    token: responseSignup.data.user.Token
                } );

            } else {

                responseControl = responseSignupControl.serverError;

                if(responseSignup.data && responseSignup.data.msg === responseSignupControl.usernameError){
                    responseControl = responseSignupControl.usernameError;
                }
                
                if(responseSignup.data && responseSignup.data.msg === responseSignupControl.emailError){
                    responseControl = responseSignupControl.emailError;
                }
            }

            commit("setAuthResponse", responseControl);
        }
        catch{
            commit("setAuthResponse", responseLoginControl.serverError);
        }
    },

    async logout({commit}, token){
        try {
            const responseLogout = await authenticationAPI.delete('/logout', { headers: token });

            if(responseLogout.data && responseLogout.data.result){
                commit("resetUserInfo")
            }
        }
        catch {

        }
    },

    async userInfo({commit}, token){
        try {
            const responseUserInfo = await authenticationAPI.get('/profile', { headers: token });

            if(responseUserInfo.data && responseUserInfo.data.result){
                commit("setProfileUserInfo",responseUserInfo.data.user)
            }
        }
        catch {

        }
    },

    async updateUserInfo({commit}, {token, nombre, apellido, municipio, mail}){
        try{
            commit("setAuthenticating");

            const responseUpadteUserInfo = await authenticationAPI.put('/profile', {nombre, apellido, municipio, mail}, {headers:{ token }})

            if(responseUpadteUserInfo.data && responseUpadteUserInfo.data.result){
                
                commit("setEmail", responseUpadteUserInfo.data.user.Email)

                commit("setProfileUserInfo",{
                    Nombre : responseUpadteUserInfo.data.user.Nombre,
                    Apellido : responseUpadteUserInfo.data.user.Apellido,
                    Municipio : responseUpadteUserInfo.data.user.Municipio
                })
            }

            commit("setAuthResponse", "ok");
        } 
        catch {

        }
    }
}

export default actions