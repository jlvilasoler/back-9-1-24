import nodemailer from 'nodemailer';
import express from 'express'; // Make sure to import Express if not already done

const app = express(); // Assuming you have an instance of Express

async function sendMailinfo(res, resetLink) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'brennon94@ethereal.email',
      pass: 'MbdJp76rRsUTma6bTW'
    }
  });

  try {
    const message = {
      from: 'sender@server.com',
      to: 'brennon94@ethereal.email',
      subject: 'Tiendaonline.uy - purchase',
      text: `Your payment of: ${'ddd'}`,
      html: `<p>sdsdsdsdsdsdsdsdsdsdsds: <a href="${resetLink}">sdsdsd sdsdsd</a></p>`
    };

    await transporter.sendMail(message);
    res.send('Hemos enviado un mail a su correo electronico con la información de su compra');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
}

export default sendMailinfo;