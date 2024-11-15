// misCursos.api.js

import axios from 'axios';

export const getMisCursosApi = async () => {
  try {
    const response = await axios.get("http://localhost:4000/misCursos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Usamos el token almacenado en el localStorage
      },
    });
    return response.data; // Asegúrate de retornar solo los datos del curso
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    throw error; // Lanza el error para manejarlo en el contexto
  }
};
