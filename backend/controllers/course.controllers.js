// course.controller.js
import {pool} from '../db.js'; // Asegúrate de tener la conexión a la base de datos

export const createCourse = async (req, res) => {
    try {
        const { titulo, descripcion, categoria_id, precio, modalidad } = req.body;

        // Obtener instructor_id desde el token (req.user)
        const instructor_id = req.user.id;  // Asumiendo que el id del instructor está en el payload del token

        // Guarda la ruta de la imagen de portada si fue cargada
        const thumbnailPath = req.file ? req.file.path : null;

        // Verifica si se recibió el título, descripción, categoría, precio y modalidad
        if (!titulo || !descripcion || !categoria_id || !precio || !modalidad) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        // Realiza la inserción en la base de datos
        const [result] = await pool.query(
            `INSERT INTO courses (titulo, descripcion, categoria_id, instructor_id, precio, modalidad, imagen_portada) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [titulo, descripcion, categoria_id, instructor_id, precio, modalidad, thumbnailPath]
        );

        // Devuelve la respuesta con el ID del curso creado
        res.status(201).json({ message: 'Curso creado con éxito', courseId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el curso' });
    }
};



export const createUnit = async (req, res) => {
    try {
        const {titulo, descripcion } = req.body;
        const curso_id = req.params.courseId
        console.log(curso_id)

        // Obtén el ID del usuario desde el token
        const instructor_id = req.user.id;
        console.log(curso_id, instructor_id)

        // Verificar que el curso existe y pertenece al instructor
        const [course] = await pool.query(
            `SELECT * FROM courses WHERE id = ? AND instructor_id = ?`,
            [curso_id, instructor_id]
        );

        // Si no existe el curso o no pertenece al instructor, devuelve un error
        if (!course.length) {
            return res.status(403).json({ message: 'No tienes permiso para crear unidades en este curso.' });
        }

        // Ahora, puedes crear la unidad
        const [result] = await pool.query(
            `INSERT INTO units (titulo, descripcion, curso_id) VALUES (?, ?, ?)`,
            [titulo, descripcion, curso_id]
        );

        res.status(201).json({ message: 'Unidad creada con éxito', unitId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la unidad' });
    }
};





// Controlador para subir video de los cursos por unidades
export const uploadVideo = async (req, res) => {
    try {
        const { unidad_id, nombre, descripcion } = req.body;
        const videoPath = req.file ? req.file.path : null;

        if (!unidad_id || !nombre || !videoPath) {
            return res.status(400).json({ message: 'Datos incompletos' });
        }

        // Verificar si la unidad existe
        const [unit] = await pool.query(
            'SELECT id FROM units WHERE id = ?',
            [unidad_id]
        );

        if (unit.length === 0) {
            return res.status(400).json({ message: 'La unidad especificada no existe' });
        }

        // Si la unidad existe, procedemos a insertar el video
        const [result] = await pool.query(
            `INSERT INTO videos (unidad_id, nombre, descripcion, video_url) 
            VALUES (?, ?, ?, ?)`,
            [unidad_id, nombre, descripcion, videoPath]
        );

        res.status(201).json({ message: 'Video subido exitosamente', videoId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al subir el video' });
    }
};


// Controlador para subir miniatura
export const uploadThumbnail = async (req, res) => {
    try {
        const { video_id } = req.body; // Recibe el ID del video al que pertenece la miniatura
        const thumbnailPath = req.file ? req.file.path : null;

        if (!video_id || !thumbnailPath) {
            return res.status(400).json({ message: 'Datos incompletos' });
        }

        // Actualiza la miniatura del video en la tabla "videos"
        const [result] = await pool.query(
            `UPDATE videos SET miniatura_url = ? WHERE id = ?`,
            [thumbnailPath, video_id]
        );

        // Verifica si se actualizó correctamente
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Video no encontrado' });
        }

        res.status(200).json({ message: 'Miniatura subida exitosamente', thumbnailUrl: thumbnailPath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al subir la miniatura' });
    }
};

