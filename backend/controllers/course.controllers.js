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
    const { nombre, descripcion } = req.body;
    const unidad_id = req.params.unidad_id;
    const videoPath = req.file ? req.file.path : null;
    const instructor_id = req.user.id; // Obtenemos el ID del instructor desde el token

    if (!unidad_id || !nombre || !videoPath || !descripcion) {
      // Si falta algún dato, eliminar el archivo de video subido
      if (videoPath) {
        fs.unlinkSync(videoPath);
      }
      return res.status(400).json({ message: "Datos incompletos" });
    }

    // Verificar si la unidad existe y pertenece a un curso del instructor autenticado
    const [unit] = await pool.query(
      `SELECT units.id 
            FROM units 
            INNER JOIN courses ON units.curso_id = courses.id 
            WHERE units.id = ? AND courses.instructor_id = ?`,
      [unidad_id, instructor_id]
    );

    if (unit.length === 0) {
      return res
        .status(403)
        .json({
          message:
            "No tienes permiso para agregar videos a esta unidad o la unidad no existe",
        });
    }

    // Si la unidad pertenece al curso del instructor autenticado, procedemos a insertar el video
    const [result] = await pool.query(
      `INSERT INTO videos (unidad_id, nombre, descripcion, video_url) 
            VALUES (?, ?, ?, ?)`,
      [unidad_id, nombre, descripcion, videoPath]
    );

    res
      .status(201)
      .json({ message: "Video subido exitosamente", videoId: result.insertId });
  } catch (error) {
    console.error(error);
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
      "SELECT titulo, descripcion, imagen_portada from courses WHERE instructor_id = ?",
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

export const createCategoria = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res
      .status(400)
      .json({ message: "El nombre de la categoría es obligatorio" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO categories (nombre) VALUES (?)",
      [nombre]
    );
    res.status(201).json({ id: result.insertId, nombre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la categoría" });
  }
};