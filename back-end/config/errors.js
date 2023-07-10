
const serverError =
{ 
    result : false,
    msg : "Server Error",
}


const usernameError = 
{
    result : false,
    msg : "Username already exists",
}

const emailError =
{
    result : false,
    msg : "User email already exists",
}

const emailFormatError =
{
    result : false,
    msg : "Wrong user email format",
}

const loginError = 
{
    result : false,
    msg : "Incorrect user or password"
}

const tokenError = 
{
    result : false,
    msg : "Invalid token"
}

const userFindError = 
{
    result : false,
    msg : "Failed to find user"
}

const incidenceFindError = 
{
    result : false,
    msg : "Failed to find incidence"
}

const alarmFindError = 
{
    result : false,
    msg : "Failed to find incidence"
}

const coorBboxError = {
    result : false,
    msg : "Coordinates outside the bbox",
}

const imageFormatError = {
    result : false,
    msg : "Wrong image file format",
}

const rangoError = {
    result : false,
    msg : "Wrong rango value error",
}

const emptyFieldError = {
    result : false,
    msg : "Mandatory Field empty",
}

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