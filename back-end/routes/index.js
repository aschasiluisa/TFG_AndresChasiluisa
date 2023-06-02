//Importación de librerias
const express = require('express')
const  indexRouter = express.Router()

//llamada al controlador
const indexController = require('../controllers/index')

//Get de la ruta RAIZ
indexRouter.get('/', indexController.getData)


//exportasmos la ruta
module.exports = indexRouter