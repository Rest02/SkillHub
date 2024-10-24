// perfil.api.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/perfil';

export const getPerfilRequest = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil:', error.response ? error.response.data : error.message);
    throw error;
  }
};
