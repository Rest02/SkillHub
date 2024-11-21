import React, { useState, useEffect, useContext } from "react";
import { getMisCursosApi, createCourseApi, getCategoriasApi } from "../api/misCursos.api";
import { AuthContext } from "./AuthContext";

export const MisCursosContext = React.createContext();

export const MisCursosProvider = ({ children }) => {
  const [cursos, setCursos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const { userRole } = useContext(AuthContext);

  // Obtener los cursos del backend cuando cambia el rol del usuario
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        if (userRole) {
          const data = await getMisCursosApi();
          setCursos(Array.isArray(data) ? data : []); // Asegura que los cursos son un array
        }
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
        setCursos([]); // Si hay error, vacía los cursos
      }
    };

    fetchCursos();
  }, [userRole]);

  // Obtener las categorías desde el backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await getCategoriasApi();
        setCategorias(response);  // Asumiendo que tu backend devuelve un array de categorías
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  // Función para crear un nuevo curso
  const createCourse = async (courseData, thumbnailFile) => {
    try {
      const result = await createCourseApi(courseData, thumbnailFile);
      if (result) {
        // Después de agregar el curso, obtener los cursos actualizados
        const updatedCursos = await getMisCursosApi();
        setCursos(updatedCursos);  // Actualiza la lista completa de cursos
      } else {
        console.error("Error al crear el curso");
      }
    } catch (error) {
      console.error("Error al crear el curso:", error);
    }
  };
  

  return (
    <MisCursosContext.Provider value={{ cursos, createCourse, categorias }}>
      {children}
    </MisCursosContext.Provider>
  );
};
