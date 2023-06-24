import { ActionTree, mapState } from 'vuex'
import { MapState } from './state'
import { StateInterface } from '../index'

import { mapAPI, responseRegistrosControl, responseRegistrosIncidenciasControl} from '@/api/mapAPI'

const actions: ActionTree<MapState, StateInterface> = {

    async registrosCalidadAire({commit}){
        try {
            let responseControl: responseRegistrosControl | undefined = undefined;

            const responseRegistrosCalidadAire = await mapAPI.get('/registrosCalidadAire');

            if(responseRegistrosCalidadAire.data && responseRegistrosCalidadAire.data.result){
                commit("setRegistrosCalidadAire",responseRegistrosCalidadAire.data.data)
                responseControl = responseRegistrosControl.ok;
            } else {
                responseControl = responseRegistrosControl.serverError
            }

            commit("setMapResponse", responseControl);
        }
        catch {
            commit("setMapResponse", responseRegistrosControl.serverError);
        }
    },

    async registroCalidadAireInfo({commit}, id){
        try {
            let responseControl: responseRegistrosControl | undefined = undefined;

            const responseRegistroCalidadAire = await mapAPI.get(`/registrosCalidadAire/${id.id}`);
            
            if(responseRegistroCalidadAire.data && responseRegistroCalidadAire.data.result){

                commit("setRegistroInfo",{ data: responseRegistroCalidadAire.data.data, id: 1})
                responseControl = responseRegistrosControl.ok;
            } else {
                responseControl = responseRegistrosControl.serverError
            }

            commit("setMapResponse", responseControl);
        }
        catch {
            commit("setMapResponse", responseRegistrosControl.serverError);
        }
    },

    async registrosIncidencias({commit}, { token }){

        try {
            let responseControl: responseRegistrosControl | undefined = undefined;

            const responseRegistrosIncidencias = await mapAPI.get('/registrosIncidencias', {headers: {token}});

            if(responseRegistrosIncidencias.data && responseRegistrosIncidencias.data.result){
                commit("setRegistrosIncidencias",responseRegistrosIncidencias.data.data)
                responseControl = responseRegistrosControl.ok;
            } else {
                responseControl = responseRegistrosControl.serverError
            }

            commit("setMapResponse", responseControl);
        }
        catch {
            commit("setMapResponse", responseRegistrosControl.serverError);
        }
    },

    async registroIncidenciaInfo({commit}, id){
        try {
            let responseControl: responseRegistrosControl | undefined = undefined;

            const responseRegistroIncidencia = await mapAPI.get(`/registrosIncidencias/${id.id}`);
            
            if(responseRegistroIncidencia.data && responseRegistroIncidencia.data.result){

                commit("setRegistroInfo",{ data: responseRegistroIncidencia.data.data, id: 2})
                responseControl = responseRegistrosControl.ok;
            } else {
                responseControl = responseRegistrosControl.serverError
            }

            commit("setMapResponse", responseControl);
        }
        catch {
            commit("setMapResponse", responseRegistrosControl.serverError);
        }
    },

    async nuevaIncidencia({commit}, { token, nombre, tipo, coordenadas, imagen, descripcion, bbox } ){

        commit("setSendingData");

        let responseControl: responseRegistrosIncidenciasControl | undefined = undefined;
        let latitud: number = 0;
        let longitud: number = 0;
        const coorVal = /^\d+(\.\d+)?,-?\d+(\.\d+)?$/;
        const formData = new FormData();

        if(!nombre || !tipo || !coordenadas ){
            responseControl = responseRegistrosIncidenciasControl.emptyFieldError;
        } 

        if(imagen) {
            const allowedTypes=["image/jpg","image/jpeg","image/png","image/gif"];
            if(!allowedTypes.includes(imagen.type))  responseControl = responseRegistrosIncidenciasControl.imageFormatError
        }

        if(coorVal.test(coordenadas)){
            const coorSeparadas = coordenadas.split(",");
            latitud  = parseFloat(coorSeparadas[0].trim())
            longitud = parseFloat(coorSeparadas[1].trim())

            if( bbox[0] > latitud || latitud > bbox[2] || bbox[1] > longitud || longitud > bbox[3]){

                responseControl = responseRegistrosIncidenciasControl.coorBboxError;
            }
            
        } else {
            responseControl = responseRegistrosIncidenciasControl.coorFormatError;
        }

        if(!responseControl){
            try{

                formData.append('nombre', nombre)
                formData.append('tipo', tipo)
                formData.append('latitud', String(latitud))
                formData.append('longitud', String(longitud))
                if(imagen) formData.append('imagen', imagen);
                if(descripcion) formData.append('descripcion', descripcion)

                const responseNuevaIncidencia = await mapAPI.post('/registrosIncidencias', formData, {headers: {token, 'Content-Type': 'multipart/form-data'}});

                if(responseNuevaIncidencia.data && responseNuevaIncidencia.data.result){
                    responseControl = responseRegistrosIncidenciasControl.ok;
                } else {
                    responseControl = responseRegistrosIncidenciasControl.serverError;

                    if(responseNuevaIncidencia.data && responseNuevaIncidencia.data.msg === responseRegistrosIncidenciasControl.coorBboxError){
                        responseControl = responseRegistrosIncidenciasControl.coorBboxError;
                    }
                    
                    if(responseNuevaIncidencia.data && responseNuevaIncidencia.data.msg === responseRegistrosIncidenciasControl.imageFormatError){
                        responseControl = responseRegistrosIncidenciasControl.imageFormatError;
                    }
                }

                commit("setMapResponse", responseControl);

            } catch {
                commit("setMapResponse", responseRegistrosIncidenciasControl.serverError);
            }
        } else {
            commit("setMapResponse", responseControl);
        }
    },

    async updateIncidencia({commit}, {token, id, nombre, tipo, coordenadas, imagen, descripcion, bbox}){
        commit("setSendingData");

        let responseControl: responseRegistrosIncidenciasControl | undefined = undefined;
        let latitud: number = 0;
        let longitud: number = 0;
        const coorVal = /^\d+(\.\d+)?,-?\d+(\.\d+)?$/;
        const formData = new FormData();

        if(imagen){
            const allowedTypes=["image/jpg","image/jpeg","image/png","image/gif"];
            if(!allowedTypes.includes(imagen.type)) responseControl = responseRegistrosIncidenciasControl.imageFormatError
        } 

        if(coorVal.test(coordenadas)){
            const coorSeparadas = coordenadas.split(",");
            latitud  = parseFloat(coorSeparadas[0].trim())
            longitud = parseFloat(coorSeparadas[1].trim())

            if( bbox[0] > latitud || latitud > bbox[2] || bbox[1] > longitud || longitud > bbox[3]){

                responseControl = responseRegistrosIncidenciasControl.coorBboxError;
            }
        } else {
            responseControl = responseRegistrosIncidenciasControl.coorFormatError;
        }

        if(!responseControl){
            try{
                formData.append('id', id)
                formData.append('nombre', nombre)
                formData.append('tipo', tipo)
                formData.append('latitud', String(latitud))
                formData.append('longitud', String(longitud))
                if(imagen) formData.append('imagen', imagen);
                if(descripcion)formData.append('descripcion', descripcion)

                const responseUpdateIncidencia = await mapAPI.put('/registrosIncidencias', formData, {headers: {token, 'Content-Type': 'multipart/form-data'}});

                if(responseUpdateIncidencia.data && responseUpdateIncidencia.data.result){
                    responseControl = responseRegistrosIncidenciasControl.ok;
                } else {
                    responseControl = responseRegistrosIncidenciasControl.serverError;

                    if(responseUpdateIncidencia.data && responseUpdateIncidencia.data.msg === responseRegistrosIncidenciasControl.coorBboxError){
                        responseControl = responseRegistrosIncidenciasControl.coorBboxError;
                    }
                    
                    if(responseUpdateIncidencia.data && responseUpdateIncidencia.data.msg === responseRegistrosIncidenciasControl.imageFormatError){
                        responseControl = responseRegistrosIncidenciasControl.imageFormatError;
                    }
                }

                commit("setMapResponse", responseControl);

            } catch {
                commit("setMapResponse", responseRegistrosIncidenciasControl.serverError);
            }
        } else {
            commit("setMapResponse", responseControl);
        }

    },

    async deleteIncidencia({commit}, {token, id}){
        try {
            commit("setSendingData");
            
            let responseControl: responseRegistrosIncidenciasControl | undefined = undefined;

            const responseDeleteIncidenia = await mapAPI.delete('/registrosIncidencias', {headers: { token, id }})

            if(responseDeleteIncidenia.data && responseDeleteIncidenia.data.result){
                responseControl = responseRegistrosIncidenciasControl.ok;
            } else {
                responseControl = responseRegistrosIncidenciasControl.serverError

                if(responseDeleteIncidenia.data && responseDeleteIncidenia.data.msg === responseRegistrosIncidenciasControl.incidenceFindError){
                    responseControl = responseRegistrosIncidenciasControl.incidenceFindError;
                }
            }
            commit("setMapResponse", responseControl);
        } catch {
            commit("setMapResponse", responseRegistrosIncidenciasControl.serverError);
        }
    },
}

export default actions