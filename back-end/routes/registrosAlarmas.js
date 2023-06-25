const express = require('express')
const  registrosAlarmasRouter = express.Router()
const tokenVerification = require('../middlewares/auth')

//llamada al controlador
const registrosAlarmasController = require('../controllers/registrosAlarmas')

//Get de la ruta RAIZ
registrosAlarmasRouter.get('/registrosAlarmas', tokenVerification.tokenVerification, registrosAlarmasController.getData)

registrosAlarmasRouter.get('/registrosAlarmas/:id', tokenVerification.tokenVerification, registrosAlarmasController.getRegistro)

registrosAlarmasRouter.post('/registrosAlarmas', tokenVerification.tokenVerification, registrosAlarmasController.postRegistro)

registrosAlarmasRouter.put('/registrosAlarmas', tokenVerification.tokenVerification, registrosAlarmasController.resetRegistro)

registrosAlarmasRouter.delete('/registrosAlarmas/:id', tokenVerification.tokenVerification, registrosAlarmasController.deleteRegistro)

//exportasmos la ruta
module.exports = registrosAlarmasRouter