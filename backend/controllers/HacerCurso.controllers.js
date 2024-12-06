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
         v.video_url AS video
       FROM units u
       LEFT JOIN videos v ON u.id = v.unidad_id
       WHERE u.curso_id = ?`,
      [courseIdnumber]
    );

    // console.log("Unidades y videos obtenidos:", units);  // Verifica los datos

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
          videoUrl: row.video  // Asegúrate de que `videoUrl` esté correctamente asignado

        });
      }

      return acc;
    }, {});

    // Convertir el objeto agrupado en un arreglo
    const result = Object.values(groupedUnits);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las unidades y nombres de las clases del curso.' });
  }
};
