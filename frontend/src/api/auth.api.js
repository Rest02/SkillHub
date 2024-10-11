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
  return await axios.post('http://localhost:4000/forgetPassword',  email );
};

// Petición para verificar el código de recuperación
export const verifyRecoveryCodeRequest = async (code, token) => {
  return await axios.post(`http://localhost:4000/verifyRecoveryCode/${token}`, {code} );
};



// Petición para cambiar la contraseña
export const changePasswordRequest = async (newPassword, token) => {
  return await axios.post(`/changePassword/${token}`, { newPassword });
};

//---------------------------------------------------------------------------


