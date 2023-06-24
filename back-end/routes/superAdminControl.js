const express = require('express')
const  superAdminControlRouter = express.Router()
const tokenVerification = require('../middlewares/auth')

//llamada al controlador
const superAdminControlController = require('../controllers/superAdminControl')

superAdminControlRouter.get('/superAdminControl',tokenVerification.tokenVerification, superAdminControlController.superAdminControl)

//Post de la ruta signup
superAdminControlRouter.put('/superAdminControl',tokenVerification.tokenVerification, superAdminControlController.changeRole)

superAdminControlRouter.delete('/superAdminControl',tokenVerification.tokenVerification, superAdminControlController.deleteUser)

//exportasmos la ruta
module.exports = superAdminControlRouter