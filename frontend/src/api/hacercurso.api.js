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
    return response.data; // Retorna los datos de las unidades y videos
  } catch (error) {
    console.error("Error al obtener las unidades y videos del curso:", error);
    throw error;
  }
};
