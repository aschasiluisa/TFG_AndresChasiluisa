const express = require('express')
const  superAdminControlRouter = express.Router()
const tokenVerification = require('../middlewares/auth')

//llamada al controlador
const superAdminControlController = require('../controllers/superAdminControl')

superAdminControlRouter.get('/superAdminControl',tokenVerification, superAdminControlController.superAdminControl)

//Post de la ruta signup
superAdminControlRouter.put('/superAdminControl',tokenVerification, superAdminControlController.changeRole)

superAdminControlRouter.delete('/superAdminControl',tokenVerification, superAdminControlController.deleteUser)

//exportasmos la ruta
module.exports = superAdminControlRouter