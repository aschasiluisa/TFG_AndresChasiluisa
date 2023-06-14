const usuarios = require('../models/usuarios')
const jsonError = require('../config/errors')

const userUpdate = async (req,res)=>{
    try{
        if(req.body.mail){
            const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailValidation = emailVal.test(req.body.mail)

            if(emailValidation){
                const emailError = await usuarios.findOne({Mail: req.body.mail})
    
                if(emailError){
                    res.status(200).json(jsonError.emailError)
                } else {
                    let Usuario = await usuarios.findOneAndUpdate({ Usuario: req.body.usuario }, {
                        Nombre : req.body.nombre,
                        Apellido : req.body.apellido,
                        Municipio : req.body.municipio,
                        Mail : req.body.mail,
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
                res.status(200).json(jsonError.emailFormatError)
            }
        } else {
            let Usuario = await usuarios.findOneAndUpdate({ Usuario: req.body.usuario }, {
                Nombre : req.body.nombre,
                Apellido : req.body.apellido,
                Municipio : req.body.municipio,
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
    } catch (error) {
        res.status(400).json(jsonError.serverError)
    }
}

const getUserInfo = async (req,res)=>{
    try{
        await usuarios.find({ Usuario: req.body.usuario })
        .select({
            Nombre:1,
            Apellido:1,
            Municipio:1
        })
        .then(user => {
            res.json({
                result: true,
                user:
                {
                    Nombre: user[0].Nombre,
                    Apellido: user[0].Apellido,
                    Municipio: user[0].Municipio
                }
            })
        })
    } catch (error) {
        res.status(400).json(jsonError.serverError)
    }
}

//exportasmos el controlador
module.exports = {
    userUpdate,
    getUserInfo
}