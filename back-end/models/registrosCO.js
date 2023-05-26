var mongoose = require('mongoose')
Schema = mongoose.Schema

var RegistrosCOSchema = new Schema({
	Nombre: {
		type: String,
		 required: true, 
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
	Latitud: {
		type: Number, 
		required: true
	},
	Longitud: {
		type: Number, 
		required: true
	},
}, {collection: "registros_calidadAire_CO"})

module.exports = mongoose.model('RegistrosCO', RegistrosCOSchema)