const usuarios = require('../models/usuarios')
const tokens = require('../models/tokens')
const jsonError = require('../config/errors')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signup = async (req,res)=>{

    try{
        const usernameError = await usuarios.findOne({Usuario: req.body.usuario})

        if(usernameError){
            res.status(400).json(jsonError.usernameError)
        } else {

            const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailValidation = emailVal.test(req.body.mail)
            
            if(emailValidation){
                const emailError = await usuarios.findOne({Mail: req.body.mail})

                if(emailError){
                    res.status(400).json(jsonError.emailError)
                } else {
                    let nuevoUsuario = new usuarios({
                        Nombre : req.body.nombre,
                        Apellido : req.body.apellido,
                        Municipio : req.body.municipio,
                        Usuario : req.body.usuario,
                        Mail : req.body.mail,
                        Contraseña : bcrypt.hashSync( req.body.contraseña, 10)
                    })

                    await nuevoUsuario.save()
                    .then (Usuario =>{
                        const token = jwt.sign({user: Usuario.Usuario, role: Usuario.Rol}, process.env.SECRET_JWT_KEY)

                        let nuevoToken = new tokens({
                            Usuario : Usuario.Usuario,
                            Token : token
                        })

                        nuevoToken.save()

                        res.json({
                            result: true,
                            user:
                            {
                                User: Usuario.Usuario,
                                Email: Usuario.Mail,
                                Role: Usuario.Rol,
                                Token: token
                            } 
                        })
                    })
                }
            } else {
                res.status(400).json(jsonError.emailFormatError)
            }
       }
    } catch(error) {
        res.status(400).json(jsonError.serverError)
    }
}

//exportasmos el controlador
module.exports = {
    signup
}