import axios from 'axios';

export const getCursosApiNoAuth = async (filters = {}) => {
  try {
    // Convertir el objeto de filtros en una query string
    const queryParams = new URLSearchParams(filters).toString();
    
    // Realizar la solicitud GET con los parámetros de consulta
    const response = await axios.get(`http://localhost:4000/cursos?${queryParams}`); // Agrega los filtros dinámicamente
    console.log(response.data);
    return response.data; // Devuelve los cursos obtenidos
  } catch (error) {
    // Manejo de errores en caso de que la solicitud falle
    console.error("Error fetching courses:", error);
    throw error; // Puedes lanzar el error o devolver un valor por defecto
  }
};
