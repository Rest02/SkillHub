import React, { useState, useEffect, useContext } from "react";
import { getMisCursosApi, createCourseApi, getCategoriasApi } from "../api/misCursos.api";
import { AuthContext } from "./AuthContext";

export const MisCursosContext = React.createContext();

export const MisCursosProvider = ({ children }) => {
  const [cursos, setCursos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const { userRole } = useContext(AuthContext);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        if (userRole) {
          const data = await getMisCursosApi();
          setCursos(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
        setCursos([]);
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

  const createCourse = async (courseData, thumbnailFile) => {
    const result = await createCourseApi(courseData, thumbnailFile);
    if (result) {
      setCursos((prevCursos) => [...prevCursos, result]);
    } else {
      console.error("Error al crear el curso");
    }
  };

  return (
    <MisCursosContext.Provider value={{ cursos, createCourse, categorias }}>
      {children}
    </MisCursosContext.Provider>
  );
};
