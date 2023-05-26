//Importación de librerias
const express = require('express')
const  indexRouter = express.Router()

//llamada al controlador
const indexController = require('../controllers/index')

//Declaración de variables
const app = express()

//Get de la ruta RAIZ
indexRouter.get('/', indexController.getData);


//exportasmos la ruta
module.exports = indexRouter