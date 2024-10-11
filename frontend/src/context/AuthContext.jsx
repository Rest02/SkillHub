import { createContext, useContext } from "react";
import {
  registerUserApi,
  loginUserApi,
  forgetPasswordRequest,
  verifyRecoveryCodeRequest
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
      localStorage.setItem("token", response.data.token);
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
  
  

  //---------------------------------------------------------------------------

  return (
    <AuthContext.Provider value={{ registerUser, loginUser, forgetPassword, verifyRecoveryCode }}>
      {children}
    </AuthContext.Provider>
  );
};
