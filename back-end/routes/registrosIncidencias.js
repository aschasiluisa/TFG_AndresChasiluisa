const express = require('express')
const registrosIncidenciasRouter = express.Router()
const tokenVerification = require('../middlewares/auth')

//llamada al controlador
const registrosIncidenciasController = require('../controllers/registrosIncidencias')

//Get de la ruta RAIZ
registrosIncidenciasRouter.get('/registrosIncidencias', tokenVerification.tokenVerificationNext, registrosIncidenciasController.getData)

registrosIncidenciasRouter.get('/registrosIncidencias/:id', registrosIncidenciasController.getRegistro)

registrosIncidenciasRouter.post('/registrosIncidencias', tokenVerification.tokenVerification, registrosIncidenciasController.postRegistro)

registrosIncidenciasRouter.put('/registrosIncidencias', tokenVerification.tokenVerification, registrosIncidenciasController.updateRegistro)

registrosIncidenciasRouter.delete('/registrosIncidencias/:id', tokenVerification.tokenVerification, registrosIncidenciasController.deleteRegistro)

//exportasmos la ruta
module.exports = registrosIncidenciasRouter