//Importación de los modelos de datos 
const registrosCalidaAire = require('../models/registrosCalidadAire')
const jsonError = require('../config/errors')

// traer datos
const getData = async (req,res)=>{
    try{
        const registros =  await registrosCalidaAire.find().select('_id Latitud Longitud');

        res.json({
             result: true,
             data: registros
         });
    } catch(error){
        res.status(200).json(jsonError.serverError)
    }
}

const getRegistro = async (req,res) => {
    const id = req.params.id;

    if(id){
        try{
            const registroInfo = await registrosCalidaAire.findById(id).select('Nombre Fecha Temperatura Humedad CO NO2 O3 SO2')

            if(registroInfo){
                res.json({
                    result: true,
                    data: registroInfo
                });            
            } else {
                res.status(200).json(jsonError.serverError)
            }
        } catch (error) {
            res.status(200).json(jsonError.serverError)
        }
    } else {
        res.status(200).json(jsonError.serverError)
    }
}

//exportasmos el controlador
module.exports = {
    getData,
    getRegistro
}