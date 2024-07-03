/////////////////////////////////////////////////////////
//Archivo de interfaz de conexión con la API del proyecto
/////////////////////////////////////////////////////////

import axios from "axios"

export enum responseLoginControl {
    serverError = "Server Error",
    loginError = "Incorrect user or password",
    emptyFieldError = "Mandatory Field empty",
    ok = "Ok response"
}

export enum responseSignupControl {
    serverError = "Server Error",
    usernameError = "Username already exists",
    emailError = "User email already exists",
    emptyFieldError = "Mandatory Field empty",
    emailFormatError = "Wrong user email format",
    ok = "Ok response"
}

export enum responseProfileControl {
    serverError = "Server Error",
    emailError = "User email already exists",
    emailFormatError = "Wrong user email format",
    ok = "Ok response"
}

export enum responseLogOutControl {
    serverError = "Server Error",
    ok = "Ok response"
}

export enum responseSuperAdminControlControl {
    serverError = "Server Error",
    userFindError = "Failed to find user",
    ok = "Ok response"
}

export enum responseContactoControl {
    serverError = "Server Error",
    emptyFieldError = "Mandatory Field empty",
    emailFormatError = "Wrong user email format",
    ok = "Ok response"
}

export enum roles {
    user = 0,
    admin = 1,
    super = 5
}

export const authenticationAPI = axios.create({
    baseURL: process.env.VUE_APP_SERVIDOR_URL,
})