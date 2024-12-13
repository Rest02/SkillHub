import axios from "axios";

//------------------ Apartado de Cuentas Login y mas ------------------------

// Register and login

export const registerUserApi = async (user) => {
  return await axios.post("http://localhost:4000/register", user);
};

export const loginUserApi = async (user) => {
  return await axios.post("http://localhost:4000/login/", user);
};

// Petición para enviar el correo de recuperación
export const forgetPasswordRequest = async (email) => {
  return await axios.post("http://localhost:4000/forgetPassword", email);
};

// Petición para verificar el código de recuperación
export const verifyRecoveryCodeRequest = async (code, token) => {
  return await axios.post(`http://localhost:4000/verifyRecoveryCode/${token}`, {
    code,
  });
};

// Función para cambiar la contraseña
export const changePasswordRequest = async (token, newPassword) => {
  const response = await axios.post(
    `http://localhost:4000/changePassword/${token}`,
    { newPassword }
  );
  return response.data;
};

//---------------------------------------------------------------------------



export const updateUserRoleApi = async (userId, newRole) => {
  const token = localStorage.getItem("token"); // Obtener el token del localStorage

  if (!token) {
    throw new Error("No hay token disponible");
  }

  return await axios.put(
    "http://localhost:4000/users/update-role", 
    { userId, newRole },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Asegúrate de enviar el token en los encabezados
      }
    }
  );
};


// Función para verificar al usuario registrado , CODIGO
export const verifyUserApi = async (code) => {
  const token = localStorage.getItem("verificationToken"); // Obtener el token del localStorage si es necesario
  console.log("obteniendo el token para verificar", token)

  if (!token) {
    throw new Error("No hay token disponible");
  }

  try {
    const response = await axios.post(
      `http://localhost:4000/verifyUser`, 
      { code },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Si necesitas enviar un token de autorización
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al verificar el usuario", error);
    throw error;
  }
};
