import React, { useState, useEffect, useContext } from "react";
import { getMisCursosApi, createCourseApi } from "../api/misCursos.api"; // Importamos la API
import { AuthContext } from "./AuthContext"; // Importa el contexto de autenticación

export const MisCursosContext = React.createContext();

export const MisCursosProvider = ({ children }) => {
  const [cursos, setCursos] = useState([]);
  const { userRole } = useContext(AuthContext); // Obtenemos el rol del usuario desde AuthContext

  useEffect(() => {
    // Función para obtener los cursos cuando cambia el rol del usuario
    const fetchCursos = async () => {
      try {
        if (userRole) { // Solo intentamos obtener cursos si hay un rol definido
          const data = await getMisCursosApi();
          setCursos(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
        setCursos([]); // Si hay un error, establecemos un array vacío
      }
    };

    fetchCursos(); // Llamamos a la función para obtener los cursos
  }, [userRole]); // Este efecto se ejecutará cada vez que cambie el rol del usuario


  const createCourse = async (courseData, thumbnailFile) => {
    const result = await createCourseApi(courseData, thumbnailFile);
    if (result) {
      // Si la creación fue exitosa, actualizamos el estado con el nuevo curso
      setCursos((prevCursos) => [...prevCursos, result]); // Agrega el nuevo curso al array de cursos
    } else {
      console.error("Error al crear el curso");
    }
  };
  return (
    <MisCursosContext.Provider value={{ cursos, createCourse }}>
      {children}
    </MisCursosContext.Provider>
  );
};
