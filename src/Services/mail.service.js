import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

async function sendMail(res, resetLink) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ashleigh78@ethereal.email',
            pass: 'vr7smwKcM4KhEjyzmD'
        }
    });

        // Obtiene SECRET_KEY en variable entorno
        const secretKey = process.env.SECRET_KEY;
        // Genera un token con un tiempo de expiración de 1 hora
        const token = jwt.sign({}, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Datos del mensaje a enviar
    const message = {
        from: "sender@server.com",
        to: "ashleigh78@ethereal.email",
        subject: "PASSWORD CHANGE EMAIL",
        text: `Click the following link to reset your password: ${`http://localhost:8080/recover`}`,
        html: `<p>Click the following link to reset your password: <a href="${`http://localhost:8080/recover`}">RESET PASSWORD</a></p>`
    };

    try {
        // Intenta enviar el correo electrónico y espera la promesa
        await transporter.sendMail(message);
        res.send('We sent you an email to your inbox. Please check your email and follow the link to reset your password.');
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante el envío del correo electrónico
        console.error("Error sending mail:", error);
        res.status(500).send("Error sending mail");
    }
}

export default sendMail;