const nodemailer = require('nodemailer')

const sendMail = (Mail, subject, mailBody) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER_NAME,
            pass: process.env.GMAIL_PASSWORD,
        }
    });
    var mailOptions = {
        from: 'TFG | La Palma',
        to: Mail,
        subject: subject,
        html: mailBody
    };
    
    transporter.sendMail(mailOptions,(err,res)=>{
        if(err){
            console.log(err);
        }
        else {
            console.log("mail enviado")
        }
    });
}

module.exports = sendMail