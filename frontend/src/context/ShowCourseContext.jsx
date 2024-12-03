import React, { createContext, useState, useEffect, useContext } from "react";
import { getCursosApiNoAuth } from "../api/showCourses.api"; // Importa la función de la API

// Crear el contexto
const ShowCourseContext = createContext();

// Crear el proveedor del contexto
export const ShowCourseProvider = ({ children }) => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener los cursos al cargar el componente
  useEffect(() => {
    const fetchCursos = async () => {
      setLoading(true);
      try {
        const data = await getCursosApiNoAuth(); // Llamada a la API
        setCursos(data); // Guardar los cursos en el estado
      } catch (err) {
        setError("Error al obtener los cursos."); // Manejar el error
      } finally {
        setLoading(false); // Cambiar el estado de carga
      }
    };

    fetchCursos(); // Llamada a la función para obtener los cursos
  }, []);

  // Exponer el contexto
  return (
    <ShowCourseContext.Provider value={{ cursos, loading, error }}>
      {children}
    </ShowCourseContext.Provider>
  );
};

// Hook para consumir el contexto
export const useCursos = () => {
  return useContext(ShowCourseContext);
};
