import React, { createContext, useState, useEffect, useContext } from "react";
import { getCursosApiNoAuth } from "../api/showCourses.api"; // Importa la función de la API

// Crear el contexto
const ShowCourseContext = createContext();

// Crear el proveedor del contexto
export const ShowCourseProvider = ({ children }) => {
  const [cursos, setCursos] = useState([]); // Cursos cargados
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Manejo de errores
  const [filters, setFilters] = useState({}); // Filtros aplicados

  // Función para obtener cursos desde la API
  const fetchCursos = async (appliedFilters = {}) => {
    setLoading(true);
    setError(null);  // Limpiar error antes de realizar la búsqueda
    try {
      const data = await getCursosApiNoAuth(appliedFilters);
      if (data.length === 0) {
        setError("No se encontraron cursos con esos filtros.");  // Establecer un error si no hay resultados
      }
      setCursos(data);
    } catch (err) {
      setError("Error al obtener los cursos.");
    } finally {
      setLoading(false);
    }
  };
  

  // Efecto para cargar cursos cuando los filtros cambian
  useEffect(() => {
    fetchCursos(filters); // Llama a la API con los filtros actuales
  }, [filters]);

  // Función para actualizar los filtros
  const applyFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters })); // Mezcla los filtros nuevos con los existentes
  };

  // Exponer el contexto
  return (
    <ShowCourseContext.Provider value={{ cursos, loading, error, applyFilters }}>
      {children}
    </ShowCourseContext.Provider>
  );
};

// Hook para consumir el contexto
export const useCursos = () => {
  return useContext(ShowCourseContext);
};
