import axios from "axios"

export enum responseLoginControl {
    serverError = "Server Error",
    loginError = "Incorrect user or password",
    ok = "Ok response"
}

export enum responseSignupControl {
    serverError = "Server Error",
    usernameError = "Username already exists",
    emailError = "User email already exists",
    ok = "Ok response"
}

export const authenticationAPI = axios.create({
    baseURL: process.env.VUE_APP_SERVIDOR_URL,
})