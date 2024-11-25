// misCursos.api.js
import axios from "axios";

export const getMisCursosApi = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aún no se inicia sesion");
      return [];
    }

    const response = await axios.get("http://localhost:4000/misCursos", {
      headers: {
        Authorization: `Bearer ${token}`, // Asegúrate de incluir el token en los headers
      },
    });

    // console.log("datos de los cursos del usuario", response.data)
    console.log("los cursos del usuario", response.data)
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

// Crear un curso
export const createCourseApi = async (courseData, thumbnailFile) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aún no se ha iniciado sesión.");
      return;
    }

    // Crear FormData para enviar el archivo junto con los datos del curso
    const formData = new FormData();
    formData.append("titulo", courseData.titulo);
    formData.append("descripcion", courseData.descripcion);
    formData.append("categoria_id", courseData.categoria_id);
    formData.append("precio", courseData.precio);
    formData.append("modalidad", courseData.modalidad);

    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile); // Agregar el archivo de la portada
    }

    // Realizar la solicitud POST para crear el curso
    const response = await axios.post(
      "http://localhost:4000/courses",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token de autenticación
          "Content-Type": "multipart/form-data", // Indicar que estamos enviando FormData
        },
      }
    );

    return response.data; // Devuelve la respuesta del backend (confirmación de creación)
  } catch (error) {
    console.error("Error al crear el curso:", error.response || error.message);
    return null; // Retorna null si hay un error
  }
};

export const getCategoriasApi = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aún no se inicia sesión");
      return [];
    }

    const response = await axios.get("http://localhost:4000/categorias", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Asegúrate que esto sea un array de categorías
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return [];
  }
};

export const getUnitsAndVideosApi = async (courseId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aún no se ha iniciado sesión.");
      return null;
    }

    const response = await axios.get(
      `http://localhost:4000/courses/${courseId}/unitsandvideos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Devuelve los datos de la API
  } catch (error) {
    console.error("Error al obtener las unidades y videos del curso:", error);
    return null;
  }
};


export const crearUnidad = async (courseId, unidadData) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/courses/${courseId}/units`,
      unidadData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Asegúrate de tener el token del instructor
        },
      }
    );
    
    return { success: true }; // Asegúrate de devolver esta estructura
  } catch (error) {
    console.error("Error al crear unidad:", error);
    return { success: false, message: "Error al crear unidad" };
  }
};


export const getUnitsOfCourseApi = async (courseId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aún no se ha iniciado sesión.");
      return [];
    }

    const response = await axios.get(
      `http://localhost:4000/units/${courseId}/videos`, // Ruta que has creado en el backend
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    // console.log("estas son las diferentes unidades de tal curso : ",response.data)
    return response.data; // Retorna las unidades del curso
  } catch (error) {
    console.error("Error al obtener unidades:", error);
    return []; // Retorna un array vacío si hay un error
  }
};


export const uploadVideoApi = async (cursoId, unidadId, videoData, videoFile) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aún no se ha iniciado sesión.");
      return null;
    }

    // Crear FormData para enviar el archivo de video junto con los datos
    const formData = new FormData();
    formData.append("unidad_id", unidadId);
    formData.append("nombre", videoData.nombre);
    formData.append("descripcion", videoData.descripcion);
    formData.append("video", videoFile); // El archivo de video

    // Realizar la solicitud POST para subir el video

    console.log("Curso ID antes de la solicitud:", cursoId);

    const response = await axios.post(
      `http://localhost:4000/units/${cursoId}/videos`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Video subido exitosamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al subir el video:", error.response || error.message);
    return null;
  }
};
