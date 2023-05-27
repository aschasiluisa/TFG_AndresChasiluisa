//Se limpia la consola 
console.clear();

//Importación de librerias
const  express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

//llamada a las rutas
const indexRouter = require('./routes/index')

//llamada a la conexión de base de datos Mongo
const initMongo = require('./config/db')

//Declaración de variables
const app = express()
dotenv.config()

//middleware
app.use(express.json());
app.use(express.text());

//para configurar el cors y permitir llamadas desde local
app.use(cors());

//Señalización de rutas
app.use(indexRouter)

//se conecta con la base de datos Mongo
initMongo()

//Se levanta el servidor
app.listen(process.env.Port, () =>{
    console.log('Servidor iniciado en el puerto:', process.env.Port);
})

