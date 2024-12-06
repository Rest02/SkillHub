import React, { createContext, useState, useEffect, useContext } from "react";
import { getCursosApiNoAuth, getCourseDetailsApi, getRatingsForCourseApi } from "../api/showCourses.api"; // Importa la función de la API

// Crear el contexto
const ShowCourseContext = createContext();

// Crear el proveedor del contexto
export const ShowCourseProvider = ({ children }) => {
  const [cursos, setCursos] = useState([]); // Cursos cargados
  const [loading, setLoading] = useState(false); // Estado de carga
  const [courseDetails, setCourseDetails] = useState(null); // Detalles de un curso específico
  const [ratings, setRatings] = useState([]); // Valoraciones de un curso
  const [error, setError] = useState(null); // Manejo de errores
  const [filters, setFilters] = useState({}); // Filtros aplicados

  // Función para obtener cursos desde la API
  const fetchCursos = async (appliedFilters = {}) => {
    setLoading(true);
    setError(null); // Limpiar error antes de realizar la búsqueda
    try {
      const data = await getCursosApiNoAuth(appliedFilters);
      if (data.length === 0) {
        setError("No se encontraron cursos con esos filtros."); // Establecer un error si no hay resultados
      }
      setCursos(data);
    } catch (err) {
      setError("Error al obtener los cursos.");
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener detalles de un curso específico
  const fetchCourseDetails = async (courseId) => {
    setLoading(true);
    setError(null); // Limpiar error antes de realizar la búsqueda
    try {
      const data = await getCourseDetailsApi(courseId);
      setCourseDetails(data); // Establecer los detalles del curso en el estado
    } catch (err) {
      setError("Error al obtener los detalles del curso.");
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

  // Función para obtener valoraciones de un curso específico
  const fetchRatingsForCourse = async (courseId) => {
    setLoading(true);
    setError(null); // Limpiar error antes de realizar la búsqueda
    try {
      const data = await getRatingsForCourseApi(courseId); // Llamamos a la API de valoraciones
      setRatings(data.ratings); // Guardamos las valoraciones en el estado
    } catch (err) {
      setError("Error al obtener las valoraciones del curso.");
    } finally {
      setLoading(false);
    }
  };

  
  // Exponer el contexto
  return (
    <ShowCourseContext.Provider
      value={{
        cursos,
        loading,
        error,
        applyFilters,
        fetchCourseDetails,
        courseDetails,
        fetchRatingsForCourse, // Exponer la función para obtener valoraciones
        ratings, // Exponer las valoraciones en el contexto
      }}
    >
      {children}
    </ShowCourseContext.Provider>
  );
};

// Hook para consumir el contexto
export const useCursos = () => {
  return useContext(ShowCourseContext);
};
