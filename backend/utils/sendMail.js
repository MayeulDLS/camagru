const nodemailer = require('nodemailer');

async function sendEmail(toEmail, subject, body) {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'mdelaserre75@gmail.com',
                pass: 'ytld rtjr qvxm prrk',
            },
        });

        let mailOptions = {
            from: '"Camagru de mde-la-s" <camagrumdelas@gmail.com>',
            to: toEmail,
            subject: subject,
            text: body,
        };

        let info = await transporter.sendMail(mailOptions);

        console.log('E-mail envoyé : %s', info.messageId);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    }
}

module.exports = { sendEmail };