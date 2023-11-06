//Importación de los modelos de datos 
const registrosCalidaAire = require('../models/registrosCalidadAire')
const historialRegistrosCalidaAire = require('../models/historialRegistrosCalidadAire')
const jsonError = require('../config/errors')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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

const getHistorialRegistro = async (req,res) => {
    const id = req.params.id;
    const idioma = req.get('idioma');

    if(id && idioma){
        try{
            const estacionNombre = await registrosCalidaAire.findById(id).select('Nombre')

            if(estacionNombre){
                const archivo = await historialRegistrosCalidaAire.find({ Nombre : estacionNombre.Nombre}).select('Fecha Temperatura Humedad CO NO2 O3 SO2')

                if(archivo){
                    const  nombreArchivo = "assets/hitorialRegistros_logHistory";
                    let csvWriter;

                    if (idioma === 'es'){
                        // Crear el archivo CSV
                        csvWriter = createCsvWriter({
                            path: nombreArchivo,
                            header: [
                                { id: 'Fecha', title: 'Fecha' },
                                { id: 'Temperatura', title: 'Temperatura' },
                                { id: 'Humedad', title: 'Humedad' },
                                { id: 'CO', title: 'CO' },
                                { id: 'NO2', title: 'NO2' },
                                { id: 'O3', title: 'O3' },
                                { id: 'SO2', title: 'SO2' },
                            ],
                        });

                    } else {
                        csvWriter = createCsvWriter({
                            path: nombreArchivo,
                            header: [
                                { id: 'Fecha', title: 'Date' },
                                { id: 'Temperatura', title: 'Temperature' },
                                { id: 'Humedad', title: 'Humedity' },
                                { id: 'CO', title: 'CO' },
                                { id: 'NO2', title: 'NO2' },
                                { id: 'O3', title: 'O3' },
                                { id: 'SO2', title: 'SO2' },
                            ],
                        });
                    }
    
                    // Escribir los datos en el archivo CSV
                    csvWriter.writeRecords(archivo)
                    .then(() => {
                        // Enviar el archivo CSV como respuesta de la solicitud
                        res.download(nombreArchivo);
                    });
                }  else {
                    res.status(200).json(jsonError.serverError)
                }
    
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
    getRegistro,
    getHistorialRegistro
}