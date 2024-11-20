// misCursos.api.js
import axios from 'axios';

export const getMisCursosApi = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aún no se inicia sesion");
      return [];
    }

    const response = await axios.get('http://localhost:4000/misCursos', {
      headers: {
        Authorization: `Bearer ${token}`, // Asegúrate de incluir el token en los headers
      },
    });

    return response.data;
  } catch (error) {
    // Capturar error 401 y no interrumpir el flujo
    if (error.response && error.response.status === 401) {
      console.error("Error de autenticación. Usuario no autorizado.");
      // Puedes manejar el error aquí, como redirigir a login o mostrar un mensaje
    } else {
      console.error("Error al obtener los cursos:", error);
    }
    return []; // Retorna un array vacío para no interrumpir el flujo
  }
};
