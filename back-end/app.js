//Se limpia la consola 
console.clear();

//Importación de librerias
const  express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const fileUpload = require('express-fileupload')

//llamada a las rutas
const registrosCalidadAireRouter = require('./routes/registrosCalidadAire')
const signupRouter = require('./routes/signup')
const loginRouter = require('./routes/login')
const profileRouter = require('./routes/profile')
const logoutRouter = require('./routes/logout')
const superAdminControlRouter = require('./routes/superAdminControl')
const registrosIncidenciasRouter = require('./routes/registrosIncidencias')
const registrosAlarmasRouter = require('./routes/registrosAlarmas')
const registrosTerremotosRouter = require('./routes/registrosTerremotos')
const contactoRouter = require('./routes/contacto')

//llamada a la conexión de base de datos Mongo
const initMongo = require('./config/db');

//Declaración de variables
const app = express()
dotenv.config()

//middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}))

app.use(fileUpload({
    limits: { filesize: 50 * 1024 * 1024 },
}))

//para configurar el cors y permitir llamadas desde local
app.use(cors());

//Señalización de rutas
app.use(registrosCalidadAireRouter)
app.use(signupRouter)
app.use(loginRouter)
app.use(profileRouter)
app.use(logoutRouter)
app.use(superAdminControlRouter)
app.use(registrosIncidenciasRouter)
app.use(registrosAlarmasRouter)
app.use(contactoRouter)
app.use(registrosTerremotosRouter)

//se conecta con la base de datos Mongo
initMongo()

//Se levanta el servidor
app.listen(process.env.Port, () =>{
    console.log('Servidor iniciado en el puerto:', process.env.PORT);
})

