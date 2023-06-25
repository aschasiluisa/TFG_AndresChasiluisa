
const registrosAlarmas = require('../models/registrosAlarmas')
const registrosIncidencias = require('../models/registrosIncidencias')
const usuarios = require('../models/usuarios')
const jsonError = require('../config/errors')
const calcularDistancia = require('./calcularDistancia')

const sendMail =require('../config/mailer')

const bbox = [28.384151, -18.102722, 28.926439, -17.620697];

const getData = async (req,res) => {
    try {

        const alarmas = await registrosAlarmas.find({Usuario: req.body.usuario}).select('_id Latitud Longitud');

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
            const registroInfo = await registrosAlarmas.findById(id).select('Nombre Rango Activada')
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

        if( bbox[0] < req.body.latitud || req.body.latitud < bbox[2] || bbox[1] < req.body.longitud || req.body.longitud < bbox[3]){

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
                }).select('Nombre Tipo Descripcion Latitud Longitud');

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
                      nombre: incidencia.Nombre,
                      tipo: incidencia.Tipo,
                      descripcion: incidencia.Descripcion,
                      distancia: parseInt(distancia)
                    });
                }
            });

            if(incidenciasCercanas.length != 0){
                const mail = await usuarios.findOne({Usuario: req.body.usuario}).select('Mail');
                if (mail.Mail){
                    for (let i = 0; i < incidenciasCercanas.length; i++) {
                        sendMail(mail.Mail, "Alerta!!! incidencdia detectada", 
                        `<p>`+
                            "Hola,"+`<br> <br>`+
                            "Su alerta con nombre "+req.body.nombre+" ha sido activada por una incidencia a "+incidenciasCercanas[i].distancia+" m, con los siguientes datos:"+`<br>  &emsp;`+
                                `<strong>`+" nombre = "+`</strong>`+incidenciasCercanas[i].nombre+`<br>  &emsp;`+
                                `<strong>`+" tipo = "+`</strong>`+incidenciasCercanas[i].tipo+`<br>  &emsp;`+
                                `<strong>`+"descripcion = "+`</strong>`+incidenciasCercanas[i].descripcion+`<br> <br>`+
                                "gracias por su colaboración. Un saludo,"+`<br> <br>`+
                                `<strong>`+"TFG | La Palma"+`</strong>`+
                        `</p>`+`<br> <hr> <br>`+
                        `<p>`+
                            "Hello,"+`<br> <br>`+
                            "Your alert "+req.body.nombre+" was activated by a incedence "+incidenciasCercanas[i].distancia+" m away, with the following data:"+`<br>  &emsp;`+
                                `<strong>`+" name = "+`</strong>`+incidenciasCercanas[i].nombre+`<br>  &emsp;`+
                                `<strong>`+" type = "+`</strong>`+incidenciasCercanas[i].tipo+`<br>  &emsp;`+
                                `<strong>`+"description = "+`</strong>`+incidenciasCercanas[i].descripcion+`<br> <br>`+
                                "Thank you for your cooperation. All the best,"+`<br> <br>`+
                                `<strong>`+"TFG | La Palma"+`</strong>`+
                        `</p>`
                        )
                    }
                }

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