const express = require('express')
const ayudaUsuariosPDFRouter = express.Router()

//llamada al controlador
const ayudaUsuariosPDFController = require('../controllers/ayudaUsuariosPDF')

//Get de la ruta RAIZ
ayudaUsuariosPDFRouter.get('/ayudaUsuariosPDF', ayudaUsuariosPDFController.getData)

//exportasmos la ruta
module.exports = ayudaUsuariosPDFRouter