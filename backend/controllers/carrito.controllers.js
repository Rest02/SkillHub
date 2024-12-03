import { pool } from "../db.js"; // Asegúrate de tener la conexión a la base de datos

// Controlador para obtener el carrito del usuario
export const getCarrito = async (req, res) => {
  const userId = req.user.id; // El ID del usuario lo obtenemos del token decodificado
  console.log(userId);

  try {
    // Consulta SQL para obtener el carrito del usuario con los detalles del curso
    const [rows] = await pool.query(
      `
      SELECT 
        c.id AS carrito_id,
        c.quantity AS cantidad,
        co.titulo AS nombre,
        co.imagen_portada AS imagen,
        co.precio AS precio,
        co.descripcion AS descripcion
      FROM cart c
      INNER JOIN courses co ON c.course_id = co.id
      WHERE c.user_id = ?
      `, 
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No carrito found" });
    }

    // Retornamos los resultados del carrito
    res.status(200).json({ carrito: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

