import React, { createContext, useState, useContext } from "react";
import { fetchUserCourses } from "../api/aprendizaje.api";

const AprendizajeContext = createContext();

export const useAprendizaje = () => {
  return useContext(AprendizajeContext);
};

export const AprendizajeProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCourses = async (token) => {
    setLoading(true);
    try {
      const response = await fetchUserCourses(token); // Llamada a la API
      setCourses(response); // Actualiza el estado de los cursos
    } catch (error) {
      setError('Error al obtener los cursos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AprendizajeContext.Provider
      value={{
        courses,
        loading,
        error,
        getCourses,
      }}
    >
      {children}
    </AprendizajeContext.Provider>
  );
};
