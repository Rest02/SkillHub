import { pool } from "../db.js"; // Asegúrate de tener la conexión a la base de datos

export const getCourses = async (req, res) => {
    try {
        // Realizamos una consulta para obtener todos los datos de los cursos
        const [rows] = await pool.query(`
            SELECT id, titulo, descripcion, precio, categoria_id, instructor_id, 
                   fecha_creacion, valoracion_promedio, duracion_estimada, imagen_portada, modalidad
            FROM courses
        `);

        // Verificamos si la consulta devuelve resultados
        if (rows.length === 0) {
            return res.status(404).json({ message: "No courses found" });
        }

        // Devolvemos la lista completa de cursos
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving courses" });
    }
};

