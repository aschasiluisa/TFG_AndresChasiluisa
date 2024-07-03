/////////////////////////////////////////////////////////////////
//ARCHIVO DE CONFIGURACIÓN DE CONEXIÓN CON LA BASE DE DATOS MONGO
/////////////////////////////////////////////////////////////////

//Importación de librerías
const mongoose = require('mongoose')

//Función de conexión a la base de datos Mongo
const conexion = () => {
    
    mongoose.connect(
        process.env.DB_MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true

        },
    ).then(()=>{
        console.log("CONEXION DBMONGO")
    })
    .catch((error)=>{
    console.log("ERROR CONEXION DBMONGO: ",error);
    });
    
};

//Exportación de la función
module.exports = () => {
    conexion()
}
