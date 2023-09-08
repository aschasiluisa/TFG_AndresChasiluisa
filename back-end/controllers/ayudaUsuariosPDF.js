const path = require('path');

const getData = async (req,res) => {
    const rutaPDF = path.join(__dirname, '../assets', 'TFG-1-Propuesta_TFG_AndresChasiluisa-firmada-CCI.pdf');
    res.sendFile(rutaPDF);
}

//exportasmos el controlador
module.exports = {
    getData,
}