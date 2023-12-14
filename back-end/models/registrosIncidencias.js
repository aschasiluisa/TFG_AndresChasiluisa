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
            'OBR',
            'OLA'
         ]
    },
    Descripcion: {
		type: String,
		required: false, 
		max: 300
	},
    Descripcion_es: {
		type: String,
		required: false, 
		max: 300
	},
    Descripcion_en: {
		type: String,
		required: false, 
		max: 300
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
    },
    Origen: {
        type: String,
        required: true,
        enum: [
            'DGT', 
            'APP',
        ],
    },
    Code:{
        type: Number, 
        index: true,
    }
}, {collection: "registros_incidencias"})

module.exports = mongoose.model('registrosIncidencias', registrosIncidenciasSchema)