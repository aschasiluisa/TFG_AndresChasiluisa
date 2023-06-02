const usuarios = require('../models/usuarios')
const jsonError = require('../config/errors')

const userUpdate = async (req,res)=>{
    try{

        const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValidation = emailVal.test(req.body.mail)

        if(emailValidation){
            const emailError = await usuarios.findOne({Mail: req.body.mail})

            if(emailError){
                res.status(400).json(jsonError.emailError)
            } else {
                let Usuario = await usuarios.findOneAndUpdate({ Usuario: req.body.usuario }, {
                    Nombre : req.body.nombre,
                    Apellido : req.body.apellido,
                    Municipio : req.body.municipio,
                    Mail : req.body.mail
                }, { new: true })

                .then (user =>{
                    res.json({
                        result: true,
                        user:
                        {
                            Nombre: user.Nombre,
                            Apellido: user.Apellido,
                            Municipio: user.Municipio,
                            Email: user.Mail
                        } 
                    })
                })
            }
        } else {
            res.status(400).json(jsonError.emailFormatError)
        }

    } catch (error) {
        res.status(500).json(jsonError.serverError)
    }

}

//exportasmos el controlador
module.exports = {
    userUpdate
}