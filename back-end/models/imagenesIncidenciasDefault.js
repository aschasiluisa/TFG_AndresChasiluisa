const mongoose = require('mongoose')
Schema = mongoose.Schema

const ImagenesDefaultSchema = new Schema({
    Tipo: {
        type: String,
        required: true,
        enum: [
            'Accidente de Trafico', 
            'Derrumbe',
            'Incendio',
            'Inundación',
            'Calima',
            'Erupción',
            'Escape de gases',
            'Otro',
         ]
    },
    Imagen: {
        data: Buffer,
        contentType: String,
    },
}, {collection: "imagenes_incidencias_default"});

module.exports = mongoose.model('ImagenesDefault', ImagenesDefaultSchema);