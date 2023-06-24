const express = require('express')
const  profileRouter = express.Router()
const tokenVerification = require('../middlewares/auth')

//llamada al controlador
const profileController = require('../controllers/profile')

//Post de la ruta signup
profileRouter.put('/profile', tokenVerification.tokenVerification, profileController.userUpdate)

profileRouter.get('/profile', tokenVerification.tokenVerification, profileController.getUserInfo)

//exportasmos la ruta
module.exports = profileRouter