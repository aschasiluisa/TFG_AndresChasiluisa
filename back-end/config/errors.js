//////////////////////////////////////////////////////////////
//ARCHIVO DE ERRORES JSON, PARA LA COMUNICACIÓN CON EL USUARIO
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////LISTA DE ERRORES JSON 

//Error en el servidor
const serverError =
{ 
    result : false,
    msg : "Server Error",
}

//Error de nombre de usuario repetido
const usernameError = 
{
    result : false,
    msg : "Username already exists",
}

//Error de mail repetido
const emailError =
{
    result : false,
    msg : "User email already exists",
}

//Error en el formato del mail
const emailFormatError =
{
    result : false,
    msg : "Wrong user email format",
}

//Error de credenciales incorrectas
const loginError = 
{
    result : false,
    msg : "Incorrect user or password"
}

//Error de token invalido
const tokenError = 
{
    result : false,
    msg : "Invalid token"
}

//Error de nombre de usuario no encontrado
const userFindError = 
{
    result : false,
    msg : "Failed to find user"
}

//Error de incidencia no encontrada
const incidenceFindError = 
{
    result : false,
    msg : "Failed to find incidence"
}

//Error de alarma no encontrada
const alarmFindError = 
{
    result : false,
    msg : "Failed to find incidence"
}

//Error de coordenadas fuera del terreno de la isla
const coorBboxError = {
    result : false,
    msg : "Coordinates outside the bbox",
}

//Error de formato de imagen incorrecto
const imageFormatError = {
    result : false,
    msg : "Wrong image file format",
}

//Error de valor de rango fuera de los limites
const rangoError = {
    result : false,
    msg : "Wrong rango value error",
}

//Error de campo obligatorio vacío
const emptyFieldError = {
    result : false,
    msg : "Mandatory Field empty",
}

//Exportación de objetos JSON
module.exports = {
    serverError,
    usernameError,
    emailError,
    emailFormatError,
    loginError,
    tokenError,
    userFindError,
    coorBboxError,
    imageFormatError,
    incidenceFindError,
    alarmFindError,
    rangoError,
    emptyFieldError,
}