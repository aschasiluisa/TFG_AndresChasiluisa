///////////////////////////////////////////
//ARCHIVO DE CONFIGURACIÓN Y ENVÍO DE MAILS
///////////////////////////////////////////

//Importación de librería
const nodemailer = require('nodemailer')

//Importación de modelos
const usuarios = require('../models/usuarios')
const registrosIncidencias = require('../models/registrosIncidencias')

//Diccionario de código y nombres de tipo de incidencia
const typeIncidence =
{
    'ACC': { name_es: 'Accidente de Trafico', name_en: 'Traffic Accident'},
    'DER': { name_es: 'Derrumbe', name_en: 'Landslide'},
    'INC': { name_es: 'Incendio', name_en: 'Fire'},
    'INU': { name_es: 'Inundación', name_en: 'Flood'},
    'CAL': { name_es: 'Calima', name_en: 'Calima'},
    'ERU': { name_es: 'Erupción', name_en: 'Rash'},
    'ESC': { name_es: 'Escape de gases', name_en: 'Gas exhaust'},
    'OLA': { name_es: 'Alto oleaje', name_en: 'High swell'},
    'OBR': { name_es: 'Obras', name_en: 'Works'},
    'OTR': { name_es: 'Otro', name_en: 'Other'},
};

//Función de envío de mails
const sendMail = async(Mail, subject, mailBody) => {

    //Creación de conexión con el servicio de correos
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER_NAME,
            pass: process.env.GMAIL_PASSWORD,
        }
    });

    //Opciones de envíos de mails
    var mailOptions = {
        from: 'TFG | La Palma',
        to: Mail,
        subject: subject,
        html: mailBody
    };
    
    //Envío de mail diseñado
    transporter.sendMail(mailOptions,(err,res)=>{
        if(err){
            console.log(err);
        }
        else {
            console.log("mail enviado")
        }
    });
}

//Construcción de mensaje de activación para procesos de alarmas
const alarmaActivada_v1 = async (alarmaActivada, incidenciasCercanas) => {

    //Obtención de datos del usuario receptor del mail
    const usuario = await usuarios.findOne({Usuario: alarmaActivada.usuario}).select('Mail Nombre Apellido');

    //Bloque de construcción del mail
    if (usuario.Mail){
        for (let i = 0; i < incidenciasCercanas.length; i++) {
            sendMail(usuario.Mail, "Alerta!!! incidencdia detectada", 
            `<p>`+
                "Hola "+usuario.Nombre+" "+usuario.Apellido+","+`<br> <br>`+
                "Su alerta con nombre "+alarmaActivada.nombre+" ha sido activada por una incidencia a "+incidenciasCercanas[i].distancia+" m, con los siguientes datos:"+`<br>  &emsp;`+
                    `<strong>`+" nombre = "+`</strong>`+incidenciasCercanas[i].nombre_es+`<br>  &emsp;`+
                    `<strong>`+" tipo = "+`</strong>`+typeIncidence[incidenciasCercanas[i].tipo].name_es+`<br>  &emsp;`+
                    `<strong>`+"descripcion = "+`</strong>`+incidenciasCercanas[i].descripcion_es+`<br> <br>`+
                    "gracias por su colaboración. Un saludo,"+`<br> <br>`+
                    `<strong>`+"TFG | La Palma"+`</strong>`+
            `</p>`+`<br> <hr> <br>`+
            `<p>`+
                "Hello "+usuario.Nombre+" "+usuario.Apellido+","+`<br> <br>`+
                "Your alert "+alarmaActivada.nombre+" was activated by a incedence "+incidenciasCercanas[i].distancia+" m away, with the following data:"+`<br>  &emsp;`+
                    `<strong>`+" name = "+`</strong>`+incidenciasCercanas[i].nombre_en+`<br>  &emsp;`+
                    `<strong>`+" type = "+`</strong>`+typeIncidence[incidenciasCercanas[i].tipo].name_en+`<br>  &emsp;`+
                    `<strong>`+"description = "+`</strong>`+incidenciasCercanas[i].descripcion_en+`<br> <br>`+
                    "Thank you for your cooperation. All the best,"+`<br> <br>`+
                    `<strong>`+"TFG | La Palma"+`</strong>`+
            `</p>`
            )
        }
    }
}

//Construcción de mensaje de activación para procesos de incidencias
const alarmaActivada_v2 = async (alarmaActivada, incidenciaCercana) => {

    //Obtención de datos del usuario receptor del mail
    const usuario = await usuarios.findOne({Usuario: alarmaActivada.usuario}).select('Mail Nombre Apellido');

    //Bloque de construcción del mail
    if (usuario.Mail){
        sendMail(usuario.Mail, "Alerta!!! incidencdia detectada", 
        `<p>`+
            "Hola "+usuario.Nombre+" "+usuario.Apellido+","+`<br> <br>`+
            "Su alerta con nombre "+alarmaActivada.nombre+" ha sido activada por una incidencia a "+alarmaActivada.distancia+" m, con los siguientes datos:"+`<br>  &emsp;`+
                `<strong>`+" nombre = "+`</strong>`+incidenciaCercana.nombre_es+`<br>  &emsp;`+
                `<strong>`+" tipo = "+`</strong>`+typeIncidence[incidenciaCercana.tipo].name_es+`<br>  &emsp;`+
                `<strong>`+"descripcion = "+`</strong>`+incidenciaCercana.descripcion_es+`<br> <br>`+
                "gracias por su colaboración. Un saludo,"+`<br> <br>`+
                `<strong>`+"TFG | La Palma"+`</strong>`+
        `</p>`+`<br> <hr> <br>`+
        `<p>`+
            "Hello "+usuario.Nombre+" "+usuario.Apellido+","+`<br> <br>`+
            "Your alert "+alarmaActivada.nombre+" was activated by a incedence "+alarmaActivada.distancia+" m away, with the following data:"+`<br>  &emsp;`+
                `<strong>`+" name = "+`</strong>`+incidenciaCercana.nombre_en+`<br>  &emsp;`+
                `<strong>`+" type = "+`</strong>`+typeIncidence[incidenciaCercana.tipo].name_en+`<br>  &emsp;`+
                `<strong>`+"description = "+`</strong>`+incidenciaCercana.descripcion_en+`<br> <br>`+
                "Thank you for your cooperation. All the best,"+`<br> <br>`+
                `<strong>`+"TFG | La Palma"+`</strong>`+
        `</p>`
        )
    }
}

//Construcción de mensaje de validación a incidencias
const incidenciaValidada = async (incidencia) => {
    
    //Obtención del nombre del usuario guardado en la incidencia
    const nombreUsuario = await registrosIncidencias.findById(incidencia.id).select('Usuario');

    if(nombreUsuario.Usuario){
        
        //Obtención de datos del usuario receptor del mail
        const usuario = await usuarios.findOne({Usuario: nombreUsuario.Usuario}).select('Mail Nombre Apellido');

        //Bloque de construcción del mail
        if (usuario.Mail){
            sendMail(usuario.Mail, "Incidencia validada", 
                `<p>`+
                    "Hola "+usuario.Nombre+" "+usuario.Apellido+","+`<br> <br>`+
                    "su Incidencia ha sido validada como: "+`<br>  &emsp;`+
                        `<strong>`+" nombre = "+`</strong>`+incidencia.nombre_es+`<br>  &emsp;`+
                        `<strong>`+" tipo = "+`</strong>`+typeIncidence[incidencia.tipo].name_es+`<br>  &emsp;`+
                        `<strong>`+"descripcion = "+`</strong>`+incidencia.descripcion_es+`<br> <br>`+
                        "gracias por su colaboración. Un saludo,"+`<br> <br>`+
                        `<strong>`+"TFG | La Palma"+`</strong>`+
                `</p>`+`<br> <hr> <br>`+
                `<p>`+
                    "Hello "+usuario.Nombre+" "+usuario.Apellido+","+`<br> <br>`+
                    "Your Incident has been validated as: "+`<br>  &emsp;`+
                        `<strong>`+" name = "+`</strong>`+incidencia.nombre_en+`<br>  &emsp;`+
                        `<strong>`+" type = "+`</strong>`+typeIncidence[incidencia.tipo].name_en+`<br>  &emsp;`+
                        `<strong>`+"description = "+`</strong>`+incidencia.descripcion_en+`<br> <br>`+
                        "Thank you for your cooperation. All the best,"+`<br> <br>`+
                        `<strong>`+"TFG | La Palma"+`</strong>`+
                `</p>`
                )
        }
    }
}

//Construcción de mensaje de rechazo a incidencias
const incidenciaRechazada = async (id, nombre) => {
    
    //Obtención del nombre del usuario guardado en la incidencia
    const nombreUsuario = await registrosIncidencias.findById(id).select('Usuario');

    if(nombreUsuario.Usuario){

        //Obtención de datos del usuario receptor del mail
        const usuario = await usuarios.findOne({Usuario: nombreUsuario.Usuario}).select('Mail Nombre Apellido');

        //Bloque de construcción del mail
        if (usuario.Mail){
            sendMail(usuario.Mail, "Propuesta de incidencia rechazada", 
                `<p>`+
                    "Hola "+usuario.Nombre+" "+usuario.Apellido+","+`<br> <br>`+
                    "su propuesta de Incidencia con nombre "+nombre+", ha sido rechazada."+`<br> <br>`+
                        "gracias por su colaboración. Un saludo,"+`<br> <br>`+
                        `<strong>`+"TFG | La Palma"+`</strong>`+
                `</p>`+`<br> <hr> <br>`+
                `<p>`+
                    "Hello "+usuario.Nombre+" "+usuario.Apellido+","+`<br> <br>`+
                    "your incidence proposal,  "+nombre+" call, has been rejected."+`<br> <br>`+
                        "Thank you for your cooperation. All the best,"+`<br> <br>`+
                        `<strong>`+"TFG | La Palma"+`</strong>`+
                `</p>`
            )
        }
    }
}

//Construcción de mensaje de contacto y mensaje de confirmación para administrador y usuario
const contactoyConfirmacion = async (mail, nombre, apellido, asunto, mensaje, mailsuper) =>  {

    //Envió de mail de confirmación a usuario
    await sendMail(mail, "Mensaje de contacto recibido", 
                `<p>`+
                    "Hola "+nombre+" "+apellido+","+`<br> <br>`+
                    "su mensaje de coontacto ha sido recibido."+`<br> <br>`+
                        "gracias por su colaboración. Un saludo,"+`<br> <br>`+
                        `<strong>`+"TFG | La Palma"+`</strong>`+
                `</p>`+`<br> <hr> <br>`+
                `<p>`+
                    "Hello "+nombre+" "+apellido+","+`<br> <br>`+
                    "your contact message was received."+`<br> <br>`+
                        "Thank you for your cooperation. All the best,"+`<br> <br>`+
                        `<strong>`+"TFG | La Palma"+`</strong>`+
                `</p>`
    )

    //Envió de petición de contacto al superadministrador
    sendMail(mailsuper, "Nuevo contacto: "+asunto, 
            `<p>`+
                "Mensaje de "+nombre+" "+apellido+", con correo electronico "+mail+`<br> <br> &emsp;`+
                `<strong>`+"Texto enviado"+`</strong> <br>`+
                mensaje+`<br> <br>`+
                "Un saludo,"+`<br> <br>`+
                `<strong>`+"TFG | La Palma"+`</strong>`+
            `</p>`
    )
}

//Exportación de funciones de envió de mails
module.exports = {
    alarmaActivada_v1,
    alarmaActivada_v2,
    incidenciaValidada,
    incidenciaRechazada,
    contactoyConfirmacion
}