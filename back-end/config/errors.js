
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

module.exports = {
    serverError,
    usernameError,
    emailError,
    emailFormatError,
    loginError,
    tokenError
}