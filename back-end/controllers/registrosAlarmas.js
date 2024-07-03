
const registrosAlarmas = require('../models/registrosAlarmas')
const registrosIncidencias = require('../models/registrosIncidencias')
const jsonError = require('../config/errors')
const calcularDistancia = require('./calcularDistancia')

const mailer =require('../config/mailer')

const bbox = [28.384151, -18.102722, 28.926439, -17.620697];

const getData = async (req,res) => {
    try {

        const alarmas = await registrosAlarmas.find({Usuario: req.body.usuario}).select('_id Latitud Longitud Activada');

        res.json({
            result: true,
            data: alarmas
        });

    } catch {
        res.status(200).json(jsonError.serverError)
    }
}

const getRegistro = async (req,res) => {

    const id = req.params.id;

    if(id){
        try{
            const registroInfo = await registrosAlarmas.findById(id).select('_id Nombre Rango Activada')
            if(registroInfo){
                res.json({
                    result: true,
                    data: registroInfo
                });            
            } else {
                res.status(200).json(jsonError.serverError)
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

        let Incidencias;

        if( 99 < req.body.rango || 3001 > req.body.rango) {
            if( bbox[0] < req.body.latitud && req.body.latitud < bbox[2] && bbox[1] < req.body.longitud && req.body.longitud < bbox[3]){

                let nuevaAlarma = new registrosAlarmas({
                    Nombre : req.body.nombre,
                    Rango : req.body.rango,
                    Latitud : req.body.latitud,
                    Longitud : req.body.longitud,
                    Usuario : req.body.usuario,
                })
    
                try{
                    Incidencias = await registrosIncidencias.find({ 
                        $or: [
                            { Validada: true },
                            { Usuario: req.body.usuario }
                        ]
                    }).select('Nombre_es Nombre_en Tipo Descripcion_es Descripcion_en Latitud Longitud');
    
                } catch {
                    res.status(200).json(jsonError.serverError)
                }
    
                const puntoAlarma = {
                    latitud: req.body.latitud,
                    longitud: req.body.longitud
                };
    
                let incidenciasCercanas = [];
    
                Incidencias.forEach((incidencia) => {
                    const distancia = calcularDistancia(puntoAlarma.latitud, puntoAlarma.longitud, incidencia.Latitud, incidencia.Longitud);
                    if (distancia < req.body.rango) {
                        incidenciasCercanas.push({
                          nombre_es: incidencia.Nombre_es,
                          nombre_en: incidencia.Nombre_en,
                          tipo: incidencia.Tipo,
                          descripcion_es: incidencia.Descripcion_es,
                          descripcion_en: incidencia.Descripcion_en,
                          distancia: parseInt(distancia)
                        });
                    }
                });
    
                if(incidenciasCercanas.length != 0){
                    mailer.alarmaActivada_v1(req.body,incidenciasCercanas);
                    nuevaAlarma.Activada = true;
                }
     
                await nuevaAlarma.save()
                .then (Alarma =>{
                    res.json({
                        result: true,
                    })
                })
    
            } else {
                res.status(200).json(jsonError.coorBboxError)
            }   
        } else {
            res.status(200).json(jsonError.rangoError)
        }
    }
    catch(error) {
        res.status(200).json(jsonError.serverError)
    }
}

const resetRegistro = async (req,res) => {
    try {
        await registrosAlarmas.findOneAndUpdate({_id: req.body.id},{
            Activada: false
        }, { new: true })

        .then (alarma =>{
            res.json({
                result: true,
            })
        })

    } catch {
        res.status(200).json(jsonError.serverError)
    }
}

const deleteRegistro = async (req,res) => {
    try{
        const id = req.params.id;

        if(id){ 
        
            await registrosAlarmas.findOneAndDelete({ _id: id })
            .catch (error => {
                res.status(200).json(jsonError.alarmFindError)
            })
    
            res.json({
                result: true,
                msg: "delete Alarm successful"
            })
        } else {
            res.status(200).json(jsonError.serverError)
        }
    } catch {
        res.status(200).json(jsonError.serverError)
    }
}

module.exports = {
    getData,
    postRegistro,
    getRegistro,
    resetRegistro,
    deleteRegistro
}