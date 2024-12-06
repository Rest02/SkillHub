import React, { createContext, useContext, useState, useCallback } from "react";
import {
  fetchCourseUnits,
  createResponseToComment,
} from "../api/hacercurso.api";

// Crear el contexto
const HacerCursoContext = createContext();

// Proveedor del contexto
export const HacerCursosProvider = ({ children }) => {
  const [courseUnits, setCourseUnits] = useState([]); // Unidades del curso
  const [loading, setLoading] = useState(false); // Estado de carga
  const [responseLoading, setResponseLoading] = useState(false); // Estado de carga para la respuesta
  const [responseError, setResponseError] = useState(null); // Estado de error para la respuesta
  const [error, setError] = useState(null); // Estado de error

  // Función para cargar las unidades del curso
  const loadCourseUnits = useCallback(async (token, courseId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCourseUnits(token, courseId); // Llamada a la API
      setCourseUnits(data); // Establecer las unidades del curso
    } catch (err) {
      setError("Error al obtener las unidades del curso"); // Manejar el error
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  }, []);

  // Función para crear una respuesta a un comentario
  const createResponse = useCallback(
    async (token, courseId, commentId, content) => {
      setResponseLoading(true);
      setResponseError(null);
      try {
        const data = await createResponseToComment(
          token,
          courseId,
          commentId,
          content,
          
        ); // Llamada a la API para crear respuesta
        return data; // Devuelve los datos de la respuesta creada
      } catch (err) {
        setResponseError("Error al crear la respuesta."); // Manejar el error
        throw err;
      } finally {
        setResponseLoading(false); // Desactivar el estado de carga
      }
    },
    []
  );

  // Proveer estado y funciones al contexto
  return (
    <HacerCursoContext.Provider
      value={{ courseUnits, loading, error, loadCourseUnits, createResponse,
        responseLoading,
        responseError }}
    >
      {children}
    </HacerCursoContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useHacerCurso = () => {
  const context = useContext(HacerCursoContext);
  if (!context) {
    throw new Error("useHacerCurso debe usarse dentro de HacerCursosProvider");
  }
  return context;
};
