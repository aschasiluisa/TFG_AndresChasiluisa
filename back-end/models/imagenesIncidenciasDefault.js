const mongoose = require('mongoose')
Schema = mongoose.Schema

const ImagenesDefaultSchema = new Schema({
    Tipo: {
        type: String,
        required: true,
        enum: [
            'ACC', 
            'DER',
            'INC',
            'INU',
            'CAL',
            'ERU',
            'ESC',
            'OTR',
         ]
    },
    Imagen: {
        data: Buffer,
        contentType: String,
    },
}, {collection: "imagenes_incidencias_default"});

module.exports = mongoose.model('ImagenesDefault', ImagenesDefaultSchema);