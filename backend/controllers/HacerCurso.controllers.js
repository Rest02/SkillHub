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
          nombreUsuario: comment.commenter_name
        }));
      }
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las unidades, videos y comentarios del curso.' });
  }
};
