//Importación de los modelos de datos 
const registrosCO = require('../models/registrosCO')
const registrosNO2 = require('../models/registrosNO2')
const registrosO3 = require('../models/registrosO3')
const registrosSO2 = require('../models/registrosSO2')

// traer datos
const getData = async (req,res)=>{

    let registrosCO_data;
    let registrosNO2_data;
    let registrosO3_data;
    let registrosSO2_data;

    await registrosCO.find()
        .then(data=>{
            registrosCO_data = data
        })
        .catch(error=>{
            res.send("ERROR al pedir registros CO: ", error)
        });
    
    await registrosNO2.find()
        .then(data=>{
            registrosNO2_data = data
        })
        .catch(error=>{
            res.send("ERROR al pedir registros NO2: ", error)
        });

    await registrosO3.find()
        .then(data=>{
            registrosO3_data = data
        })
        .catch(error=>{
            res.send("ERROR al pedir registros O3: ", error)
        });
        
    await registrosSO2.find()
        .then(data=>{
            registrosSO2_data = data
        })
        .catch(error=>{
            res.send("ERROR al pedir registros SO2: ", error)
        });

    res.json({
        registrosCO_data,
        registrosNO2_data,
        registrosO3_data,
        registrosSO2_data,
    })
}

//exportasmos el controlador
module.exports = {
    getData
}