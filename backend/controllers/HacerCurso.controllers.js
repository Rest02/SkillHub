import { pool } from '../db.js'; // Asegúrate de tener la conexión a la base de datos

// Controlador para obtener las unidades de un curso inscrito
export const getCourseUnits = async (req, res) => {
  const userId = req.user.id; // Suponiendo que tienes el `userId` del token JWT
  const { courseId } = req.params;
  const courseIdnumber = parseInt(courseId);

  try {
    // Verificar si el usuario está inscrito en el curso
    const [enrollment] = await pool.query(
      `SELECT * 
       FROM enrollments 
       WHERE usuario_id = ? AND curso_id = ? AND estado = 'activo'`,
      [userId, courseIdnumber]
    );

    if (enrollment.length === 0) {
      return res.status(403).json({ message: 'No estás inscrito en este curso.' });
    }

    // Obtener las unidades del curso con los nombres de los videos asociados
    const [units] = await pool.query(
      `SELECT 
         u.id AS unidad_id, 
         u.titulo AS unidad_titulo, 
         v.id AS video_id,
         v.nombre AS video_nombre,
         v.video_url AS video,
         v.miniatura_url AS miniatura_url
       FROM units u
       LEFT JOIN videos v ON u.id = v.unidad_id
       WHERE u.curso_id = ?`,
      [courseIdnumber]
    );

    // Agrupar las unidades y clases por nombre
    const groupedUnits = units.reduce((acc, row) => {
      const unitId = row.unidad_id;

      if (!acc[unitId]) {
        acc[unitId] = {
          id: row.unidad_id,
          titulo: row.unidad_titulo,
          clases: []
        };
      }

      if (row.video_id) {
        acc[unitId].clases.push({
          id: row.video_id,
          nombre: row.video_nombre,
          videoUrl: row.video,  // Asegúrate de que `videoUrl` esté correctamente asignado
          miniaturaUrl: row.miniatura_url // Incluimos la miniatura del video
        });
      }

      return acc;
    }, {});

    // Convertir el objeto agrupado en un arreglo
    const result = Object.values(groupedUnits);

    // Invertir el orden de las clases de cada unidad
    result.forEach(unit => {
      unit.clases.reverse(); // Invertir las clases de la unidad
    });

    // Obtener los comentarios de cada video
    for (const unit of result) {
      for (const clase of unit.clases) {
        const [comments] = await pool.query(
          `SELECT 
             c.id AS comment_id, 
             c.contenido AS comment_content, 
             c.fecha_comentario AS comment_date, 
             u.nombre AS commenter_name
           FROM comments_videos c
           JOIN users u ON c.usuario_id = u.id
           WHERE c.video_id = ?`,
          [clase.id]
        );

        // Agregar los comentarios al video correspondiente
        clase.comentarios = comments.map(comment => ({
          id: comment.comment_id,
          contenido: comment.comment_content,
          fecha: comment.comment_date,
          nombreUsuario: comment.commenter_name,
          respuestas: [] // Creamos un array vacío para las respuestas
        }));

        // Obtener las respuestas para cada comentario
        for (const comment of clase.comentarios) {
          const [responses] = await pool.query(
            `SELECT 
               r.id AS response_id,
               r.contenido AS response_content, 
               r.fecha_respuesta AS response_date,
               u.nombre AS responder_name
             FROM responses_comments_videos r
             JOIN users u ON r.usuario_id = u.id
             WHERE r.comment_id = ?`,
            [comment.id]
          );

          // Añadir las respuestas al comentario correspondiente
          comment.respuestas = responses.map(response => ({
            id: response.response_id,
            contenido: response.response_content,
            fecha: response.response_date,
            responderNombre: response.responder_name
          }));
        }
      }
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las unidades, videos, comentarios y respuestas del curso.' });
  }
};


// controlador para crear una respuesta a un comentario
export const createResponse = async (req, res) => {
  const { courseId } = req.params; // courseId está disponible si es necesario en el futuro.
  const { commentId, content } = req.body; // Valores desde el body: commentId y content.

  const userId = req.user.id; // El ID del usuario que responde.

  console.log(commentId);
  console.log(content);
  console.log(userId);

  try {
    // Insertar la respuesta en la base de datos.
    const [result] = await pool.query(
      `INSERT INTO responses_comments_videos (usuario_id, comment_id, contenido) 
       VALUES (?, ?, ?)`,
      [userId, commentId, content] // Reemplazamos "commentId" por "comment_id".
    );

    res.status(201).json({
      message: 'Respuesta creada exitosamente.',
      responseId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la respuesta.' });
  }
};


// controlador para crear un comentario en un video
export const createComment = async (req, res) => {
  const { videoId, content } = req.body; // El videoId y el contenido vienen del cuerpo de la solicitud
  const userId = req.user.id; // El ID del usuario que está comentando

  // Verificamos si se envió contenido
  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "El contenido del comentario no puede estar vacío." });
  }

  try {
    // Insertar el comentario en la base de datos
    const [result] = await pool.query(
      `INSERT INTO comments_videos (usuario_id, contenido, video_id) 
       VALUES (?, ?, ?)`,
      [userId, content, videoId] // Pasamos el ID de usuario, contenido y videoId a la consulta
    );

    // Devolvemos la respuesta al cliente
    res.status(201).json({
      message: "Comentario creado exitosamente.",
      commentId: result.insertId, // El ID del nuevo comentario creado
      usuarioId: userId,
      contenido: content,
      videoId: videoId,
      fechaComentario: new Date().toISOString(), // Fecha del comentario
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el comentario." });
  }
};
