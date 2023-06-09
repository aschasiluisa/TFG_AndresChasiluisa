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
    })

    const DBtoken = await tokens.findOne({Usuario: req.body.usuario})
    
    if(DBtoken){
        next()
    } else {
        return res.status(401).json(jsonError.tokenError)
    }
}

module.exports = tokenVerification;