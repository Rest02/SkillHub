import axios from "axios";

// Configuración de la base URL
const API_URL = "http://localhost:4000"; // Ajusta según tu configuración

export const fetchCourseUnits = async (token, courseId) => {
  try {
    const response = await axios.get(`${API_URL}/hacercurso/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Token JWT
      },
    });
    console.log("descripciondataaaaaaaaa", response.data)
    return response.data; // Retorna los datos de las unidades y videos
  } catch (error) {
    console.error("Error al obtener las unidades y videos del curso:", error);
    throw error;
  }
};


// Función para crear una respuesta al comentario
export const createResponseToComment = async (token, courseId, commentId, content) => {
  try {
    const response = await axios.post(
      `${API_URL}/hacercurso/${courseId}`, // Ruta para responder al comentario
      { commentId, content }, // El comentario ID y el contenido de la respuesta
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token JWT
        },
      }
    );
    return response.data; // Retorna los datos de la respuesta creada
  } catch (error) {
    console.error("Error al crear la respuesta:", error);
    throw error;
  }
};


// Función para crear un comentario
export const createComment = async (token, courseId, videoId, content) => {
  try {
    const response = await axios.post(
      `${API_URL}/hacercurso/${courseId}/comment`, // Ruta para crear el comentario
      { videoId, content }, // El ID del video y el contenido del comentario
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token JWT
        },
      }
    );
    return response.data; // Retorna los datos del comentario creado
  } catch (error) {
    console.error("Error al crear el comentario:", error);
    throw error;
  }
};