// PerfilContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getPerfilRequest, updateEmailRequest } from "../api/perfil.api"; // Importar la función de la API

// Crear el contexto
const PerfilContext = createContext();

// Hook para usar el contexto del perfil en otros componentes
export const usePerfil = () => {
  return useContext(PerfilContext);
};

// Componente proveedor del contexto
export const PerfilProvider = ({ children }) => {
  const [perfil, setPerfil] = useState(null); // Estado para almacenar el perfil
  const [loading, setLoading] = useState(true); // Estado para saber si está cargando
  const [error, setError] = useState(null); // Estado para errores

  // Obtener el token desde localStorage si no está disponible en el AuthContext
  const token = localStorage.getItem("token");
  // Función para obtener el perfil
  const getPerfil = async () => {
    if (!token) {
      setError("No hay token disponible");
      setLoading(false);
      return;
    }

    try {
      const data = await getPerfilRequest(token); // Llamar a la API con el token
      setPerfil(data); // Guardar los datos del perfil en el estado
    } catch (error) {
      setError("Error obteniendo el perfil");
      console.error("Error obteniendo el perfil:", error);
    } finally {
      setLoading(false); // Asegúrate de actualizar el estado de `loading`
    }
  };

  const updateEmail = async (newEmail) => {
    try {
      const response = await updateEmailRequest(token, newEmail);
      console.log("Correo actualizado:", response);
    } catch (error) {
      console.error("Error al actualizar el correo:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getPerfil(); // Solo llamar a getPerfil si el token está disponible
    }
  }, [token]); // Solo volver a obtener el perfil cuando el token cambie

  return (
    <PerfilContext.Provider value={{ perfil, loading, error, getPerfil, updateEmail }}>
      {children}
    </PerfilContext.Provider>
  );
};
