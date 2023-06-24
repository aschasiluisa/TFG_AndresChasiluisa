import { ActionTree } from 'vuex'
import { AuthenticationState } from './state'
import { StateInterface } from '../index'

import { authenticationAPI, responseLoginControl, responseSignupControl, responseLogOutControl, responseProfileControl, responseSuperAdminControlControl } from '@/api/authenticationAPI'

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

        commit("setAuthenticating");
        
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
                commit("setAuthResponse", responseSignupControl.serverError);
            }
        } else {
            commit("setAuthResponse", responseControl);
        }
    },

    async logout({commit}, token){
        try {
            let responseControl: responseLogOutControl | undefined = undefined;

            const responseLogout = await authenticationAPI.delete('/logout', { headers: token });

            if(responseLogout.data && responseLogout.data.result){
                commit("resetUserInfo")
                responseControl = responseLogOutControl.ok;
            } else {
                responseControl = responseLogOutControl.serverError;
            }
            commit("setAuthResponse", responseControl);
        }
        catch {
            commit("setAuthResponse", responseLogOutControl.serverError)
        }
    },

    async userInfo({commit}, token){
        try {
            let responseControl: responseProfileControl | undefined = undefined;

            const responseUserInfo = await authenticationAPI.get('/profile', { headers: token });

            if(responseUserInfo.data && responseUserInfo.data.result){
                commit("setProfileUserInfo",responseUserInfo.data.user)
                responseControl = responseProfileControl.ok;
            } else {
                responseControl = responseProfileControl.serverError
            }

            commit("setAuthResponse", responseControl);
        }
        catch {
            commit("setAuthResponse", responseProfileControl.serverError);
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
            body = {nombre, apellido, municipio};
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
                commit("setAuthResponse", responseProfileControl.serverError);
            }
        } else {
            commit("setAuthResponse", responseControl);
        }
    },

    async superAdminControl({commit}, {token, usuarioCliente}){
        try {
            let responseControl: responseSuperAdminControlControl | undefined = undefined;

            const responseSuperAdminControl = await authenticationAPI.get('/superAdminControl', {headers: { token, usuarioCliente }})

            if(responseSuperAdminControl.data && responseSuperAdminControl.data.result){
                commit("setSuperAdminControlUserInfo",responseSuperAdminControl.data.user)
                responseControl = responseSuperAdminControlControl.ok;
            } else {
                responseControl = responseSuperAdminControlControl.serverError

                if(responseSuperAdminControl.data && responseSuperAdminControl.data.msg === responseSuperAdminControlControl.userFindError){
                    responseControl = responseSuperAdminControlControl.userFindError;
                }
            }
            commit("setAuthResponse", responseControl);
        } catch {
            commit("setAuthResponse", responseSuperAdminControlControl.serverError);
        }
    },

    async changeRole({commit}, {token, usuarioCliente, role }){
        try{
            let responseControl: responseSuperAdminControlControl | undefined = undefined;

            const responseChangeRole = await authenticationAPI.put('/superAdminControl', {usuarioCliente, role} , {headers:{ token }})

            if(responseChangeRole.data && responseChangeRole.data.result){
                commit("setSuperAdminControlUserInfo",responseChangeRole.data.user)
                responseControl = responseSuperAdminControlControl.ok;
            } else {
                responseControl = responseSuperAdminControlControl.serverError

                if(responseChangeRole.data && responseChangeRole.data.msg === responseSuperAdminControlControl.userFindError){
                    responseControl = responseSuperAdminControlControl.userFindError;
                }
            }
            commit("setAuthResponse", responseControl);

        } catch {
            commit("setAuthResponse", responseSuperAdminControlControl.serverError);
        }
    },

    async deleteUser({commit}, {token,usuarioCliente}){
        try {
            let responseControl: responseSuperAdminControlControl | undefined = undefined;

            const responseDeleteUser = await authenticationAPI.delete('/superAdminControl', {headers: { token, usuarioCliente }})

            if(responseDeleteUser.data && responseDeleteUser.data.result){
                responseControl = responseSuperAdminControlControl.ok;
            } else {
                responseControl = responseSuperAdminControlControl.serverError

                if(responseDeleteUser.data && responseDeleteUser.data.msg === responseSuperAdminControlControl.userFindError){
                    responseControl = responseSuperAdminControlControl.userFindError;
                }
            }
            commit("setAuthResponse", responseControl);
        } catch {
            commit("setAuthResponse", responseSuperAdminControlControl.serverError);
        }
    },
}

export default actions