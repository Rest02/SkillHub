// course.controller.js
import {pool} from '../db.js'; // Asegúrate de tener la conexión a la base de datos

export const createCourse = async (req, res) => {
    try {
        const { titulo, descripcion, categoria_id, instructor_id, precio, modalidad } = req.body;

        // Guarda la ruta de la imagen de portada si fue cargada
        const thumbnailPath = req.file ? req.file.path : null;

        const [result] = await pool.query(
            `INSERT INTO courses (titulo, descripcion, categoria_id, instructor_id, precio, modalidad, imagen_portada) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [titulo, descripcion, categoria_id, instructor_id, precio, modalidad, thumbnailPath]
        );

        res.status(201).json({ message: 'Curso creado con éxito', courseId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el curso' });
    }
};

export const createUnit = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { titulo, descripcion, objetivos, tema } = req.body;

        // Inserta la unidad en la base de datos
        const [unitResult] = await pool.query(
            `INSERT INTO units (titulo, descripcion, objetivos, tema, curso_id) 
            VALUES (?, ?, ?, ?, ?)`,
            [titulo, descripcion, objetivos, tema, courseId]
        );

        const unitId = unitResult.insertId;
        res.status(201).json({ message: 'Unidad creada con éxito', unitId });
    } catch (error) {
        console.error("Error al crear la unidad:", error);
        res.status(500).json({ message: 'Error al crear la unidad' });
    }
};
