const express = require('express')
const  signupRouter = express.Router()

//llamada al controlador
const signupController = require('../controllers/signup')

//Post de la ruta signup
signupRouter.post('/signup',signupController.signup)

//exportasmos la ruta
module.exports = signupRouter