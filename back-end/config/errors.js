
const serverError =
{ 
    result : false,
    type : 0, 
    msg : "Server Error",
}


const usernameError = 
{
    result : false,
    type : 1,
    msg : "Username already exists",
}

const emailError =
{
    result : false,
    type : 2,
    msg : "User email already exists",
}

const emailFormatError =
{
    result : false,
    type : 3,
    msg : "Wrong user email format",
}

const loginError = 
{
    result : false,
    type : 4,
    msg : "Incorrect user or password"
}

const tokenError = 
{
    result : false,
    type : 5,
    msg : "Invalid token"
}

module.exports = {
    serverError,
    usernameError,
    emailError,
    emailFormatError,
    loginError,
    tokenError
}