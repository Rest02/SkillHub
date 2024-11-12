// course.controller.js
import {pool} from '../db.js'; // Asegúrate de tener la conexión a la base de datos


export const createCourse = async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);

        console.log(req.files);  // Para los videos
        console.log(req.file);   // Para la miniatura

        const { titulo, descripcion, categoria_id, instructor_id, precio, modalidad } = req.body;

        // Accedemos a los archivos cargados correctamente
        const videoPaths = req.files ? req.files.map(file => file.path) : []; // Rutas de los videos
        const thumbnailPath = req.file ? req.file.path : null; // Ruta de la miniatura (si existe)

        console.log('Rutas de los videos:', videoPaths);
        console.log('Ruta de la miniatura:', thumbnailPath);

        // Insertar curso en la base de datos
        const [courseResult] = await pool.query(
            `INSERT INTO courses (titulo, descripcion, categoria_id, instructor_id, precio, modalidad, imagen_portada) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [titulo, descripcion, categoria_id, instructor_id, precio, modalidad, thumbnailPath] // Cambié "miniatura_url" por "imagen_portada"
        );

        console.log('Resultado de la consulta para insertar curso:', courseResult);

        const courseId = courseResult.insertId;

        console.log('Curso insertado con ID:', courseId);

        // Insertar videos en la tabla de videos
        // if (videoPaths.length > 0) {
        //     for (const videoPath of videoPaths) {
        //         await pool.query(
        //             `INSERT INTO videos (curso_id, nombre, descripcion, miniatura_url, video_url) 
        //             VALUES (?, ?, ?, ?, ?)`,
        //             // Asumí que la miniatura es la misma para todos los videos en este caso, podrías cambiarlo
        //             [courseId, 'Video Nombre', 'Descripción del video', thumbnailPath, videoPath]
        //         );
        //     }
        // }

        res.status(201).json({ message: 'Curso creado con éxito', courseId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el curso' });
    }
};
