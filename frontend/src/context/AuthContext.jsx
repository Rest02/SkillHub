import { createContext, useContext, useEffect, useState } from "react";
import {
  registerUserApi,
  loginUserApi,
  forgetPasswordRequest,
  verifyRecoveryCodeRequest,
  changePasswordRequest,
  updateUserRoleApi,  // Importa la función updateUserRoleApi
  verifyUserApi,  // Importa la función de verificación


} from "../api/auth.api";
import jwt_decode from "jwt-decode"; // Usar jwt_decode, no decode

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
  const [userRole, setUserRole] = useState(null); // Estado para almacenar el rol

  // useEffect que se ejecuta cuando el componente se monta
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Token guardado:", storedToken); // Verifica si el token se recupera correctamente

    if (storedToken) {
      setToken(storedToken);
      try {
        const decodedToken = jwt_decode(storedToken); // Decodificar el token para obtener el rol
        console.log("Token decodificado:", decodedToken); // Verifica la estructura del token decodificado
        if (decodedToken && decodedToken.rol) {
          setUserRole(decodedToken.rol); // Asumimos que el rol está en la propiedad 'role' del token
        } else {
          console.error("No se encontró un rol en el token");
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []); // Este useEffect solo se ejecuta una vez cuando el componente se monta

  // useEffect para escuchar cambios en userRole
  useEffect(() => {
    if (userRole !== null) {
      console.log("Rol del usuario actualizado:", userRole); // Aquí se muestra el rol actualizado
    }
  }, [userRole]); // Este useEffect se ejecuta cada vez que userRole cambia

  //------------------ Apartado de Cuentas Login y más ------------------------

  const registerUser = async (data) => {
    try {
      const response = await registerUserApi(data); // Solicitud al backend
      if (response.data.verificationToken) {
        const verificationToken = response.data.verificationToken;
        localStorage.setItem("verificationToken", verificationToken); // Guarda el token en localStorage
        // Si deseas, puedes actualizar un estado de token en el contexto (si es necesario)
      }
      return response; // Devuelve la respuesta al componente
    } catch (error) {
      console.error(error.response?.data?.message || "Error desconocido");
      throw error; // Lanza el error al componente
    }
  };
  
  

  const loginUser = async (data) => {
    try {
      const response = await loginUserApi(data);
      if (response.data.token) {
        const newToken = response.data.token;
        localStorage.setItem("token", newToken); // Guarda el token en localStorage
        setToken(newToken); // Actualiza el estado del token
  
        // Decodifica el token para extraer el rol del usuario
        try {
          const decodedToken = jwt_decode(newToken);
          if (decodedToken && decodedToken.rol) {
            setUserRole(decodedToken.rol); // Actualiza el rol del usuario
          } else {
            console.error("No se encontró un rol en el token");
          }
        } catch (decodeError) {
          console.error("Error al decodificar el token:", decodeError);
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
  

  const forgetPassword = async (values) => {
    try {
      const response = await forgetPasswordRequest(values);
      const token = response.data.token; // Aquí obtienes el token
      return token; // Devuelve el token aquí
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Función para verificar el código de recuperación
  const verifyRecoveryCode = async (code, token) => {
    try {
      const response = await verifyRecoveryCodeRequest(code, token);
      console.log(response.data); // Verifica la respuesta del servidor
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

  // Función para cambiar el rol del usuario
  const updateRole = async (userId, newRole) => {
    try {
      const response = await updateUserRoleApi(userId, newRole);
      if (response.status === 200) {
        // Si la actualización es exitosa, actualiza el rol en el estado
        setUserRole(newRole);
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error al cambiar el rol');
    }
  };


  const verifyUser = async (code) => {
    try {
      const response = await verifyUserApi(code); // Llamada a la API de verificación
      return response; // Retorna la respuesta del backend
    } catch (error) {
      console.error("Error al verificar al usuario:", error);
      throw error; // Lanza el error para que sea manejado en el componente
    }
  };

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        forgetPassword,
        verifyRecoveryCode,
        changePassword,
        token,
        userRole,
        setToken,
        updateRole, // Exponer la función updateRole
        verifyUser

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
