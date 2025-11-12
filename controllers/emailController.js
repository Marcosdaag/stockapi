'use strict'

import nodemailer from 'nodemailer';

export const sendEmail = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ ok: false, message: 'Faltan datos.' });
    }

    try {
        // Configuración del transporte (para Gmail, por ejemplo)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,       // tu correo Gmail
                pass: process.env.EMAIL_PASS        // tu contraseña de aplicación
            },
        });

        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_USER,           // el correo donde vos recibís
            subject: `Nuevo mensaje de ${name}`,
            text: message,
            html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mensaje:</b><br/>${message}</p>
      `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ ok: true, message: 'Correo enviado correctamente.' });

    } catch (error) {
        console.error('Error enviando correo:', error);
        res.status(500).json({ ok: false, message: 'Error enviando correo.', error });
    }
};