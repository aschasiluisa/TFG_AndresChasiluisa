//Importación de los modelos de datos 
const registrosCO = require('../models/registrosCO')

// traer datos
const getData = (req,res)=>{
    registrosCO.find({})
    .then((data)=>{
        res.send(data)
    })
    .catch((error)=>{
        res.send("ERROR al pedir registros: ", error)
    });
}

//exportasmos el controlador
module.exports = {
    getData
}