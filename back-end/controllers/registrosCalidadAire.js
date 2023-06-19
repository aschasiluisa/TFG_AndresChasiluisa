//Importación de los modelos de datos 
const registrosCalidaAire = require('../models/registrosCalidadAire')
const jsonError = require('../config/errors')

// traer datos
const getData = async (req,res)=>{

    await registrosCalidaAire.find()
        .then(data=>{
            res.json({
                result: true,
                data: data
            });
        })
        .catch(error=>{
            res.status(200).json(jsonError.serverError)
        });
}

//exportasmos el controlador
module.exports = {
    getData
}