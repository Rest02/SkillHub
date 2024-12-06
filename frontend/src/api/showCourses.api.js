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



export const getCourseDetailsApi = async (courseId) => {
  try {
    // Realizar la solicitud GET al endpoint de detalles del curso
    const response = await axios.get(`http://localhost:4000/courses/${courseId}/details`);
    
    console.log(response.data); // Imprimir los datos recibidos (opcional)
    return response.data; // Devuelve los detalles del curso
  } catch (error) {
    // Manejo de errores
    console.error(`Error fetching course details for course ID ${courseId}:`, error);
    throw error; // Lanza el error para manejarlo en el lugar donde se llama a la función
  }
};



export const getRatingsForCourseApi = async (courseId) => {
  try {
    // Hacer la solicitud al backend para obtener las valoraciones de un curso
    const response = await axios.get(`http://localhost:4000/ratings/${courseId}`);
    console.log("datos", response.data)
    return response.data; // Devolver los datos de valoraciones
  } catch (error) {
    console.error("Error al obtener las valoraciones del curso:", error);
    throw error; // Lanzar el error para ser manejado más tarde
  }
};

export const createRatingApi = async (courseId, rating, comment) => {
  try {
    // Obtener el token desde el almacenamiento local o donde lo tengas almacenado
    const token = localStorage.getItem("token"); // Asumiendo que el token está guardado en localStorage

    // Realizar la solicitud POST para crear la valoración
    const response = await axios.post(
      `http://localhost:4000/valoracion/${courseId}`,
      {
        rating,    // Valoración del curso (por ejemplo, un número entre 1 y 5)
        comment,   // Comentario del curso
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Añadir el token de autenticación al header
        },
      }
    );
    
    console.log(response.data); // Imprimir la respuesta del servidor
    return response.data; // Devuelve la respuesta (mensaje de éxito o error)
  } catch (error) {
    console.error("Error al crear la valoración:", error);
    throw error; // Lanzar el error para manejarlo más tarde
  }
};