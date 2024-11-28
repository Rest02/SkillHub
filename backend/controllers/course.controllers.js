// course.controller.js
import { pool } from "../db.js"; // Asegúrate de tener la conexión a la base de datos

import fs from "fs";

//---------------- POST TODO LO DE CURSOS ------------------------

// Controlador para crear curso
export const createCourse = async (req, res) => {
  try {
    const { titulo, descripcion, categoria_id, precio, modalidad } = req.body;

    // Obtener instructor_id desde el token (req.user)
    const instructor_id = req.user.id; // Asumiendo que el id del instructor está en el payload del token

    // Guarda la ruta de la imagen de portada si fue cargada
    const thumbnailPath = req.file ? `thumbnail/${req.file.filename}` : null;

    // Verifica si se recibió el título, descripción, categoría, precio y modalidad
    if (!titulo || !descripcion || !categoria_id || !precio || !modalidad) {
      // Si el archivo se subió pero faltan datos, lo eliminamos
      if (thumbnailPath) {
        fs.unlinkSync(thumbnailPath);
      }
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    // Realiza la inserción en la base de datos
    const [result] = await pool.query(
      `INSERT INTO courses (titulo, descripcion, categoria_id, instructor_id, precio, modalidad, imagen_portada) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        titulo,
        descripcion,
        categoria_id,
        instructor_id,
        precio,
        modalidad,
        thumbnailPath,
      ]
    );

    // Devuelve la respuesta con el ID del curso creado
    res
      .status(201)
      .json({ message: "Curso creado con éxito", courseId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el curso" });
  }
};
// Controlador para crear unidades segun el curso seleccionado
export const createUnit = async (req, res) => {
  try {
    const { titulo, descripcion, objetivos, tema } = req.body;
    const curso_id = req.params.courseId;

    // Obtén el ID del usuario desde el token
    const instructor_id = req.user.id;
    console.log(curso_id, instructor_id);

    if (!titulo || !descripcion || !objetivos || !tema) {
      // Si falta algún dato, eliminar el archivo de video subido
      if (videoPath) {
        fs.unlinkSync(videoPath);
      }
      return res.status(400).json({ message: "Datos incompletos" });
    }

    // Verificar que el curso existe y pertenece al instructor
    const [course] = await pool.query(
      `SELECT * FROM courses WHERE id = ? AND instructor_id = ?`,
      [curso_id, instructor_id]
    );

    // Si no existe el curso o no pertenece al instructor, devuelve un error
    if (!course.length) {
      return res
        .status(403)
        .json({
          message: "No tienes permiso para crear unidades en este curso.",
        });
    }

    // Ahora, puedes crear la unidad
    const [result] = await pool.query(
      `INSERT INTO units (titulo, descripcion, objetivos, tema, curso_id) VALUES (?, ?, ?, ?, ?)`,
      [titulo, descripcion, objetivos, tema, curso_id]
    );

    res
      .status(201)
      .json({ message: "Unidad creada con éxito", unitId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la unidad" });
  }
};
// Controlador para subir video de los cursos segun unidad seleccionada
export const uploadVideo = async (req, res) => {
  try {
    const { nombre, descripcion, unidad_id } = req.body; // Ahora unidad_id viene en el body
    const curso_id = req.params.curso_id; // curso_id ahora viene de los parámetros
    const videoPath = req.file ? req.file.path : null;
    const instructor_id = req.user.id; // Obtenemos el ID del instructor desde el token

    // Validar que todos los datos necesarios están presentes
    if (!curso_id || !unidad_id || !nombre || !descripcion || !videoPath) {
      if (videoPath) {
        // Eliminar el archivo subido si falta algún dato
        fs.unlinkSync(videoPath);
      }
      return res.status(400).json({ message: "Datos incompletos" });
    }


    // Verificar si la unidad pertenece al curso proporcionado y si el curso es del instructor
    const [unit] = await pool.query(
      `SELECT units.id 
       FROM units 
       INNER JOIN courses ON units.curso_id = courses.id 
       WHERE units.id = ? AND courses.id = ? AND courses.instructor_id = ?`,
      [unidad_id, curso_id, instructor_id]
    );

    if (unit.length === 0) {
      // Si no se encuentra la unidad o no pertenece al curso del instructor
      return res.status(403).json({
        message: "No tienes permiso para agregar videos a esta unidad o la unidad no existe",
      });
    }

    // Insertar el video en la base de datos
    const [result] = await pool.query(
      `INSERT INTO videos (unidad_id, nombre, descripcion, video_url) 
       VALUES (?, ?, ?, ?)`,
      [unidad_id, nombre, descripcion, videoPath]
    );

    res.status(201).json({
      message: "Video subido exitosamente",
      videoId: result.insertId,
    });
  } catch (error) {
    console.error(error);

    // Manejar errores, eliminando el archivo subido si ocurre algún problema
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ message: "Error al subir el video" });
  }
};

// Controlador para subir miniatura del video en cuestion
export const uploadThumbnail = async (req, res) => {
  try {
    const video_id = req.params.video_id; // Recibe el ID del video al que pertenece la miniatura
    const thumbnailPath = req.file ? req.file.path : null;

    // Verificar que `video_id` y `thumbnailPath` estén presentes
    if (!video_id || !thumbnailPath) {
      // Eliminar el archivo si los datos son incompletos
      if (thumbnailPath) {
        fs.unlinkSync(thumbnailPath);
      }
      return res.status(400).json({ message: "Datos incompletos" });
    }

    // Actualizar la miniatura del video en la tabla "videos"
    const [result] = await pool.query(
      `UPDATE videos SET miniatura_url = ? WHERE id = ?`,
      [thumbnailPath, video_id]
    );

    // Verificar si el video se encontró y actualizó
    if (result.affectedRows === 0) {
      // Eliminar el archivo si no se encontró el video
      fs.unlinkSync(thumbnailPath);
      return res.status(404).json({ message: "Video no encontrado" });
    }

    res
      .status(200)
      .json({
        message: "Miniatura subida exitosamente",
        thumbnailUrl: thumbnailPath,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir la miniatura" });
  }
};

//-----------------------------------------------------------------

//---------------- GET TODO LO DE CURSOS ------------------------

export const getCourses = async (req, res) => {
  try {
    // Realiza una consulta para obtener todos los cursos
    const instructor_id = req.user.id; // Asumiendo que el id del instructor está en el payload del token

    const [courses] = await pool.query(
      "SELECT id, titulo, descripcion, imagen_portada from courses WHERE instructor_id = ?",
      [instructor_id]
    );

    // Devuelve los cursos obtenidos
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los cursos" });
  }
};

export const getCategorias = async (req, res) => {
  try {
    const [categorias] = await pool.query("SELECT * FROM categories"); // Reemplaza con tu consulta SQL real
    res.status(200).json(categorias); // Devuelve las categorías como JSON
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ message: "Error al obtener las categorías" });
  }
};


// Controlador para obtener las unidades y videos de un curso
export const getCourseUnitsAndVideos = async (req, res) => {
  const { courseId } = req.params;

  try {
    // Verifica si el curso existe
    const [course] = await pool.query('SELECT titulo FROM courses WHERE id = ?', [courseId]);
    if (course.length === 0) {
      console.log('El curso no existe');
      return res.status(404).json({ error: 'El curso no existe' });
    }

    // Obtén las unidades del curso
    const unitsQuery = `
      SELECT u.id AS unidad_id, u.titulo AS unidad_titulo
      FROM units u
      WHERE u.curso_id = ?;
    `;
    const [units] = await pool.query(unitsQuery, [courseId]);

    // Si no hay unidades, devuelve solo los datos del curso
    if (units.length === 0) {
      console.log('No hay unidades para este curso');
      return res.json({ course: course[0], units: [] });
    }

    // Agrega más información a las unidades y sus videos
    const unitsWithDetails = await Promise.all(
      units.map(async (unit) => {
        // Query para obtener detalles adicionales de la unidad
        const unitDetailsQuery = `
          SELECT u.id AS unidad_id, u.titulo AS unidad_titulo
          FROM units u
          WHERE u.id = ?;
        `;
        const [unitDetails] = await pool.query(unitDetailsQuery, [unit.unidad_id]);

        // Query para obtener los videos de la unidad
        const videosQuery = `
          SELECT v.id AS video_id, v.nombre AS video_nombre
          FROM videos v
          WHERE v.unidad_id = ?;
        `;
        const [videos] = await pool.query(videosQuery, [unit.unidad_id]);

        return {
          ...unitDetails[0],
          videos,
        };
      })
    );

    res.json({
      course: course[0],
      units: unitsWithDetails,
    });
  } catch (error) {
    console.error('Error al obtener las unidades y videos del curso:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// GET para obtener las unidades de uncurso
export const getUnitsOfCourse = async (req, res) => {
  try {
    const instructor_id = req.user.id;
    const { curso_id } = req.params; // Recibe el curso_id de la URL

    const [unidades] = await pool.query(
      `SELECT 
         u.id AS unidad_id, 
         u.titulo AS unidad_titulo,
         u.descripcion AS unidad_descripcion,
         u.objetivos AS unidad_objetivos,
         u.tema AS unidad_tema,
         u.fecha_creacion AS unidad_fecha_creacion
       FROM units u
       INNER JOIN courses c ON u.curso_id = c.id
       WHERE c.instructor_id = ? AND c.id = ?`,
      [instructor_id, curso_id]
    );

    if (unidades.length === 0) {
      return res.status(404).json({ message: "No se encontraron unidades para este curso." });
    }

    res.status(200).json(unidades);
  } catch (error) {
    console.error("Error al obtener unidades:", error);
    res.status(500).json({ message: "Error al obtener las unidades del curso." });
  }
};




 //  ------------- update unidad --------------

 export const getUnidadById = async (req, res) => {
  const { unidadId } = req.body; // ID de la unidad obtenido del body
  const instructor_id = req.user.id; // ID del instructor desde el token

  try {
    // Verificar si la unidad existe y pertenece a un curso del instructor
    const [unidad] = await pool.query(
      `SELECT u.* 
       FROM units u 
       INNER JOIN courses c ON u.curso_id = c.id 
       WHERE u.id = ? AND c.instructor_id = ?`,
      [unidadId, instructor_id]
    );

    if (!unidad.length) {
      return res
        .status(404)
        .json({ success: false, message: "Unidad no encontrada o acceso denegado" });
    }

    res.json({ success: true, data: unidad[0] });
  } catch (error) {
    console.error("Error al obtener unidad:", error);
    res.status(500).json({ success: false, message: "Error al obtener unidad" });
  }
};


// update unidad
export const updateUnidad = async (req, res) => {
  const { unidadId, titulo, descripcion, objetivos, tema } = req.body; // Datos del body
  const instructor_id = req.user.id; // ID del instructor desde el token

  try {
    // Verificar si la unidad existe y pertenece a un curso del instructor
    const [unidadExistente] = await pool.query(
      `SELECT u.* 
       FROM units u 
       INNER JOIN courses c ON u.curso_id = c.id 
       WHERE u.id = ? AND c.instructor_id = ?`,
      [unidadId, instructor_id]
    );

    if (!unidadExistente.length) {
      return res.status(404).json({
        success: false,
        message: "Unidad no encontrada o acceso denegado",
      });
    }

    // Actualizar los campos de la unidad
    const [result] = await pool.query(
      `UPDATE units 
       SET titulo = ?, descripcion = ?, objetivos = ?, tema = ?
       WHERE id = ?`,
      [titulo, descripcion, objetivos, tema, unidadId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No se pudo actualizar la unidad" });
    }

    res.json({ success: true, message: "Unidad actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar unidad:", error);
    res.status(500).json({ success: false, message: "Error al actualizar unidad" });
  }
};

export const getVideosByUnidad = async (req, res) => {
  const { courseId } = req.params; // ID del curso desde la URL
  const { unidadId } = req.body; // ID de la unidad desde el cuerpo

  if (!unidadId) {
    return res.status(400).json({ message: "unidadId es requerido" });
  }

  try {
    // Verifica que el curso existe (opcional, pero útil para seguridad)
    const [curso] = await pool.query("SELECT * FROM courses WHERE id = ?", [courseId]);
    if (curso.length === 0) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    // Obtén los videos asociados a la unidad
    const [videos] = await pool.query(
      "SELECT * FROM videos WHERE unidad_id = ?",
      [unidadId]
    );
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error al obtener los videos:", error);
    res.status(500).json({ message: "Error al obtener los videos" });
  }
};

// Controlador para actualizar curso
// Controlador para actualizar un video

export const updateVideo = async (req, res) => {
  try {
    const { videoId, nombre, descripcion } = req.body;  // Obtén los datos desde el body
    const videoPath = req.file ? req.file.path : null;  // Si hay un archivo nuevo, obtener la ruta del archivo

    // Verificar si el video existe
    const [video] = await pool.query(
      `SELECT * FROM videos WHERE id = ?`,
      [videoId]
    );

    if (video.length === 0) {
      return res.status(404).json({ message: "Video no encontrado." });
    }

    // Mantener la URL del video actual
    let video_url = video[0].video_url;

    if (videoPath) {
      // Si se sube un archivo nuevo, eliminamos el archivo anterior
      if (fs.existsSync(video_url)) {
        fs.unlinkSync(video_url); // Elimina el archivo de video anterior si existe
      }
      video_url = videoPath; // Asignamos la nueva URL del archivo de video
    }

    // Actualizar los datos del video en la base de datos
    const [result] = await pool.query(
      `UPDATE videos
       SET nombre = ?, descripcion = ?, video_url = ?
       WHERE id = ?`,
      [nombre, descripcion, video_url, videoId]
    );

    // Verificar si la actualización fue exitosa
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el video." });
    }

    res.status(200).json({ message: "Video actualizado correctamente" });

  } catch (error) {
    console.error("Error al actualizar el video:", error);

    // Si hubo un error y se subió un archivo, eliminar el archivo subido para evitar archivos huérfanos
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para eliminar un curso
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body; // ID del curso a eliminar
    const instructor_id = req.user.id; // ID del instructor desde el token

    // Verificar si el curso existe y pertenece al instructor
    const [course] = await pool.query(
      `SELECT * FROM courses WHERE id = ? AND instructor_id = ?`,
      [courseId, instructor_id]
    );

    if (course.length === 0) {
      return res.status(404).json({ message: "Curso no encontrado o acceso denegado" });
    }

    // Obtener las unidades del curso
    const [units] = await pool.query(
      `SELECT id FROM units WHERE curso_id = ?`,
      [courseId]
    );

    // Eliminar videos asociados a cada unidad
    for (const unit of units) {
      const [videos] = await pool.query(
        `SELECT video_url FROM videos WHERE unidad_id = ?`,
        [unit.id]
      );

      // Eliminar archivos de video físicos
      for (const video of videos) {
        if (fs.existsSync(video.video_url)) {
          fs.unlinkSync(video.video_url);
        }
      }

      // Eliminar videos de la base de datos
      await pool.query(`DELETE FROM videos WHERE unidad_id = ?`, [unit.id]);
    }

    // Eliminar unidades del curso
    await pool.query(`DELETE FROM units WHERE curso_id = ?`, [courseId]);

    // Eliminar archivo de miniatura si existe
    const thumbnailPath = course[0].imagen_portada;
    if (thumbnailPath && fs.existsSync(thumbnailPath)) {
      fs.unlinkSync(thumbnailPath);
    }

    // Eliminar el curso de la base de datos
    await pool.query(`DELETE FROM courses WHERE id = ?`, [courseId]);

    res.status(200).json({ message: "Curso eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el curso:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
