import jwt from "jsonwebtoken";
import {pool} from '../db.js'; // Asegúrate de tener la conexión a la base de datos

// Ruta para obtener el perfil del usuario
export const getUserProfile = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtener el token de la cabecera Authorization

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    // Verificar el token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Obtener el ID del usuario decodificado del token
    const userId = decoded.id;

    // Obtener los datos del usuario de la base de datos
    const [user] = await pool.query("SELECT nombre, email, rol FROM users WHERE id = ?", [userId]);

    if (user.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Retornar los datos del perfil del usuario
    return res.json(user[0]);
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateUserEmail = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // Obtener el ID del usuario del token

    const { newEmail } = req.body; // Obtener el nuevo correo del cuerpo de la solicitud

    // Verificar si el correo ya está en uso
    const [existingUser] = await pool.query("SELECT id FROM users WHERE email = ?", [newEmail]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "El correo ya está en uso" });
    }

    // Actualizar el correo del usuario
    await pool.query("UPDATE users SET email = ? WHERE id = ?", [newEmail, userId]);

    return res.status(200).json({ message: "Correo actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el correo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

