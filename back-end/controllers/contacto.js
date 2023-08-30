const peticionesContacto = require('../models/peticionesContacto')
const jsonError = require('../config/errors')

const mailer =require('../config/mailer')

postContacto = async (req,res) => {
    try{
        const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValidation = emailVal.test(req.body.mail)
        
        if(emailValidation){
                let nuevoContacto = new peticionesContacto({
                    Nombre : req.body.nombre,
                    Apellido : req.body.apellido,
                    Mail : req.body.mail,
                    Asunto : req.body.asunto,
                    Mensaje : req.body.mensaje,
                })

                await nuevoContacto.save()
                .then ( contacto =>{

                    mailer.contactoConfirmacion(contacto.Mail, contacto.Nombre, contacto.Apellido)

                    res.json({
                        result: true, 
                    })
                })
        } else {
            res.status(200).json(jsonError.emailFormatError)
        }
    } catch(error) {
        res.status(400).json(jsonError.serverError)
    }
}

//exportasmos el controlador
module.exports = {
    postContacto,
}