import React, { useState, useEffect, useContext } from "react";
import {
  getMisCursosApi,
  createCourseApi,
  getCategoriasApi,
  getUnitsAndVideosApi,
  crearUnidad,
  getUnitsOfCourseApi,
  uploadVideoApi,
  updateUnidadApi,
  updateVideoApi
} from "../api/misCursos.api";
import { AuthContext } from "./AuthContext";

export const MisCursosContext = React.createContext();

export const MisCursosProvider = ({ children }) => {
  const [cursos, setCursos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [unidades, setUnidades] = useState([]); // Define el estado de las unidades

  const [cursoSeleccionado, setCursoSeleccionado] = useState(null); // Estado para el curso seleccionado

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
      if (userRole && cursoSeleccionado) {
        try {
          const data = await getUnitsOfCourseApi(cursoSeleccionado.id); // Obtener unidades del curso seleccionado
          setUnidades(data);
        } catch (error) {
          console.error("Error al obtener unidades:", error);
        }
      }
    };
    fetchUnidades();
  }, [userRole, cursoSeleccionado]); // Dependencia en cursoSeleccionado

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
      const result = await crearUnidad(courseId, unidadData);
      // Después de crear la unidad, volvemos a cargar las unidades para el curso
      if (result.success) {
        const updatedUnidades = await getUnitsOfCourseApi(courseId);
        setUnidades(updatedUnidades); // Actualizamos el estado de unidades
      }
      return result;
    } catch (error) {
      console.error("Error al crear unidad:", error);
      return { success: false, message: "Error al crear unidad" };
    }
  };

  const uploadVideo = async (cursoId, unidadId, videoData, videoFile) => {
    try {
      return await uploadVideoApi(cursoId, unidadId, videoData, videoFile);
    } catch (error) {
      console.error("Error al subir el video:", error);
      return { success: false, message: "Error al subir el video" };
    }
  };

  // Exponer updateUnidadApi en el contexto
  const actualizarUnidad = async (courseId, unidadId, unidadData) => {
    try {
      const result = await updateUnidadApi(courseId, { unidadId, ...unidadData });
      if (result) {
        const updatedUnidades = await getUnitsOfCourseApi(courseId);
        setUnidades(updatedUnidades); // Actualizar las unidades del estado después de editar
      }
      return result;
    } catch (error) {
      console.error("Error al actualizar la unidad:", error);
      return null;
    }
  };


    // Asegúrate de agregar esta función en tu contexto para actualizar videos
  const updateVideo = async (courseId, videoId, videoData, videoFile) => {
    try {
      const result = await updateVideoApi(courseId, videoId, videoData, videoFile);
      return result; // Devuelve el resultado, que será utilizado en el componente
    } catch (error) {
      console.error("Error al actualizar el video:", error);
      return { success: false, message: "Error al actualizar el video" };
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
        unidades,
        uploadVideo,
        setCursoSeleccionado,
        actualizarUnidad,
        updateVideo
      }}
    >
      {children}
    </MisCursosContext.Provider>
  );
};
