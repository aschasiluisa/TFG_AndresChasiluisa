const express = require('express')
const  loginRouter = express.Router()

//llamada al controlador
const loginController = require('../controllers/login')

//Post de la ruta signup
loginRouter.post('/login',loginController.login)

//exportasmos la ruta
module.exports = loginRouter