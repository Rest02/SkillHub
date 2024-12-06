import React, { createContext, useContext, useState, useCallback } from "react";
import {
  fetchCourseUnits,
  createResponseToComment,
  createComment, // Importar la nueva función
} from "../api/hacercurso.api";

// Crear el contexto
const HacerCursoContext = createContext();

// Proveedor del contexto
export const HacerCursosProvider = ({ children }) => {
  const [courseUnits, setCourseUnits] = useState([]); // Unidades del curso
  const [loading, setLoading] = useState(false); // Estado de carga
  const [responseLoading, setResponseLoading] = useState(false); // Estado de carga para la respuesta
  const [commentLoading, setCommentLoading] = useState(false); // Estado de carga para los comentarios
  const [responseError, setResponseError] = useState(null); // Estado de error para la respuesta
  const [commentError, setCommentError] = useState(null); // Estado de error para los comentarios
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
          content
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

  // Función para crear un comentario
  const createNewComment = useCallback(
    async (token, courseId, videoId, content) => {
      setCommentLoading(true);
      setCommentError(null);
      try {
        const data = await createComment(token, courseId, videoId, content); // Llamada a la API para crear el comentario
        return data; // Devuelve los datos del comentario creado
      } catch (err) {
        setCommentError("Error al crear el comentario."); // Manejar el error
        throw err;
      } finally {
        setCommentLoading(false); // Desactivar el estado de carga
      }
    },
    []
  );

  // Proveer estado y funciones al contexto
  return (
    <HacerCursoContext.Provider
      value={{
        courseUnits,
        loading,
        error,
        loadCourseUnits,
        createResponse,
        responseLoading,
        responseError,
        createNewComment, // Proveer la nueva función
        commentLoading,
        commentError, // Proveer el estado de error para los comentarios
      }}
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
