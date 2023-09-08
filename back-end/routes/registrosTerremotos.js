const express = require('express')
const registrosTerremotosRouter = express.Router()

//llamada al controlador
const registrosTerremotosController = require('../controllers/registrosTerremotos')

//Get de la ruta RAIZ
registrosTerremotosRouter.get('/registrosTerremotos', registrosTerremotosController.getData)

//exportasmos la ruta
module.exports = registrosTerremotosRouter
