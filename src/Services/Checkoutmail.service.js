import nodemailer from 'nodemailer';

const sendEmailInfo = async (to, text) => {
  try {
    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.mail,
        pass: process.env.pass,
      },
    });

    const mailDetails = {
      from: {
        name: 'TiendaOnline.uy',
        address: process.env.mail,
      },
      to: `${to}`,
      subject: 'TiendaOnline.uy | New purchase',
      text: `${text}`,
    };

    const info = await mailTransporter.sendMail(mailDetails);
    console.log('Email enviado correctamente:', info);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

export default sendEmailInfo;