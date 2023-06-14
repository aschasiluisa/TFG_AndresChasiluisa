const tokens = require('../models/tokens')
const jsonError = require('../config/errors')

const logout = async (req,res)=>{
    let delToken = await tokens.findOneAndDelete({ Usuario: req.body.usuario })
    .catch (error => {
        res.status(200).json(jsonError.serverError)
    })

    res.json({
        result: true,
        msg: "Logout successful"
    })
}

//exportasmos el controlador
module.exports = {
    logout
}