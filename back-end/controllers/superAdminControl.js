const usuarios = require('../models/usuarios')
const registrosAlarmas = require('../models/registrosAlarmas')
const registrosIncidencias = require('../models/registrosIncidencias')
const jsonError = require('../config/errors')

const superAdminControl = async (req,res)=>{
    if(req.body.rol === 5){
        try{
            await usuarios.findOne({ Usuario: req.get('usuarioCliente')})
            .then(user => {
                res.json({
                    result: true,
                    user:
                    {
                        Nombre: user.Nombre,
                        Apellido: user.Apellido,
                        Municipio: user.Municipio,
                        Usuario: user.Usuario,
                        Mail: user.Mail,
                        Rol: user.Rol
                    }
                })
            })
        } catch (error) {
            res.status(200).json(jsonError.userFindError)
        }
    } else {
        return res.status(401).json(jsonError.tokenError)
    }    
}

const changeRole = async (req,res)=>{
    if(req.body.rol === 5){
        try{
            let Usuario = await usuarios.findOneAndUpdate({ Usuario: req.body.usuarioCliente }, {
                Rol : req.body.role,
            }, { new: true })

            .then (user =>{
                res.json({
                    result: true,
                    user:
                    {
                        Nombre: user.Nombre,
                        Apellido: user.Apellido,
                        Municipio: user.Municipio,
                        Usuario: user.Usuario,
                        Mail: user.Mail,
                        Rol: user.Rol
                    } 
                })
            })
        } catch (error) {
            res.status(200).json(jsonError.userFindError)
        }
    } else {
        return res.status(401).json(jsonError.tokenError)
    }
}

const deleteUser = async (req,res)=>{
    if(req.body.rol === 5){
        const usuarioCliente = req.get('usuarioCliente');
        
        await usuarios.findOneAndDelete({ Usuario: usuarioCliente })
        .catch (error => {
            res.status(200).json(jsonError.userFindError)
        })

        await registrosAlarmas.deleteMany({ Usuario: usuarioCliente });

        await registrosIncidencias.updateMany({ Usuario: usuarioCliente }, { $set: { Usuario: null } });

        res.json({
            result: true,
            msg: "delete user successful"
        })

    } else {
        return res.status(401).json(jsonError.tokenError)
    }
}

module.exports = {
    superAdminControl,
    changeRole,
    deleteUser
}