const mongoose = require('mongoose')
Schema = mongoose.Schema

const peticionesContactoSchema = new Schema({

    Nombre: {
		type: String,
		required: true, 
        index: true,
		max: 100
	},
    Apellido: {
        type: String,
		required: true, 
		max: 100
    },
    Mail: {
        type: String,
        index: true,
        required: true,
    },
    Asunto: {
        type: String,
        required: true,
        enum: [
            'Ayuda', 
            'Fallo',
            'Funcionalidad',
            'Colaboración',
            'Otro',
         ]
    },
    Mensaje: {
        type: String,
        required: true,
        max: 1000
    },
}, {collection: "peticiones_contacto"})

module.exports = mongoose.model('peticionesContacto', peticionesContactoSchema);