import axios from "axios"

export enum responseRegistrosControl{
    serverError = "Server Error",
    ok = "Ok response"
}

export enum responseRegistrosIncidenciasControl{
    serverError = "Server Error",
    emptyFieldError = "Mandatory Field empty",
    coorBboxError = "Coordinates outside the bbox",
    imageFormatError = "Wrong image file format",
    coorFormatError = "Wrong coordinates text format",
    incidenceFindError = "Failed to find incidence",
    ok = "Ok response"
}

export const mapAPI = axios.create({
    baseURL: process.env.VUE_APP_SERVIDOR_URL,
})