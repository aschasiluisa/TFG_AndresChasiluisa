//Importación de los modelos de datos 
const registrosIncidencias = require('../models/registrosIncidencias')
const ImagenesDefault = require('../models/imagenesIncidenciasDefault')
const usuarios = require('../models/usuarios')
const jsonError = require('../config/errors')

const sendMail =require('../config/mailer')

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
                registros = await registrosIncidencias.find().select('_id Latitud Longitud Validada');

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
            const registroInfo = await registrosIncidencias.findById(id).select('Nombre Imagen Fecha Tipo Descripcion Latitud Longitud Validada')

            if(!registroInfo.Imagen.data){
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
                if(registroInfo){
                    res.json({
                        result: true,
                        data: registroInfo
                    });            
                } else {
                    res.status(200).json(jsonError.serverError)
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
        if( bbox[0] < req.body.latitud || req.body.latitud < bbox[2] || bbox[1] < req.body.longitud || req.body.longitud < bbox[3]){

            let nuevaIncidencia = new registrosIncidencias({
                Nombre : req.body.nombre,
                Fecha : moment().format('YYYY-MM-DD HH:mm'),
                Tipo : req.body.tipo,
                Descripcion : req.body.descripcion,
                Latitud : req.body.latitud,
                Longitud : req.body.longitud,
                Usuario : req.body.usuario,
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
                nuevaIncidencia.Administrador = req.body.usuario;
                nuevaIncidencia.Validada = true;
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
            if( bbox[0] < req.body.latitud || req.body.latitud < bbox[2] || bbox[1] < req.body.longitud || req.body.longitud < bbox[3]){
                if(req.files){
                    if(allowedTypes.includes(req.files.imagen.mimetype)){

                        if(req.body.validada === "false"){
                            const usuario = await registrosIncidencias.findById(req.body.id).select('Usuario');
                            if(usuario.Usuario){
                                const mail = await usuarios.findOne({Usuario: usuario.Usuario}).select('Mail');
                                if (mail.Mail){
                                    sendMail(mail.Mail, "Incidencia validada", 
                                        `<p>`+
                                            "Hola,"+`<br> <br>`+
                                            "su Incidencia ha sido validada como: "+`<br>  &emsp;`+
                                                `<strong>`+" nombre = "+`</strong>`+req.body.nombre+`<br>  &emsp;`+
                                                `<strong>`+" tipo = "+`</strong>`+req.body.tipo+`<br>  &emsp;`+
                                                `<strong>`+"descripcion = "+`</strong>`+req.body.descripcion+`<br> <br>`+
                                                "gracias por su colaboración. Un saludo,"+`<br> <br>`+
                                                `<strong>`+"TFG | La Palma"+`</strong>`+
                                        `</p>`+`<br> <hr> <br>`+
                                        `<p>`+
                                            "Hello,"+`<br> <br>`+
                                            "Your Incident has been validated as: "+`<br>  &emsp;`+
                                                `<strong>`+" name = "+`</strong>`+req.body.nombre+`<br>  &emsp;`+
                                                `<strong>`+" type = "+`</strong>`+req.body.tipo+`<br>  &emsp;`+
                                                `<strong>`+"description = "+`</strong>`+req.body.descripcion+`<br> <br>`+
                                                "Thank you for your cooperation. All the best,"+`<br> <br>`+
                                                `<strong>`+"TFG | La Palma"+`</strong>`+
                                        `</p>`
                                        )
                                }
                            }
                        }
    
                         await registrosIncidencias.findOneAndUpdate({ _id: req.body.id }, {
                            Nombre : req.body.nombre,
                            Imagen : {
                                data : req.files.imagen.data,
                                contentType : req.files.imagen.mimetype,
                            },
                            Tipo : req.body.tipo,
                            Descripcion : req.body.descripcion,
                            Latitud : req.body.latitud,
                            Longitud : req.body.longitud,
                            Administrador : req.body.usuario,
                            Validada : true,
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
                        const usuario = await registrosIncidencias.findById(req.body.id).select('Usuario');
                        if(usuario.Usuario){
                            const mail = await usuarios.findOne({Usuario: usuario.Usuario}).select('Mail');
                            if (mail.Mail){
                                sendMail(mail.Mail, "Incidencia validada", 
                                    `<p>`+
                                        "Hola,"+`<br> <br>`+
                                        "su Incidencia ha sido validada como: "+`<br>  &emsp;`+
                                            `<strong>`+" nombre = "+`</strong>`+req.body.nombre+`<br>  &emsp;`+
                                            `<strong>`+" tipo = "+`</strong>`+req.body.tipo+`<br>  &emsp;`+
                                            `<strong>`+"descripcion = "+`</strong>`+req.body.descripcion+`<br> <br>`+
                                            "gracias por su colaboración. Un saludo,"+`<br> <br>`+
                                            `<strong>`+"TFG | La Palma"+`</strong>`+
                                    `</p>`+`<br> <hr> <br>`+
                                    `<p>`+
                                        "Hello,"+`<br> <br>`+
                                        "Your Incident has been validated as: "+`<br>  &emsp;`+
                                            `<strong>`+" name = "+`</strong>`+req.body.nombre+`<br>  &emsp;`+
                                            `<strong>`+" type = "+`</strong>`+req.body.tipo+`<br>  &emsp;`+
                                            `<strong>`+"description = "+`</strong>`+req.body.descripcion+`<br> <br>`+
                                            "Thank you for your cooperation. All the best,"+`<br> <br>`+
                                            `<strong>`+"TFG | La Palma"+`</strong>`+
                                    `</p>`
                                )
                            }
                        }
                    }

                    await registrosIncidencias.findOneAndUpdate({ _id: req.body.id }, {
                        Nombre : req.body.nombre,
                        Tipo : req.body.tipo,
                        Descripcion : req.body.descripcion,
                        Latitud : req.body.latitud,
                        Longitud : req.body.longitud,
                        Administrador : req.body.usuario,
                        Validada : true,
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
                    const usuario = await registrosIncidencias.findById(id).select('Usuario');
                    if(usuario.Usuario){
                        const mail = await usuarios.findOne({Usuario: usuario.Usuario}).select('Mail');
                        if (mail.Mail){
                            sendMail(mail.Mail, "Propuesta de incidencia rechazada", 
                                `<p>`+
                                    "Hola,"+`<br> <br>`+
                                    "su propuesta de Incidencia con nombre "+ req.get("nombre")+", ha sido rechazada."+`<br> <br>`+
                                        "gracias por su colaboración. Un saludo,"+`<br> <br>`+
                                        `<strong>`+"TFG | La Palma"+`</strong>`+
                                `</p>`+`<br> <hr> <br>`+
                                `<p>`+
                                    "Hello,"+`<br> <br>`+
                                    "your incidence proposal,  "+ req.get("nombre")+" call, has been rejected."+`<br> <br>`+
                                        "Thank you for your cooperation. All the best,"+`<br> <br>`+
                                        `<strong>`+"TFG | La Palma"+`</strong>`+
                                `</p>`
                            )
                        }
                    }
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