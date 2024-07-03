//////////////////////////////////////////////////////////////////////////
//CONTROLADOR DE PROCESOS PARA EL CONTACTO ENTRE USUARIOS Y ADMINISTRACIÓN
//////////////////////////////////////////////////////////////////////////

const usuarios = require('../models/usuarios')
const jsonError = require('../config/errors')
const mailer =require('../config/mailer')

postContacto = async (req,res) => {
    try{
        const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValidation = emailVal.test(req.body.mail)
        
        if(emailValidation){

                await usuarios.findOne({Rol: 5}).select('Mail')
                .then ( mailSuper =>{

                    mailer.contactoyConfirmacion( req.body.mail, req.body.nombre, req.body.apellido, req.body.asunto, req.body.mensaje, mailSuper)

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