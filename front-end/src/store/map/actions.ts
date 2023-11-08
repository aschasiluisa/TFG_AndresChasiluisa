import { ActionTree, mapState } from 'vuex'
import { MapState } from './state'
import { StateInterface } from '../index'

import { mapAPI, responseRegistrosControl, responseRegistrosIncidenciasControl, responseRegistrosAlarmasControl} from '@/api/mapAPI'

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

    async registrosIncidencias({commit}, {token}){

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

    async registrosTerremotos({commit}, {periodo}) {
        try {
            let responseControl: responseRegistrosControl | undefined = undefined;

            const responseRegistrosTerremotos = await mapAPI.get('/registrosTerremotos', {headers: {periodo}});
            
            if(responseRegistrosTerremotos.data && responseRegistrosTerremotos.data.result){
                commit("setRegistrosTerremotos",responseRegistrosTerremotos.data.data)
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

        if(!responseControl && imagen) {
            const allowedTypes=["image/jpg","image/jpeg","image/png","image/gif"];
            if(!allowedTypes.includes(imagen.type))  responseControl = responseRegistrosIncidenciasControl.imageFormatError
        }

        if(!responseControl && coorVal.test(coordenadas)){
            const coorSeparadas = coordenadas.split(",");
            latitud  = parseFloat(coorSeparadas[0].trim())
            longitud = parseFloat(coorSeparadas[1].trim())

            if( bbox[0] > latitud || latitud > bbox[2] || bbox[1] > longitud || longitud > bbox[3]){

                responseControl = responseRegistrosIncidenciasControl.coorBboxError;
            }
            
        } else if(!responseControl){
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

    async nuevaIncidenciaAdmin({commit}, { token, nombre_es, nombre_en, tipo, coordenadas, imagen, descripcion_es, descripcion_en, bbox } ){

        commit("setSendingData");

        let responseControl: responseRegistrosIncidenciasControl | undefined = undefined;
        let latitud: number = 0;
        let longitud: number = 0;
        const coorVal = /^\d+(\.\d+)?,-?\d+(\.\d+)?$/;
        const formData = new FormData();

        if(!nombre_es || !nombre_en || !tipo || !coordenadas || !descripcion_es || !descripcion_en){
            responseControl = responseRegistrosIncidenciasControl.emptyFieldError;
        } 

        if(!responseControl && imagen) {
            const allowedTypes=["image/jpg","image/jpeg","image/png","image/gif"];
            if(!allowedTypes.includes(imagen.type))  responseControl = responseRegistrosIncidenciasControl.imageFormatError
        }

        if(!responseControl && coorVal.test(coordenadas)){
            const coorSeparadas = coordenadas.split(",");
            latitud  = parseFloat(coorSeparadas[0].trim())
            longitud = parseFloat(coorSeparadas[1].trim())

            if( bbox[0] > latitud || latitud > bbox[2] || bbox[1] > longitud || longitud > bbox[3]){

                responseControl = responseRegistrosIncidenciasControl.coorBboxError;
            }
            
        } else if(!responseControl) {
            responseControl = responseRegistrosIncidenciasControl.coorFormatError;
        }

        if(!responseControl){
            try{

                formData.append('nombre_es', nombre_es)
                formData.append('nombre_en', nombre_en)
                formData.append('tipo', tipo)
                formData.append('latitud', String(latitud))
                formData.append('longitud', String(longitud))
                if(imagen) formData.append('imagen', imagen);
                if(descripcion_es) {
                    formData.append('descripcion_es', descripcion_es);
                    formData.append('descripcion_en', descripcion_en);
                } 

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

    async updateIncidencia({commit}, {token, id, nombre_es, nombre_en, tipo, coordenadas, imagen, descripcion_es, descripcion_en, validada, bbox}){
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
                formData.append('id', id);
                formData.append('nombre_es', nombre_es);
                formData.append('nombre_en', nombre_en);
                formData.append('tipo', tipo);
                formData.append('latitud', String(latitud));
                formData.append('validada', String(validada));
                formData.append('longitud', String(longitud));
                if(imagen) formData.append('imagen', imagen);
                if(descripcion_es){
                    formData.append('descripcion_es', descripcion_es);
                    formData.append('descripcion_en', descripcion_en);
                }

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

    async deleteIncidencia({commit}, {token, id, validada, nombre}){
        try {
            commit("setSendingData");
            let responseControl: responseRegistrosIncidenciasControl | undefined = undefined;

            const responseDeleteIncidenia = await mapAPI.delete(`/registrosIncidencias/${id}`, {headers: { token, validada: String(validada), nombre }})

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

    async registrosAlarmas({commit}, {token}){
        try {
            let responseControl: responseRegistrosAlarmasControl | undefined = undefined;

            const responseRegistrosAlarmas = await mapAPI.get('/registrosAlarmas', {headers: {token}});

            if(responseRegistrosAlarmas.data && responseRegistrosAlarmas.data.result){
                commit("setRegistrosAlarmas",responseRegistrosAlarmas.data.data)
                responseControl = responseRegistrosAlarmasControl.ok;
            } else {
                responseControl = responseRegistrosAlarmasControl.serverError
            }

            commit("setMapResponse", responseControl);
        }
        catch {
            commit("setMapResponse", responseRegistrosControl.serverError);
        }
    },

    async registroAlarmaInfo({commit},{token, id}){
        try {
            let responseControl: responseRegistrosAlarmasControl | undefined = undefined;

            const responseRegistroAlarma = await mapAPI.get(`/registrosAlarmas/${id}`, {headers: {token}});
            
            if(responseRegistroAlarma.data && responseRegistroAlarma.data.result){
                commit("setRegistroInfo",{ data: responseRegistroAlarma.data.data, id: 3})
                responseControl = responseRegistrosAlarmasControl.ok;
            } else {
                responseControl = responseRegistrosAlarmasControl.serverError
            }

            commit("setMapResponse", responseControl);
        }
        catch {
            commit("setMapResponse", responseRegistrosAlarmasControl.serverError);
        }
    },

    async nuevaAlarma({commit}, {token, nombre, rango, coordenadas, bbox}){
        commit("setSendingData");

        let responseControl: responseRegistrosAlarmasControl | undefined = undefined;
        let latitud: number = 0;
        let longitud: number = 0;
        const coorVal = /^\d+(\.\d+)?,-?\d+(\.\d+)?$/;
        const formData = new FormData();

        if(!nombre || !rango || !coordenadas ){
            responseControl = responseRegistrosAlarmasControl.emptyFieldError;
        } 

        if(!responseControl && (99 > rango || 3001 < rango)) {
            responseControl = responseRegistrosAlarmasControl.rangoError;
        }

        if(!responseControl && coorVal.test(coordenadas)){
            const coorSeparadas = coordenadas.split(",");
            latitud  = parseFloat(coorSeparadas[0].trim())
            longitud = parseFloat(coorSeparadas[1].trim())

            if( bbox[0] > latitud || latitud > bbox[2] || bbox[1] > longitud || longitud > bbox[3]){

                responseControl = responseRegistrosAlarmasControl.coorBboxError;
            }
            
        } else if(!responseControl){
            responseControl = responseRegistrosAlarmasControl.coorFormatError;
        }

        if(!responseControl){
            try{
                formData.append('nombre', nombre)
                formData.append('rango', rango)
                formData.append('latitud', String(latitud))
                formData.append('longitud', String(longitud))

                const responseNuevaAlarma = await mapAPI.post('/registrosAlarmas', formData, {headers: {token, 'Content-Type': 'multipart/form-data'}});

                if(responseNuevaAlarma.data && responseNuevaAlarma.data.result){
                    responseControl = responseRegistrosAlarmasControl.ok;
                } else {
                    responseControl = responseRegistrosAlarmasControl.serverError;

                    if(responseNuevaAlarma.data && responseNuevaAlarma.data.msg === responseRegistrosAlarmasControl.coorBboxError){
                        responseControl = responseRegistrosAlarmasControl.coorBboxError;
                    }
                }

                commit("setMapResponse", responseControl);

            } catch {
                commit("setMapResponse", responseRegistrosAlarmasControl.serverError);
            }
        } else {
            commit("setMapResponse", responseControl);
        }
    },

    async resetAlarma({commit}, {token, id}){
        let responseControl: responseRegistrosAlarmasControl | undefined = undefined;

        try{
            const responseResetAlarma = await mapAPI.put('/registrosAlarmas', {id: id}, {headers: {token, 'Content-Type': 'multipart/form-data'}});

            if(responseResetAlarma.data && responseResetAlarma.data.result){
                responseControl = responseRegistrosAlarmasControl.ok;
            } else {
                responseControl = responseRegistrosAlarmasControl.serverError
            }

            commit("setMapResponse", responseControl);

        } catch {
            commit("setMapResponse", responseRegistrosAlarmasControl.serverError);
        }
    },

    async deleteAlarma({commit}, {token, id}){
        try {
            commit("setSendingData");
            let responseControl: responseRegistrosAlarmasControl | undefined = undefined;

            const responseDeleteAlarma = await mapAPI.delete(`/registrosAlarmas/${id}`, {headers: { token }})

            if(responseDeleteAlarma.data && responseDeleteAlarma.data.result){
                responseControl = responseRegistrosAlarmasControl.ok;
            } else {
                responseControl = responseRegistrosAlarmasControl.serverError

                if(responseDeleteAlarma.data && responseDeleteAlarma.data.msg === responseRegistrosAlarmasControl.alarmFindError){
                    responseControl = responseRegistrosAlarmasControl.alarmFindError;
                }
            }
            commit("setMapResponse", responseControl);
        } catch {
            commit("setMapResponse", responseRegistrosAlarmasControl.serverError);
        }
    }

}

export default actions