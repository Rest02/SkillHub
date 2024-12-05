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
        c.course_id,
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

export const handlePayment = async (req, res) => {
  const { courseIds } = req.body; // Recibimos un array de `courseIds` desde el body
  const userId = req.user.id; // El userId está en req.user gracias al middleware verifyToken


  console.log("Course IDs recibidos:", courseIds);  // Verifica los courseIds que llegan

  // Verificar que se proporcionaron courseIds
  if (!courseIds || courseIds.length === 0) {
    return res.status(400).json({ message: "No se han proporcionado cursos" });
  }

  try {
    // 1. Validar los cursos recibidos
    const [courses] = await pool.query(
      `SELECT id FROM courses WHERE id IN (?)`,
      [courseIds]
    );

    console.log("Cursos encontrados en la base de datos:", courses);  // Agrega esta línea para verificar lo que devuelve la consulta


    // Si el número de cursos encontrados no coincide con los courseIds enviados, hay un error
    if (courses.length !== courseIds.length) {
      return res.status(400).json({ message: "Algunos cursos no son válidos" });
    }

    // 2. Insertar en la tabla enrollments
    const enrollmentsPromises = courses.map(course => {
      return pool.query(
        `INSERT INTO enrollments (curso_id, usuario_id, estado)
         VALUES (?, ?, ?)`,
        [course.id, userId, "activo"]
      );
    });

    // Ejecutar todas las inserciones de enrollments de forma simultánea
    await Promise.all(enrollmentsPromises);

    // 3. (Opcional) Vaciar el carrito una vez que los cursos son inscritos
    await pool.query(
      `DELETE FROM cart WHERE user_id = ?`,
      [userId]
    );

    // Retornar respuesta de éxito
    return res.status(200).json({ message: "Pago procesado y cursos inscritos." });
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    return res.status(500).json({ message: "Error al procesar el pago" });
  }
};
