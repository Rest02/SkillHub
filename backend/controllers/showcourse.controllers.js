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
            return res.status(404).json({ message: "No se encontraron cursos con los filtros aplicados." });
        }

        // Devolver los cursos filtrados
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al recuperar los cursos" });
    }
};
