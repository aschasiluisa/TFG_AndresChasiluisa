const jwt = require('jsonwebtoken')
const tokens = require('../models/tokens')
const jsonError = require('../config/errors')

let tokenVerification = async (req,res,next)=>{
    let token = req.get('token')
    
    jwt.verify(token,process.env.SECRET_JWT_KEY,(error, decoded)=>{
        if(error){
            return res.status(401).json(jsonError.tokenError)
        }
        req.body.usuario = decoded.user
        req.body.rol = decoded.role
    })

    const DBtoken = await tokens.findOne({Usuario: req.body.usuario})
    
    if(DBtoken){
        next()
    } else {
        return res.status(401).json(jsonError.tokenError)
    }
}

let tokenVerificationNext = async (req,res,next)=>{
    
    let token = req.get('token')
    let correctToken = true;
    let usuario = "";
    let rol= "";

    req.body.register = false;
    
    jwt.verify(token,process.env.SECRET_JWT_KEY,(error, decoded)=>{
        if(error){
            correctToken = false;
        } else {
            usuario = decoded.user;
            rol = decoded.role;
        }
    })

    if(correctToken){
        const DBtoken = await tokens.findOne({Token: token})
        
        if(DBtoken && DBtoken.Usuario === usuario){
            req.body.usuario = usuario;
            req.body.rol = rol;
            req.body.register = true;
        }
    }

    next()
}

module.exports = {
    tokenVerification,
    tokenVerificationNext
}