const express = require('express')
const contactoRouter = express.Router()

//llamada al controlador
const contactoController = require('../controllers/contacto')

//Get de la ruta RAIZ
contactoRouter.post('/contacto', contactoController.postContacto)

//exportasmos la ruta
module.exports = contactoRouter