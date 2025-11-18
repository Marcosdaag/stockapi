import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;
  const appName = process.env.APP_NAME;

  console.log("Variable APP_NAME leída:", appName);

  try {
    await resend.emails.send({
      from: `${appName} <onboarding@resend.dev>`,
      to: 'marcosoffs99@gmail.com',
      subject: `"${appName}" Nuevo mensaje de ${name}`,
      html: `<p><strong>Nombre:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mensaje:</strong> ${message}</p>
             <br>
             <small>Enviado desde: ${appName}</small>`
    });
    res.json({ ok: true, mensaje: 'Correo enviado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, mensaje: 'Error al enviar el correo.' });
  }
};
