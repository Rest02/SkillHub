import { pool } from "../db.js";


export const getUserCourses = async (req, res) => {
  const userId = req.user.id;  // Asumimos que el userId está en req.user gracias al middleware verifyToken
  console.log(userId)

  try {
    // Consulta para obtener los cursos en los que el usuario está inscrito
    const [courses] = await pool.query(`
      SELECT c.id, c.titulo, c.descripcion, c.imagen_portada, e.fecha_inscripcion
      FROM enrollments e
      JOIN courses c ON e.curso_id = c.id
      WHERE e.usuario_id = ? AND e.estado = 'activo'
      ORDER BY e.fecha_inscripcion DESC
    `, [userId]);

    // Si no hay cursos, devolver un mensaje adecuado con código 200 (no es un error, solo no hay resultados)
    if (courses.length === 0) {
      return res.status(200).json({ message: "No estás inscrito en ningún curso." });
    }

    // Retorna los cursos en los que el usuario está inscrito
    return res.status(200).json(courses);
  } catch (error) {
    console.error("Error al obtener los cursos del usuario:", error);
    return res.status(500).json({ message: "Error al obtener los cursos." });
  }
};

  



  export const createRating = async (req, res) => {
    const { rating, comment } = req.body;  // Datos enviados en el body (curso, valoración, comentario)
    const userId = req.user.id;  // El id del usuario autenticado
    const {courseId} = req.params
    console.log("eñcursoid", courseId)
    console.log("el comentario", comment)
  
    try {
      // Verificar si el usuario está inscrito en el curso y el estado es 'completado'
      const [enrollment] = await pool.query(`
        SELECT e.estado
        FROM enrollments e
        WHERE e.usuario_id = ? AND e.curso_id = ? AND e.estado = 'activo'
      `, [userId, courseId]);
  
      if (enrollment.length === 0) {
        return res.status(400).json({ message: "No puedes valorar este curso, no has completado la inscripción." });
      }
  
      // Verificar si el usuario ya ha valorado este curso
      const [existingRating] = await pool.query(`
        SELECT * 
        FROM ratings
        WHERE curso_id = ? AND usuario_id = ?
      `, [courseId, userId]);
  
      if (existingRating.length > 0) {
        return res.status(400).json({ message: "Ya has valorado este curso." });
      }
  
      // Insertar la nueva valoración en la tabla 'ratings'
      await pool.query(`
        INSERT INTO ratings (curso_id, usuario_id, valoracion, comentario)
        VALUES (?, ?, ?, ?)
      `, [courseId, userId, rating, comment]);
  
      // Actualizar el promedio de la valoración en el curso
      const [course] = await pool.query(`
        SELECT AVG(valoracion) as avg_rating
        FROM ratings
        WHERE curso_id = ?
      `, [courseId]);
  
      const avgRating = course[0].avg_rating || 0;
  
      await pool.query(`
        UPDATE courses
        SET valoracion_promedio = ?
        WHERE id = ?
      `, [avgRating, courseId]);
  
      return res.status(201).json({ message: "Valoración creada exitosamente." });
  
    } catch (error) {
      console.error("Error al crear la valoración:", error);
      return res.status(500).json({ message: "Error al crear la valoración." });
    }
  };
  


  