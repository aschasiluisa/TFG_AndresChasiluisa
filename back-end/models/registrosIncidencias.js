const mongoose = require('mongoose')
Schema = mongoose.Schema

const registrosIncidenciasSchema = new Schema({
    Nombre: {
		type: String,
		required: false, 
		max: 100
	},
    Nombre_es: {
		type: String,
		required: false, 
		max: 100
	},
    Nombre_en: {
		type: String,
		required: false, 
		max: 100
	},
    Imagen: {
        data: Buffer,
        contentType: String,
    },
	Fecha: {
		type: String,
		required: true,
		max: 100
	},
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
    Descripcion: {
		type: String,
		required: false, 
		max: 1000
	},
    Descripcion_es: {
		type: String,
		required: false, 
		max: 1000
	},
    Descripcion_en: {
		type: String,
		required: false, 
		max: 1000
	},
    Latitud: {
		type: Number, 
		required: true
	},
	Longitud: {
		type: Number, 
		required: true
	},
    Usuario: {
        type: String,
        required: true,
        index: true,
        max: 100
    },
    Administrador: {
        type: String,
        max: 100
    },
    Validada: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {collection: "registros_incidencias"})

module.exports = mongoose.model('registrosIncidencias', registrosIncidenciasSchema)