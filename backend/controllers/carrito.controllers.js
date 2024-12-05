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

    // Si no hay elementos en el carrito, devolver un carrito vacío
    if (rows.length === 0) {
      return res.status(200).json({ carrito: [] });
    }

    // Retornamos los resultados del carrito
    res.status(200).json({ carrito: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controlador para eliminar un curso del carrito
export const deleteFromCarrito = async (req, res) => {
  const userId = req.user.id; // ID del usuario autenticado
  const { carritoId } = req.body; // ID del ítem en el carrito que se va a eliminar

  if (!carritoId) {
    return res.status(400).json({ message: "El carritoId es requerido" });
  }

  try {
    // Verificar si el ítem pertenece al usuario
    const [result] = await pool.query(
      `
      DELETE FROM cart
      WHERE id = ? AND user_id = ?
      `,
      [carritoId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item no encontrado o no pertenece al usuario" });
    }

    // Respuesta de éxito
    res.status(200).json({ success: true, message: "Item eliminado del carrito correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el item del carrito" });
  }
};

// Controlador para añadir un curso al carrito usando courseId en los params
export const addToCarrito = async (req, res) => {
  const userId = req.user.id; // ID del usuario autenticado desde el token
  const { courseId } = req.params; // courseId extraído de los parámetros de la URL

  if (!courseId) {
    return res.status(400).json({ message: "El courseId es requerido" });
  }

  try {
    // Verificar si el curso ya está en el carrito
    const [existingCartItem] = await pool.query(
      `
      SELECT id 
      FROM cart 
      WHERE user_id = ? AND course_id = ?
      `,
      [userId, courseId]
    );

    if (existingCartItem.length > 0) {
      // Si ya existe, no permitir duplicados
      return res.status(400).json({ message: "El curso ya está en el carrito" });
    }

    // Si no existe, insertar un nuevo registro
    await pool.query(
      `
      INSERT INTO cart (user_id, course_id, quantity)
      VALUES (?, ?, ?)
      `,
      [userId, courseId, 1] // Siempre se inserta con cantidad 1
    );

    res.status(201).json({ success: true, message: "Curso añadido al carrito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al añadir el curso al carrito" });
  }
};

