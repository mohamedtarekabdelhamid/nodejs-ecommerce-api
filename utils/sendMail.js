const nodemailer = require('nodemailer')

const sendMail = async options => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOpts = {
        from: 'E-Commerce API App <tarekofficialmail@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOpts)
}

module.exports = sendMail