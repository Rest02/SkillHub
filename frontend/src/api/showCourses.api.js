import axios from 'axios';

export const getCursosApiNoAuth = async () => {
  try {
    // Realizar la solicitud GET para obtener los cursos
    const response = await axios.get("http://localhost:4000/cursos"); // Asegúrate que la ruta sea correcta
    console.log(response.data)
    return response.data; // Devuelve los cursos obtenidos
  } catch (error) {
    // Manejo de errores en caso de que la solicitud falle
    console.error("Error fetching courses:", error);
    throw error; // Puedes lanzar el error o devolver un valor por defecto
  }
};
