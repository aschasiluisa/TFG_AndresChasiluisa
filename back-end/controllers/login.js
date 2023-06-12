const usuarios = require('../models/usuarios')
const tokens = require('../models/tokens')
const jsonError = require('../config/errors')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (req,res)=>{
    try{
        const Usuario = await usuarios.findOne({Usuario: req.body.usuario})

        if(Usuario){
            const contraseñaValida = bcrypt.compareSync(req.body.contraseña, Usuario.Contraseña);
            
            if(contraseñaValida){
                const token = await tokens.findOne({Usuario: req.body.usuario});

                if(token){
                    res.status(200).json(jsonError.loginError)
                } else {
                    const newtoken = jwt.sign({user: Usuario.Usuario, email: Usuario.Mail, role: Usuario.Rol}, process.env.SECRET_JWT_KEY, { expiresIn: '24h'})

                    let nuevoToken = new tokens({
                        Usuario : Usuario.Usuario,
                        Token : newtoken
                    })

                    nuevoToken.save()

                    res.json({
                        result: true,
                        user:
                        {
                            User: Usuario.Usuario,
                            Email: Usuario.Mail,
                            Role: Usuario.Rol,
                            Token: newtoken
                        } 
                    })    
                }

            } else {
                res.status(200).json(jsonError.loginError)
            }
        } else {
            res.status(200).json(jsonError.loginError)
        }

    } catch {
        res.status(400).json(jsonError.serverError)
    }
}

//exportasmos el controlador
module.exports = {
    login
}