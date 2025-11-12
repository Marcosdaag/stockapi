import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await resend.emails.send({
      from: 'StockApp <onboarding@resend.dev>', // o dominio verificado
      to: 'marcosoffs99@gmail.com',
      subject: `Nuevo mensaje de ${name}`,
      html: `<p><strong>Nombre:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mensaje:</strong> ${message}</p>`
    });

    res.json({ ok: true, mensaje: 'Correo enviado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, mensaje: 'Error al enviar el correo.' });
  }
};
