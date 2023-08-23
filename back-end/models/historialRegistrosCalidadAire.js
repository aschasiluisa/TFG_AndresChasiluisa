const mongoose = require('mongoose')
Schema = mongoose.Schema

const historialRegistrosCalidadAireSchema = new Schema({
	Nombre: {
		type: String,
		required: true,
		index: true, 
		max: 100
	},
	Fecha: {
		type: String,
		required: true,
		max: 100
	},
	Temperatura: {
		type: Number,
		required: true
	},
	Humedad: {
		type: Number,
		required: true
	},
	CO: {
		type: Number, 
		required: true,
		min: 0
	},
	NO2: {
		type: Number, 
		required: true,
		min: 0
	},
	O3: {
		type:Number, 
		required: true, 
		min:0
	},
	SO2: {
        type:Number, 
        required: true, 
        min:0
    },
	Latitud: {
		type: Number, 
		required: true
	},
	Longitud: {
		type: Number, 
		required: true
	}
}, {collection: "historial_registros_calidadAire"})

module.exports = mongoose.model('historialRegistrosCalidadAire', historialRegistrosCalidadAireSchema)