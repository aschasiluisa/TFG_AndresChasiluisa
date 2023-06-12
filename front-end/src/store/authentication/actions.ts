import { ActionTree } from 'vuex'
import { AuthenticationState } from './state'
import { StateInterface } from '../index'

import { authenticationAPI, responseLoginControl, responseSignupControl, responseProfileControl } from '@/api/authenticationAPI'
import { useAuthStore } from "@/composables/useAuthStore";

const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const actions: ActionTree<AuthenticationState, StateInterface> = {

    async login({commit}, { usuario, contraseña }) {

        
        commit("setAuthenticating");

        let responseControl: responseLoginControl | undefined = undefined;

        if(!usuario || !contraseña){
            responseControl = responseLoginControl.emptyFieldError
        }

        if(!responseControl){
            try{

                const responseLogin = await authenticationAPI.post('/login', { usuario, contraseña});
    
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
        } else {
            commit("setAuthResponse", responseControl);
        }
    },

    async signup({commit},  { usuario, mail, contraseña, municipio, nombre, apellido }) {
        
        let responseControl: responseSignupControl | undefined = undefined;

        if(!usuario || !mail || !contraseña || !nombre || !apellido ){

            responseControl = responseSignupControl.emptyFieldError;

        } else {
            const emailValidation = emailVal.test(mail);

            if(!emailValidation) {

                responseControl = responseSignupControl.emailFormatError;

            }
        }

        if(!responseControl){
            try{
                commit("setAuthenticating");
                
                const responseSignup = await authenticationAPI.post('/signup', { usuario, mail, contraseña, municipio, nombre, apellido});
                
                if(responseSignup.data && responseSignup.data.result){
    
                    commit("setUserInfo", {
                        user:  responseSignup.data.user.User,
                        email: responseSignup.data.user.Email,
                        role: responseSignup.data.user.Role, 
                        token: responseSignup.data.user.Token
                    } );

                    responseControl = responseSignupControl.ok
    
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
        } else {
            commit("setAuthResponse", responseControl);
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
        
        commit("setAuthenticating");

        let responseControl: responseProfileControl | undefined = undefined;
        let body;

        if(mail){
            const emailValidation = emailVal.test(mail);

            if(!emailValidation) responseControl = responseProfileControl.emailFormatError;
            else{ body = {nombre, apellido, municipio, mail}; }
        } else {
            body = body = {nombre, apellido, municipio};
        }
        
        if(!responseControl){
            try{
                const responseUpadteUserInfo = await authenticationAPI.put('/profile', body , {headers:{ token }})
    
                if(responseUpadteUserInfo.data && responseUpadteUserInfo.data.result){
                    
                    commit("setEmail", responseUpadteUserInfo.data.user.Email)
    
                    commit("setProfileUserInfo",{
                        Nombre : responseUpadteUserInfo.data.user.Nombre,
                        Apellido : responseUpadteUserInfo.data.user.Apellido,
                        Municipio : responseUpadteUserInfo.data.user.Municipio
                    })

                    responseControl = responseProfileControl.ok

                } else {
    
                    responseControl = responseProfileControl.serverError;
    
                    if(responseUpadteUserInfo.data && responseUpadteUserInfo.data.msg === responseProfileControl.emailError){
                        responseControl = responseProfileControl.emailError;
                    }
                }
    
                commit("setAuthResponse", responseControl);
            } 
            catch {
                commit("setAuthResponse", responseLoginControl.serverError);
            }
        } else {
            commit("setAuthResponse", responseControl);
        }
    }
}

export default actions