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

export const authenticationAPI = axios.create({
    baseURL: process.env.VUE_APP_SERVIDOR_URL,
})