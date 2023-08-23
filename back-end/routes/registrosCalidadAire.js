const express = require('express')
const  registrosCalidadAireRouter = express.Router()
const tokenVerification = require('../middlewares/auth')

//llamada al controlador
const registrosCalidadAireController = require('../controllers/registrosCalidadAire')

//Get de la ruta RAIZ
registrosCalidadAireRouter.get('/registrosCalidadAire', registrosCalidadAireController.getData)

registrosCalidadAireRouter.get('/registrosCalidadAire/:id', registrosCalidadAireController.getRegistro)

registrosCalidadAireRouter.get('/historialRegistrosCalidadAire/:id', tokenVerification.tokenVerification, registrosCalidadAireController.getHistorialRegistro)

//exportasmos la ruta
module.exports = registrosCalidadAireRouter