import axios from "axios";

// Configuración de la base URL
const API_URL = "http://localhost:4000";

export const fetchUserCourses = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/aprendizaje`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; // Retorna los datos de los cursos
  } catch (error) {
    console.error("Error al obtener los cursos del usuario:", error);
    throw error;
  }
};
