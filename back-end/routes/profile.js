const express = require('express')
const  profileRouter = express.Router()
const tokenVerification = require('../middlewares/auth')

//llamada al controlador
const profileController = require('../controllers/profile')

//Post de la ruta signup
profileRouter.put('/profile', tokenVerification, profileController.userUpdate)

//exportasmos la ruta
module.exports = profileRouter