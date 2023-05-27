const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const RegistrosO3Schema = new Schema({
	Nombre: {
		type:String, 
		required: true, 
		max: 100
	},
	Fecha: {
		type:String, 
		required: true, 
		max: 100
	},
	Temperatura: {
		type:Number, 
		required: true
	},
	Humedad: {type:Number, 
		required: true
	},
	O3: {
		type:Number, 
		required: true, 
		min:0
	},
	Latitud: {
		type:Number, 
		required: true
	},
	Longitud: {
		type:Number, 
		required: true
	},
}, {collection: "registros_calidadAire_O3"});
	
module.exports = mongoose.model('registrosO3', RegistrosO3Schema);