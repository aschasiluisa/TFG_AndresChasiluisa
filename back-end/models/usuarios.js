const mongoose = require('mongoose')
Schema = mongoose.Schema

const UsuariosSchema = new Schema({
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
    Municipio: {
        type: String,
        enum: [
            'Garafía', 
            'Barlovento',
            'San Andrés y Sauces',
            'Puntallana',
            'Santa Cruz de La Palma',
            'Breña Alta',
            'Breña Baja',
            'Villa de Mazo',
            'Fuencaliente de La Palma',
            'Los Llanos de Aridane',
            'El Paso',
            'Tazacorte',
            'Tijarafe',
            'Puntagorda',
         ]
    },
    Usuario: {
        type: String,
        required: true,
        unique: true,
        index: true,
        max: 100
    },
    Mail: {
        type: String,
        unique: true,
        index: true,
        required: true,
    },
    Contraseña:{
        type: String,
        required: true
    },
    Rol:{
        type: Number,
        default: 0,
        enum: [
            0,
            1,
            5
        ],
        required: true
    }
}, {collection: "usuarios"});

module.exports = mongoose.model('usuariosSchema', UsuariosSchema);
