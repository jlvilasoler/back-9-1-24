import nodemailer from 'nodemailer';

async function sendMailinfo() {
  try {
    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.mail,
        pass: process.env.pass,
      }
    });

    let mailDetails = {
      from: 'jlvilasoler@gmail.com',
      to: 'jlvilasoler@hotmail.com',
      subject: 'Test mail',
      text: 'Correo electrónico de prueba desde Node.js'
    };

    let info = await mailTransporter.sendMail(mailDetails);
    console.log('Correo electrónico enviado correctamente:', info.response);
  } catch (err) {
    console.error('Se produjo un error:', err.message);
    throw err;
  }
}

export default sendMailinfo;