//Importación de librerias
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

//Exportación
module.exports = () => {
    conexion()
}
