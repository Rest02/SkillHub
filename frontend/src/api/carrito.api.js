import axios from "axios";

// Configura la base URL de tu API
const API_BASE_URL = "http://localhost:4000"; // Ajusta esta URL según tu configuración

// Función para obtener el carrito del usuario logueado
export const getCarrito = async (token) => {
  try {
    // Realizar la solicitud GET a la API
    const response = await axios.get(`${API_BASE_URL}/carrito`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pasar el token en los headers
      },
    });

    // Verificar si la respuesta contiene los datos esperados
    if (response.data && response.data.carrito) {
      return response.data.carrito; // Retornar solo los datos del carrito
    } else {
      throw new Error("Formato inesperado en la respuesta del servidor");
    }
  } catch (error) {
    // Manejo de errores
    if (error.response) {
      // Si el servidor responde con un error
      console.error("Error en la respuesta:", error.response.data);
      throw new Error(error.response.data.message || "Error al obtener el carrito");
    } else if (error.request) {
      // Si no hay respuesta del servidor
      console.error("Error en la solicitud:", error.request);
      throw new Error("No se recibió respuesta del servidor");
    } else {
      // Otros errores
      console.error("Error:", error.message);
      throw new Error("Ocurrió un error desconocido");
    }
  }
};



// Función para eliminar un curso del carrito
export const deleteFromCarrito = async (token, carritoId) => {
  try {
    // Realizar la solicitud DELETE a la API
    const response = await axios.delete(`${API_BASE_URL}/carrito`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pasar el token en los headers
      },
      data: { carritoId }, // Enviar carritoId en el cuerpo de la solicitud
    });

    // Verificar si la eliminación fue exitosa
    if (response.data && response.data.success) {
      return response.data.message; // Retornar el mensaje de éxito
    } else {
      throw new Error(response.data.message || "Error al eliminar el curso del carrito");
    }
  } catch (error) {
    // Manejo de errores
    if (error.response) {
      // Si el servidor responde con un error
      console.error("Error en la respuesta:", error.response.data);
      throw new Error(error.response.data.message || "Error al eliminar el curso del carrito");
    } else if (error.request) {
      // Si no hay respuesta del servidor
      console.error("Error en la solicitud:", error.request);
      throw new Error("No se recibió respuesta del servidor");
    } else {
      // Otros errores
      console.error("Error:", error.message);
      throw new Error("Ocurrió un error desconocido");
    }
  }
};


export const addToCarrito = async (token, courseId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/showcourseuser/${courseId}/details`,
      {}, // No es necesario enviar cuerpo porque solo usas courseId en los params
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pasar el token en los headers
        },
      }
    );

    if (response.data && response.data.success) {
      return response.data.message; // Retornar el mensaje de éxito
    } else {
      throw new Error(response.data.message || "Error al añadir el curso al carrito");
    }
  } catch (error) {
    handleError(error, "Error al añadir el curso al carrito");
  }
};
