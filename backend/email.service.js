import nodemailer from 'nodemailer'

export const sendResetPasswordEmail = async (email, token) => {
  // Configura el transportador de Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Tu correo electrónico
      pass: process.env.EMAIL_PASS, // Tu contraseña de correo electrónico
    },
  });

  // Configura el contenido del correo
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recuperación de Contraseña',
    text: `Para recuperar tu contraseña, usa el siguiente enlace: ${process.env.FRONTEND_URL}/reset-password?token=${token}`,
  };

  // Envía el correo
  await transporter.sendMail(mailOptions);
};
