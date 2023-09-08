//Importación de los modelos de datos 
const jsonError = require('../config/errors')

const terremotos = require('../public/terremotosCAN')

// traer datos
const getData = async (req,res) => {

    const periodos = ["dias3", "dias15", "dias90"];
    const bbox = [28.384151, -18.102722, 28.926439, -17.620697];

    let periodo = req.get('periodo');

    let terremotos_laPalma = [];
    
    if(periodo && periodos.includes(periodo)){

        if(periodo == periodos[0]){
            for(let i = 0; i < terremotos.dias3.features.length; i++){
                const lat = terremotos.dias3.features[i].geometry.coordinates[1];
                const lon = terremotos.dias3.features[i].geometry.coordinates[0];

                if( bbox[0] < lat && lat < bbox[2] && bbox[1] < lon && lon < bbox[3]){
                    terremotos_laPalma.push({ lat: lat, lon: lon, mag: parseFloat(terremotos.dias3.features[i].properties.mag)})
                }
            }
            res.json({ result: true, data: terremotos_laPalma });
        }

        if(periodo == periodos[1]){
            for(let i = 0; i < terremotos.dias15.features.length; i++){
                const lat = terremotos.dias15.features[i].geometry.coordinates[1];
                const lon = terremotos.dias15.features[i].geometry.coordinates[0];

                if( bbox[0] < lat && lat < bbox[2] && bbox[1] < lon && lon < bbox[3]){
                    terremotos_laPalma.push({ lat: lat, lon: lon, mag: parseFloat(terremotos.dias15.features[i].properties.mag)})
                }
            }
            res.json({ result: true, data: terremotos_laPalma });
        }

        if(periodo == periodos[2]){
            for(let i = 0; i < terremotos.dias90.features.length; i++){
                const lat = terremotos.dias90.features[i].geometry.coordinates[1];
                const lon = terremotos.dias90.features[i].geometry.coordinates[0];

                if( bbox[0] < lat && lat < bbox[2] && bbox[1] < lon && lon < bbox[3]){
                    terremotos_laPalma.push({ lat: lat, lon: lon, mag: parseFloat(terremotos.dias90.features[i].properties.mag)})
                }
            }
            res.json({ result: true, data: terremotos_laPalma });
        }

    } else {
        res.status(200).json(jsonError.serverError)
    }    
}

//exportasmos el controlador
module.exports = {
    getData,
}