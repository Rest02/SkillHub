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
