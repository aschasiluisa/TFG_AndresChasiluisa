const mongoose = require('mongoose')
Schema = mongoose.Schema

const RegistrosNO2Schema = new Schema({
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
	NO2: {
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
	}
}, {collection: "registros_calidadAire_NO2"});

module.exports = mongoose.model('registrosNO2', RegistrosNO2Schema);