import nodemailer = require("nodemailer");



const sendResetMail = async (email:string, url:string, name:string) => {

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASSWORD
        }
    });

    const mailDetails = {
        from : "cacophone@mail.app",
        to:email,
        subject:"Cacophone password reset",
        html:`
        <div>
        <h1>Hi ${name}</h1>
        <p>Click this <a href=${url}>link</a> to reset password.</p>
        <p>The password reset link is valid for five minutes.</p>
        </div>
        `
    }

    const sent = await transporter.sendMail(mailDetails)
    return sent
}

export default sendResetMail