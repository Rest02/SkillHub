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

  
      // Verifica si se encontraron cursos
      if (courses.length === 0) {
        return res.status(404).json({ message: "No estás inscrito en ningún curso." });
      }
  
      // Retorna los cursos en los que el usuario está inscrito
      return res.status(200).json(courses);
    } catch (error) {
      console.error("Error al obtener los cursos del usuario:", error);
      return res.status(500).json({ message: "Error al obtener los cursos." });
    }
  };
  