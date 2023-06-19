const express = require('express')
const  registrosCalidadAireRouter = express.Router()

//llamada al controlador
const registrosCalidadAireController = require('../controllers/registrosCalidadAire')

//Get de la ruta RAIZ
registrosCalidadAireRouter.get('/registrosCalidadAire', registrosCalidadAireController.getData)


//exportasmos la ruta
module.exports = registrosCalidadAireRouter