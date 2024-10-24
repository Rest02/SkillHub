import dotenv from "dotenv";
import jwt from "jsonwebtoken"; // Asegúrate de tener esto importado

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET; // Cargamos JWT_SECRET del archivo .env

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del encabezado Authorization
  
    if (!token) {
      return res.status(401).json({ message: "Acceso denegado. No hay token." });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET); // Verificar el token usando la variable JWT_SECRET
      req.user = decoded; // Adjuntar el usuario decodificado al request
      next(); // Proceder a la siguiente función
    } catch (error) {
      return res.status(401).json({ message: "Token inválido o expirado." });
    }
};
