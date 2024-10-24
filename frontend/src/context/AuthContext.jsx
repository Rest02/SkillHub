import { createContext, useContext , useEffect, useState} from "react";
import {
  registerUserApi,
  loginUserApi,
  forgetPasswordRequest,
  verifyRecoveryCodeRequest,
  changePasswordRequest
} from "../api/auth.api";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("El contexto tiene que estar dentro del provider");
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  //------------------ Apartado de Cuentas Login y mas ------------------------

  const registerUser = async (data) => {
    try {
      const response = await registerUserApi(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (data) => {
    try {
      const response = await loginUserApi(data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Asegúrate de que el token se guarda aquí
        console.log("Token guardado en localStorage:", response.data.token); // Verifica que el token se guarda correctamente
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  

  const forgetPassword = async (values) => {
    try {
      const response = await forgetPasswordRequest(values);
      // Captura el token de la respuesta
      const token = response.data.token; // Aquí obtienes el token

      return token; // Devuelve el token aquí
    } catch (error) {
      console.error(error);
      throw error; // Lanzar el error para que sea manejado en el componente
    }
  };

  // Función para verificar el código de recuperación
  const verifyRecoveryCode = async (code, token) => {
    try {
      const response = await verifyRecoveryCodeRequest(code, token);
      console.log(response.data); // Verifica la respuesta del servidor

      // Si la respuesta es exitosa, puedes manejar el siguiente paso, por ejemplo:
      // Redirigir a la página para cambiar la contraseña
      return response.data; // Asegúrate de retornar lo que necesites
    } catch (error) {
      console.error(error); // Manejo de errores
    }
  };

  // Función para cambiar la contraseña
  const changePassword = async (newPassword, token) => {
    try {
      const response = await changePasswordRequest(token, newPassword);
      return response; // Retornar la respuesta del backend
    } catch (error) {
      console.error("Error cambiando la contraseña:", error.message);
      throw error;
    }
  };

  //---------------------------------------------------------------------------

  return (
    <AuthContext.Provider
      value={{ registerUser, loginUser, forgetPassword, verifyRecoveryCode, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
