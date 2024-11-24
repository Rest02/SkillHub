import React, { useState, useEffect, useContext } from "react";
import {
  getMisCursosApi,
  createCourseApi,
  getCategoriasApi,
  getUnitsAndVideosApi,
  crearUnidad,
  getUnitsOfCourseApi,
} from "../api/misCursos.api";
import { AuthContext } from "./AuthContext";

export const MisCursosContext = React.createContext();

export const MisCursosProvider = ({ children }) => {
  const [cursos, setCursos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [unidades, setUnidades] = useState([]); // Define el estado de las unidades
  const { userRole } = useContext(AuthContext);

  // Obtener los cursos
  useEffect(() => {
    const fetchCursos = async () => {
      if (userRole) {
        try {
          const data = await getMisCursosApi();
          setCursos(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Error al obtener los cursos:", error);
        }
      }
    };
    fetchCursos();
  }, [userRole]);

  // Obtener las categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      if (userRole) {
        try {
          const data = await getCategoriasApi();
          setCategorias(data);
        } catch (error) {
          console.error("Error al obtener categorías:", error);
        }
      }
    };
    fetchCategorias();
  }, [userRole]);


  // Obtener las categorías
  useEffect(() => {
    const fetchUnidades = async () => {
      if (userRole && cursos.length > 0) { // Verificar si cursos están disponibles
        try {
          // Asegúrate de obtener un curso específico, por ejemplo, el primero de la lista
          const courseId = cursos[0]?.id; // O selecciona el curso adecuado
          if (courseId) {
            const data = await getUnitsOfCourseApi(courseId); // Pasar courseId
            setUnidades(data);
          }
        } catch (error) {
          console.error("Error al obtener unidades:", error);
        }
      }
    };
    fetchUnidades();
  }, [userRole, cursos]); // Dependencia de cursos
  



  // Obtener unidades y videos
  const getUnitsAndVideos = async (courseId) => {
    try {
      return await getUnitsAndVideosApi(courseId);
    } catch (error) {
      console.error("Error al obtener unidades y videos:", error);
      return null;
    }
  };

  // Crear un curso
  const createCourse = async (courseData, thumbnailFile) => {
    try {
      const result = await createCourseApi(courseData, thumbnailFile);
      if (result) {
        const updatedCursos = await getMisCursosApi();
        setCursos(updatedCursos);
      }
    } catch (error) {
      console.error("Error al crear el curso:", error);
    }
  };

  // Función para crear una unidad dentro de un curso
  const createUnidad = async (courseId, unidadData) => {
    try {
      return await crearUnidad(courseId, unidadData);
    } catch (error) {
      console.error("Error al crear unidad:", error);
      return { success: false, message: "Error al crear unidad" };
    }
  };




  return (
    <MisCursosContext.Provider
      value={{
        cursos,
        categorias,
        createCourse,
        getUnitsAndVideos,
        createUnidad,
        unidades
      }}
    >
      {children}
    </MisCursosContext.Provider>
  );
};
