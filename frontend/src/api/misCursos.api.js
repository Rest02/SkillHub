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

export const deleteCursoApi = async (courseId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aún no se inicia sesión");
      return null;
    }

    const response = await axios.delete("http://localhost:4000/misCursos", {
      headers: {
        Authorization: `Bearer ${token}`, // Incluye el token en los headers
        "Content-Type": "application/json", // Asegúrate de incluir este encabezado
      },
      data: { courseId }, // Envía el courseId en el cuerpo
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Error de autenticación. Usuario no autorizado.");
    } else {
      console.error("Error al eliminar el curso:", error);
    }
    return null; // Retorna null si ocurre un error
  }
};



export const deleteClaseApi = async (courseId, unidad_Id, video_Id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aún no se ha iniciado sesión.");
      return null;
    }


    // Realizar la solicitud DELETE para eliminar la clase (video) de la unidad
    const response = await axios.delete(
      `http://localhost:4000/clase/${courseId}/delete`, // Aquí está la ruta correcta
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          unidad_id: unidad_Id, // Asegúrate de enviar estos datos correctamente en el cuerpo
          video_id: video_Id,
        },
      }
    );

    return response.data; // Asegúrate de retornar la respuesta para usarla en el frontend
  } catch (error) {
    console.error("Error al eliminar la clase:", error);
    return null;
  }
};



export const deleteUnitApi = async (courseId, unidadId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aún no se ha iniciado sesión.");
      return null;
    }

    // Realizar la solicitud DELETE con datos en el body
    const response = await axios.delete(
      `http://localhost:4000/unidad/${courseId}/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { unidadId }, // Enviar el unidadId en el body
      }
    );

    console.log("Unidad eliminada exitosamente:", response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Error de autenticación. Usuario no autorizado.");
    } else if (error.response && error.response.status === 404) {
      console.error("Unidad no encontrada o acceso denegado.");
    } else {
      console.error("Error al eliminar la unidad:", error.response || error.message);
    }
    return null;
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

    // Si no hay unidades o videos, retorna un objeto vacío o maneja el caso
    if (!response.data || response.data.length === 0) {
      console.log("No se encontraron unidades o videos para este curso.");
      return { units: [], videos: [] }; // Ajustar según tu lógica
    }

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
    
    console.log("estas son las diferentes unidades de tal curso : ",response.data)
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


export const updateUnidadApi = async (courseId, unidadData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aún no se ha iniciado sesión.");
      return null;
    }

    const response = await axios.put(



      `http://localhost:4000/units/${courseId}/update`, // Aquí va la ruta para actualizar una unidad
      unidadData, // Los datos de la unidad que deseas actualizar
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Devuelve la respuesta con los datos actualizados
  } catch (error) {
    console.error("Error al actualizar la unidad:", error.response || error.message);
    return null; // Retorna null si hay un error
  }
};





export const getVideosByUnidad = async (courseId, unidadId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aún no se ha iniciado sesión.");
      return [];
    }

    const response = await axios.post(
      `http://localhost:4000/clase/${courseId}/videos`, // Ruta actualizada
      { unidadId }, // Enviar unidadId en el cuerpo
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Especificar JSON como tipo de contenido
        },
      }
    );

    console.log("Videos obtenidos de la unidad:", response.data);
    return response.data; // Retorna los videos asociados a la unidad
  } catch (error) {
    console.error("Error al obtener los videos:", error);
    return []; // Retorna un array vacío en caso de error
  }
};




export const updateVideoApi = async (courseId, videoId, videoData, videoFile) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aún no se ha iniciado sesión.");
      return null;
    }

    // Crear un FormData para enviar los datos del video y el archivo
    const formData = new FormData();
    formData.append("videoId", videoId);  // ID del video que se va a actualizar
    formData.append("nombre", videoData.nombre); // Nombre del video
    formData.append("descripcion", videoData.descripcion); // Descripción del video

    if (videoFile) {
      formData.append("video", videoFile);  // Archivo de video (si hay uno)
    }

    // Realizar la solicitud PUT para actualizar el video
    const response = await axios.put(
      `http://localhost:4000/clase/${courseId}/videos`,  // Ruta del endpoint
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Asegúrate de incluir el token de autenticación
          "Content-Type": "multipart/form-data",  // Especifica que el contenido es FormData
        },
      }
    );

    console.log("Video actualizado correctamente:", response.data);
    return response.data;  // Devuelve los datos de la respuesta del servidor
  } catch (error) {
    console.error("Error al actualizar el video:", error.response || error.message);
    return null;  // Retorna null si hay un error
  }
};
