import nodemailer from 'nodemailer';

export const sendEmail = async (req, res) => {
    try {
        console.log("📩 Recibida petición:", req.body);

        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ ok: false, message: "Faltan datos" });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Nuevo mensaje de ${name}`,
            text: message,
        };

        console.log("🚀 Enviando correo...");
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Correo enviado:", info.response);

        return res.status(200).json({ ok: true, message: "Correo enviado correctamente" });
    } catch (error) {
        console.error("❌ Error enviando correo:", error);
        return res.status(500).json({ ok: false, message: "Error enviando correo", error });
    }
};
