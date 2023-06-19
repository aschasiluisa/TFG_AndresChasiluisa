import axios from "axios"

export enum responseRegistrosCalidadAireControl{
    serverError = "Server Error",
    ok = "Ok response"
}

export const mapAPI = axios.create({
    baseURL: process.env.VUE_APP_SERVIDOR_URL,
})