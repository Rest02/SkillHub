import { pool } from "../db.js";

export const getCourses = async (req, res) => {
  try {
    // Extraer parámetros de consulta de la URL
    const { titulo, category, maxPrice, rating, modalidad } = req.query;

    // Construir la consulta dinámica
    let query = `
            SELECT id, titulo, descripcion, precio, categoria_id, instructor_id, 
                   fecha_creacion, valoracion_promedio, duracion_estimada, imagen_portada, modalidad
            FROM courses
            WHERE 1=1
        `;

    const params = [];

    // Agregar filtros dinámicamente
    if (titulo) {
      query += ` AND titulo LIKE ?`;
      params.push(`%${titulo}%`); // Busca coincidencias parciales
    }

    if (category) {
      query += ` AND categoria_id = ?`;
      params.push(category); // Coincidencia exacta por categoría
    }

    if (maxPrice) {
      query += ` AND precio <= ?`;
      params.push(Number(maxPrice)); // Filtro por precio máximo
    }

    if (rating) {
      query += ` AND valoracion_promedio >= ?`;
      params.push(Number(rating)); // Filtro por valoración mínima
    }

    if (modalidad) {
      query += ` AND modalidad = ?`;
      params.push(modalidad); // Filtro exacto por modalidad (online, presencial, etc.)
    }

    // Ejecutar la consulta con los parámetros
    const [rows] = await pool.query(query, params);

    // Verificar si hay resultados
    if (rows.length === 0) {
      return res.status(404).json({
        message: "No se encontraron cursos con los filtros aplicados.",
      });
    }

    // Devolver los cursos filtrados
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al recuperar los cursos" });
  }
};

export const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params; // ID del curso recibido en la URL

    if (!courseId) {
      // Verifica que courseId no sea undefined
      return res.status(400).json({ error: "Course ID is required." });
    }

    // Consulta SQL para obtener el título del curso, unidades y nombres de videos
    const query = `
        SELECT 
          c.titulo AS course_title,
          u.titulo AS unit_title,
          v.nombre AS video_name,
          v.video_url AS video_url
        FROM courses c
        LEFT JOIN units u ON c.id = u.curso_id
        LEFT JOIN videos v ON u.id = v.unidad_id
        WHERE c.id = ?
        ORDER BY u.id, v.id
      `;

    // Ejecutar la consulta
    const [rows] = await pool.query(query, [courseId]);



    // Si no se encuentra el curso
    if (rows.length === 0) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    // Formatear los datos agrupados por unidad
    const courseDetails = {
      course_title: rows[0].course_title,
      units: [],
    };

    const unitMap = new Map(); // Para evitar duplicados de unidades

    rows.forEach((row) => {
      if (!unitMap.has(row.unit_title) && row.unit_title) {
        unitMap.set(row.unit_title, { unit_title: row.unit_title, videos: [] });
      }

      if (row.video_name && unitMap.has(row.unit_title)) {
        // Asegúrate de incluir tanto video_name como video_url
        unitMap.get(row.unit_title).videos.push({
          video_name: row.video_name,
          video_url: row.video_url // Añadir la URL del video
        });
      }
    });

    courseDetails.units = Array.from(unitMap.values());

    // Responder con los detalles del curso
    return res.status(200).json(courseDetails);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al recuperar los detalles del curso" });
  }
};



export const getRatingsForCourse = async (req, res) => {
  const { courseId } = req.params; // Obtenemos el ID del curso desde los parámetros de la URL

  // SQL para obtener las valoraciones de un curso
  const query = `
    SELECT r.id, r.valoracion, r.comentario, r.fecha_valoracion, u.nombre AS usuario
    FROM ratings r
    JOIN users u ON r.usuario_id = u.id
    WHERE r.curso_id = ?
    ORDER BY r.fecha_valoracion DESC
  `;

  try {
    // Ejecutamos la consulta SQL
    const [ratings] = await pool.execute(query, [courseId]);
    console.log(ratings)

    // Si no se encontraron valoraciones, devolvemos un mensaje
    // if (ratings.length === 0) {
    //   return res.status(404).json({ message: 'No se encontraron valoraciones para este curso.' });
    // }

    // Si se encuentran valoraciones, las devolvemos en la respuesta
    return res.status(200).json({ ratings });
  } catch (err) {
    console.error('Error al obtener las valoraciones:', err);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};


