//Importación de los modelos de datos 
const registrosIncidencias = require('../models/registrosIncidencias')
const registrosAlarmas = require('../models/registrosAlarmas')
const ImagenesDefault = require('../models/imagenesIncidenciasDefault')
const jsonError = require('../config/errors')
const calcularDistancia = require('./calcularDistancia')

const mailer =require('../config/mailer')

const moment = require('moment')

const bbox = [28.384151, -18.102722, 28.926439, -17.620697];
const allowedTypes=["image/jpg","image/jpeg","image/png","image/gif"];

// traer datos
const getData = async (req,res) => {

    let registros;

    if(req.body.register){
        if(req.body.rol == 0){
            try{
                registros = await registrosIncidencias.find({ 
                    $or: [
                        { Validada: true },
                        { Usuario: req.body.usuario }
                    ]
                 }).select('_id Latitud Longitud Validada');

            } catch {
                res.status(200).json(jsonError.serverError)
            }
        } 
        
        if(req.body.rol == 1){
            try{
                registros = await registrosIncidencias.find().select('_id Latitud Longitud Validada Origen');

            } catch {
                res.status(200).json(jsonError.serverError)
            }
        }
    } else {
        
        try{
            registros = await registrosIncidencias.find({ Validada: true }).select('_id Latitud Longitud Validada');
        } catch {
            res.status(200).json(jsonError.serverError)
        }
    }

    res.json({
        result: true,
        data: registros
    });

    
}

const getRegistro = async (req,res) => {
    const id = req.params.id;

    if(id){
        try{
            const registroInfo = await registrosIncidencias.findById(id).select('Nombre Nombre_es Nombre_en Imagen Fecha Tipo Descripcion Descripcion_es Descripcion_en Latitud Longitud Validada')

            if(!registroInfo.Imagen.data){
                if(!registroInfo.Nombre_es){
                    try{
                        const imagenDefault = await ImagenesDefault.find({Tipo: registroInfo.Tipo }).select('Imagen')
    
                        if(registroInfo && imagenDefault){
                            res.json({
                                result: true,
                                data: {
                                    _id: registroInfo._id,
                                    Imagen: imagenDefault[0].Imagen,
                                    Nombre: registroInfo.Nombre,
                                    Fecha: registroInfo.Fecha,
                                    Tipo: registroInfo.Tipo,
                                    Latitud: registroInfo.Latitud,
                                    Longitud: registroInfo.Longitud,
                                    Descripcion: registroInfo.Descripcion,
                                    Validada: registroInfo.Validada
                                }
                            });            
                        } else {
                            res.status(200).json(jsonError.serverError)
                        }
    
                    } catch (error) {
                        res.status(200).json(jsonError.serverError)
                    }
    
                } else {
                    try{
                        const imagenDefault = await ImagenesDefault.find({Tipo: registroInfo.Tipo }).select('Imagen')

                        if(registroInfo && imagenDefault){
                            res.json({
                                result: true,
                                data: {
                                    _id: registroInfo._id,
                                    Imagen: imagenDefault[0].Imagen,
                                    Nombre_es: registroInfo.Nombre_es,
                                    Nombre_en: registroInfo.Nombre_en,
                                    Fecha: registroInfo.Fecha,
                                    Tipo: registroInfo.Tipo,
                                    Latitud: registroInfo.Latitud,
                                    Longitud: registroInfo.Longitud,
                                    Descripcion_es: registroInfo.Descripcion_es,
                                    Descripcion_en: registroInfo.Descripcion_en,
                                    Validada: registroInfo.Validada
                                }
                            });            
                        } else {
                            res.status(200).json(jsonError.serverError)
                        }

                    } catch (error) {
                        res.status(200).json(jsonError.serverError)
                    }
                }
            } else {
                if(!registroInfo.Nombre_es){
                    if(registroInfo){
                        res.json({
                            result: true,
                            data: {
                                _id: registroInfo._id,
                                Imagen: registroInfo.Imagen,
                                Nombre: registroInfo.Nombre,
                                Fecha: registroInfo.Fecha,
                                Tipo: registroInfo.Tipo,
                                Latitud: registroInfo.Latitud,
                                Longitud: registroInfo.Longitud,
                                Descripcion: registroInfo.Descripcion,
                                Validada: registroInfo.Validada
                            }
                        });            
                    } else {
                        res.status(200).json(jsonError.serverError)
                    }            
                } else {
                    if(registroInfo){
                        res.json({
                            result: true,
                            data: {
                                _id: registroInfo._id,
                                Imagen: registroInfo.Imagen,
                                Nombre_es: registroInfo.Nombre_es,
                                Nombre_en: registroInfo.Nombre_en,
                                Fecha: registroInfo.Fecha,
                                Tipo: registroInfo.Tipo,
                                Latitud: registroInfo.Latitud,
                                Longitud: registroInfo.Longitud,
                                Descripcion_es: registroInfo.Descripcion_es,
                                Descripcion_en: registroInfo.Descripcion_en,
                                Validada: registroInfo.Validada
                            }
                        });            
                    } else {
                        res.status(200).json(jsonError.serverError)
                    } 
                }
            }
        } catch (error) {
            res.status(200).json(jsonError.serverError)
        }
    } else {
        res.status(200).json(jsonError.serverError)
    }
}

const postRegistro = async (req, res) => {
    try {
        if( bbox[0] < req.body.latitud && req.body.latitud < bbox[2] && bbox[1] < req.body.longitud && req.body.longitud < bbox[3]){

            let nuevaIncidencia = new registrosIncidencias({
                Fecha : moment().format('DD/MM/YYYY HH:mm'),
                Tipo : req.body.tipo,
                Latitud : req.body.latitud,
                Longitud : req.body.longitud,
                Usuario : req.body.usuario,
                Origen : 'APP',
            })
            
            if(req.files){
                if(allowedTypes.includes(req.files.imagen.mimetype)){
                    nuevaIncidencia.Imagen.data = req.files.imagen.data;
                    nuevaIncidencia.Imagen.contentType = req.files.imagen.mimetype;
                } else {
                    res.status(200).json(jsonError.imageFormatError)
                }
            }
 
            if(req.body.rol == 1){
                if( req.body.nombre_es && req.body.nombre_en && (req.body.descripcion_es && req.body.descripcion_en) || (!req.body.descripcion_es && !req.body.descripcion_en)){
                    
                    nuevaIncidencia.Administrador = req.body.usuario;
                    nuevaIncidencia.Validada = true;

                    nuevaIncidencia.Nombre_es = req.body.nombre_es;
                    nuevaIncidencia.Nombre_en = req.body.nombre_en;

                    nuevaIncidencia.Descripcion_es = req.body.descripcion_es;
                    nuevaIncidencia.Descripcion_en = req.body.descripcion_en;

                    try{
                        Alarmas = await registrosAlarmas.find().select('_id Nombre Rango Latitud Longitud Usuario');
        
                    } catch {
                        res.status(200).json(jsonError.serverError)
                    }
        
                    const puntoIncidencia = {
                        latitud: req.body.latitud,
                        longitud: req.body.longitud
                    };
        
                    let alarmasActivadas = [];
        
                    Alarmas.forEach((alarma) => {
                        const distancia = calcularDistancia(puntoIncidencia.latitud, puntoIncidencia.longitud, alarma.Latitud, alarma.Longitud);

                        if (distancia < alarma.Rango) {
                            alarmasActivadas.push({
                            id: alarma._id,
                            nombre: alarma.Nombre,
                            usuario: alarma.Usuario,
                            distancia: parseInt(distancia)
                            });
                        }
                    });
        
                    if(alarmasActivadas.length != 0){
                        for (let i = 0; i < alarmasActivadas.length; i++) {

                            mailer.alarmaActivada_v2(alarmasActivadas[i], req.body);

                            try {
                                await registrosAlarmas.findOneAndUpdate({_id: alarmasActivadas[i].id},{
                                    Activada: true,
                                }, { new: true })

                            } catch {
                                res.status(200).json(jsonError.serverError)
                            }
                        }
                    }
                } else {
                    res.status(200).json(jsonError.emptyFieldError)
                }
            } else if(req.body.rol === 0) {
                nuevaIncidencia.Nombre = req.body.nombre;
                nuevaIncidencia.Descripcion = req.body.descripcion;
            }
    
            await nuevaIncidencia.save()
            .then (incidencia =>{
                res.json({
                    result: true,
                })
            })

        } else {
            res.status(200).json(jsonError.coorBboxError)
        }
    }
    catch(error) {
        res.status(200).json(jsonError.serverError)
    }
}

const updateRegistro = async (req, res) => {
    if(req.body.rol === 1){
        try {
            if( req.body.nombre_es && req.body.nombre_en && (req.body.descripcion_es && req.body.descripcion_en) || (!req.body.descripcion_es && !req.body.descripcion_en)){
                if( bbox[0] < req.body.latitud && req.body.latitud < bbox[2] && bbox[1] < req.body.longitud && req.body.longitud < bbox[3]){
                    if(req.files){
                        if(allowedTypes.includes(req.files.imagen.mimetype)){
    
                            if(req.body.validada === "false"){
                                mailer.incidenciaValidada(req.body);
                            }
    
                            try{
                                Alarmas = await registrosAlarmas.find().select('_id Nombre Rango Latitud Longitud Usuario');
                            } catch {
                                res.status(200).json(jsonError.serverError)
                            }
                
                            const puntoIncidencia = {
                                latitud: req.body.latitud,
                                longitud: req.body.longitud
                            };
                
                            let alarmasActivadas = [];
                
                            Alarmas.forEach((alarma) => {
                                const distancia = calcularDistancia(puntoIncidencia.latitud, puntoIncidencia.longitud, alarma.Latitud, alarma.Longitud);
            
                                if (distancia < alarma.Rango) {
                                    alarmasActivadas.push({
                                      id: alarma._id,
                                      nombre: alarma.Nombre,
                                      usuario: alarma.Usuario,
                                      distancia: parseInt(distancia)
                                    });
                                }
                            });
                
                            if(alarmasActivadas.length != 0){
                                for (let i = 0; i < alarmasActivadas.length; i++) {
                                    mailer.alarmaActivada_v2(alarmasActivadas[i], req.body);
            
                                    try {
            
                                        await registrosAlarmas.findOneAndUpdate({_id: alarmasActivadas[i].id},{
                                            Activada: true,
                                        }, { new: true })
            
                                    } catch {
                                        res.status(200).json(jsonError.serverError)
                                    }
            
                                }
                            }
        
                             await registrosIncidencias.findOneAndUpdate({ _id: req.body.id }, {
                                Nombre_es : req.body.nombre_es,
                                Nombre_en : req.body.nombre_en,
                                Imagen : {
                                    data : req.files.imagen.data,
                                    contentType : req.files.imagen.mimetype,
                                },
                                Tipo : req.body.tipo,
                                Descripcion_es : req.body.descripcion_es,
                                Descripcion_en : req.body.descripcion_en,
                                Latitud : req.body.latitud,
                                Longitud : req.body.longitud,
                                Administrador : req.body.usuario,
                                Validada : true,
                                Origen : 'APP',
                            }, { new: true })
    
                            .then (incidencia =>{
                                res.json({
                                    result: true,
                                })
                            })
                           
                        } else {
                            res.status(200).json(jsonError.imageFormatError)
                        }
                    }  else {
    
                        if(req.body.validada === "false"){
                            mailer.incidenciaValidada(req.body);
                        }
    
                        try{
                            Alarmas = await registrosAlarmas.find().select('_id Nombre Rango Latitud Longitud Usuario');
                        } catch {
                            res.status(200).json(jsonError.serverError)
                        }
            
                        const puntoIncidencia = {
                            latitud: req.body.latitud,
                            longitud: req.body.longitud
                        };
            
                        let alarmasActivadas = [];
            
                        Alarmas.forEach((alarma) => {
                            const distancia = calcularDistancia(puntoIncidencia.latitud, puntoIncidencia.longitud, alarma.Latitud, alarma.Longitud);
        
                            if (distancia < alarma.Rango) {
                                alarmasActivadas.push({
                                  id: alarma._id,
                                  nombre: alarma.Nombre,
                                  usuario: alarma.Usuario,
                                  distancia: parseInt(distancia)
                                });
                            }
                        });
            
                        if(alarmasActivadas.length != 0){
                            for (let i = 0; i < alarmasActivadas.length; i++) {
        
                                mailer.alarmaActivada_v2(alarmasActivadas[i], req.body);
        
                                try {
        
                                    await registrosAlarmas.findOneAndUpdate({_id: alarmasActivadas[i].id},{
                                        Activada: true,
                                    }, { new: true })
        
                                } catch {
                                    res.status(200).json(jsonError.serverError)
                                }
        
                            }
                        }
    
                        await registrosIncidencias.findOneAndUpdate({ _id: req.body.id }, {
                            Nombre_es : req.body.nombre_es,
                            Nombre_en : req.body.nombre_en,
                            Tipo : req.body.tipo,
                            Descripcion_es : req.body.descripcion_es,
                            Descripcion_en : req.body.descripcion_en,
                            Latitud : req.body.latitud,
                            Longitud : req.body.longitud,
                            Administrador : req.body.usuario,
                            Validada : true,
                            Origen : 'APP',
                        }, { new: true })
    
                        .then (incidencia =>{
                            res.json({
                                result: true,
                            })
                        })
                    } 
        
                } else {
                    res.status(200).json(jsonError.coorBboxError)
                }
            } else {
                res.status(200).json(jsonError.emptyFieldError)
            }
        }
        catch(error) {
            res.status(200).json(jsonError.serverError)
        }
    }  else {
        return res.status(401).json(jsonError.tokenError)
    }    
    
}

const deleteRegistro = async (req, res) => {
    if(req.body.rol === 1){
        
        const id = req.params.id;

        if(id){
            try{
                if(req.get("validada") === "false"){
                    mailer.incidenciaRechazada(id, req.get("nombre"));
                }
        
                await registrosIncidencias.findOneAndDelete({ _id: id })
                .catch (error => {
                    res.status(200).json(jsonError.incidenceFindError)
                })
            
                res.json({
                    result: true,
                    msg: "delete Incidence successful"
                })
            } catch {
                res.status(200).json(jsonError.serverError)
            }

        } else {
            res.status(200).json(jsonError.serverError)
        }
    } else {
        return res.status(401).json(jsonError.tokenError)
    }
}

//exportasmos el controlador
module.exports = {
    getData,
    postRegistro,
    getRegistro,
    updateRegistro,
    deleteRegistro
}