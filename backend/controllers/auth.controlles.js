import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


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
      { id: user[0].id, email: user[0].email },
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
