////////////////////////////////////////////////////////////////////////////////
//CONTROLADOR DE PROCESOS PARA LA VISUALIZACIÓN DEL ARCHIVO DE AYUDA DE USUARIOS
////////////////////////////////////////////////////////////////////////////////

//Importación de librería
const path = require('path');

//Proceso de visualización y servicio del archivo de ayuda
const getData = async (req,res) => {
    const rutaPDF = path.join(__dirname, '../assets', 'memoriaAndresChasiluisa.pdf'); //Actualmente conecta con la memoria del proyecto
    res.sendFile(rutaPDF);
}

//Exportación de procesos
module.exports = {
    getData,
}