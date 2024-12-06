import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { format } from "date-fns";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// Controllers para login y register

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Valisamos si el usuario existe , hacemos query a la base de datos del correo
    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    // Si el usuario que encontro es igual a 0 caracteres mandaremos error haciendo referencia a que el correo o la contraseña es incorrecto, en esta parte solo se valida el correo
    if (user.length === 0) {
      return res.status(401).json({
        message: "Email o contraseña incorrectos",
      });
    }

    // validamos a traves de bcrypt que la contraseña ingresada sea la misma del usuario en la base de datos y creamos una instancia de validPassword
    const validPassword = await bcrypt.compare(password, user[0].password);

    // Si no se creo validPassword es porque las contraseñas comparadas no son iguales , por lo tanto la contraseña esta mal ingresada y se le manda mensaje al usuario de Email o contraseña erroneos
    if (!validPassword) {
      return res.status(401).json({
        message: "Email o contraseña incorrectos",
      });
    }

    // Generamos el token con JWT y nuestra clave secreta env
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email, rol: user[0].rol },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token, message: "Inicio de sesion exitoso" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const registerUser = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    if (!nombre || !email || !password) {
      return res
        .status(400)
        .json({ message: "Nombre, email y contraseña son requeridos" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [userRegister] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (userRegister.length > 0) {
      return res.json({
        message: "El usuario ya esta registrado en la base de datos",
      });
    } else {
      await pool.query(
        "INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)",
        [nombre, email, hashedPassword]
      );
      res.json("Usuario ingresado exitosamente");
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Controllers para olvido de contraseña

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (user.length === 0) {
    return res.status(401).json({
      message: "El email ingresado no pertenece a un usuario",
    });
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000); // Código de 6 dígitos

  // Crear una fecha de expiración correcta para MySQL
  const expirationDate = new Date(Date.now() + 3600000); // 1 hora desde ahora
  const formattedExpirationDate = format(expirationDate, "yyyy-MM-dd HH:mm:ss");

  // Crear token de seguridad para el usuario
  const token = jwt.sign({ id: user[0].id, email: user[0].email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  console.log("Generated token:", token);

  // Actualizar la tabla de usuarios con el código de recuperación y la fecha de expiración
  await pool.query(
    "UPDATE users SET code_user_password = ?, reset_password_expires = ?, password_reset_token = ? WHERE id = ?",
    [resetCode, formattedExpirationDate, token, user[0].id]
  );

  let config = {
    service: "gmail", // your email domain
    auth: {
      user: process.env.GMAIL_APP_USER, // your email address
      pass: process.env.GMAIL_APP_PASSWORD, // your password
    },
  };

  let transporter = nodemailer.createTransport(config);

  let message = {
    from: "rodriguez.bastidas.matias@gmail.com", // dirección del remitente
    to: req.body.email, // dirección del destinatario
    subject: "SkilHub - Código de recuperación de cuenta", // asunto del correo
    html: `<p>Se ha solicitado la recuperación de tu contraseña. Utiliza el siguiente código para restablecer tu contraseña:</p>
           <p><b>${resetCode}</b></p>
           <p>Este código es válido por 1 hora.</p>`, // cuerpo del correo en HTML
  };

  try {
    const info = await transporter.sendMail(message);

    return res.status(200).json({
      msg: "Email sent",
      info: info.messageId,
      preview: nodemailer.getTestMessageUrl(info),
      token: token, // Devolver el token en la respuesta
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "Error al enviar el correo", error: err });
  }
};

export const verifyRecoveryCode = async (req, res) => {
  const { code } = req.body; // El código ingresado por el usuario
  const { token } = req.params; // El token que viene en la URL

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); 

    // Buscar al usuario con el ID obtenido del token
    const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [decoded.id]);

    if (user.length === 0) {
      return res.status(401).json({ valid: false, message: "Token inválido o expirado." });
    }

    const currentUser = user[0];
    console.log(currentUser);
    const currentDateTime = new Date();

    // Verificar que el código sea correcto y no haya expirado
    if (currentUser.code_user_password !== code || currentUser.reset_password_expires < currentDateTime) {
      return res.status(401).json({ valid: false, message: "El código es inválido o ha expirado." });
    }

    return res.status(200).json({ valid: true, userId: currentUser.id });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ valid: false, message: "Error interno del servidor." });
  }
};

export const changePassword = async (req, res) => {
  const { token } = req.params; // Token que viene en la URL
  const { newPassword } = req.body; // Nueva contraseña que ingresa el usuario

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Decodificar el token para obtener el userId
    const userId = decoded.id;

    // Si el token es válido, hashea la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña en la base de datos
    await pool.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      userId,
    ]);

    return res.status(200).json({
      message: "Contraseña actualizada exitosamente",
    });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return res.status(500).json({
      message: "Error interno del servidor.",
    });
  }
};


// Controller para actualizar el rol de usuario
export const updateUserRole = async (req, res) => {
  const userId  = req.user.id;  // El id del usuario que quiere cambiar su rol

  try {
    // Verificar si el usuario existe
    const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);

    if (user.length === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado.",
      });
    }

    const currentUser = user[0];

    // Si el usuario es un "admin", no debe poder cambiar su propio rol
    if (currentUser.rol === "admin") {
      return res.status(403).json({
        message: "No puedes cambiar tu rol siendo un admin.",
      });
    }

    // Si el usuario es un "estudiante", cambiar a "instructor"
    if (currentUser.rol === "estudiante") {
      await pool.query("UPDATE users SET rol = 'instructor' WHERE id = ?", [
        userId,
      ]);
      return res.status(200).json({
        message: "Rol actualizado a 'instructor'.",
      });
    }

    // Si el usuario ya es "instructor", no hacer nada
    return res.status(200).json({
      message: "El usuario ya tiene el rol de 'instructor'.",
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al actualizar el rol del usuario.",
    });
  }
};
