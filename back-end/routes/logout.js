const express = require('express')
const  logoutRouter = express.Router()
const tokenVerification = require('../middlewares/auth')

//llamada al controlador
const logoutController = require('../controllers/logout')

//Post de la ruta signup
logoutRouter.delete('/logout',tokenVerification.tokenVerification,logoutController.logout)

//exportasmos la ruta
module.exports = logoutRouter