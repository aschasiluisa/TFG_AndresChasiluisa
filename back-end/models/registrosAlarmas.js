const mongoose = require('mongoose')
Schema = mongoose.Schema

const registrosAlarmasSchema = new Schema({

    Nombre: {
		type: String,
		required: true, 
		max: 100
	},
    Rango: {
		type: Number,
		required: true,
        min: 99,
        max: 3001,
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
    Activada: {
        type: Boolean,
        required: true,
		default: false
    }

}, {collection: "registros_alarmas"})

module.exports = mongoose.model('registrosAlarmas', registrosAlarmasSchema);