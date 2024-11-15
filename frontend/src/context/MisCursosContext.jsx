// MisCursosContext.jsx

import React, { useState, useEffect } from "react";
import { getMisCursosApi } from "../api/misCursos.api"; // Importamos la API

export const MisCursosContext = React.createContext();

export const MisCursosProvider = ({ children }) => {
  const [cursos, setCursos] = useState([]); // Aseguramos que sea un array vacío por defecto

  useEffect(() => {
    // Función para obtener los cursos cuando el componente se monta
    const fetchCursos = async () => {
      try {
        const data = await getMisCursosApi(); // Llamamos a la API para obtener los cursos
        // Aseguramos que data sea un array
        setCursos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
        setCursos([]); // Si hay un error, establecemos un array vacío
      }
    };

    fetchCursos(); // Llamamos a la función para obtener los cursos
  }, []); // Este efecto solo se ejecutará una vez al montar el componente

  return (
    <MisCursosContext.Provider value={{ cursos }}>
      {children} {/* Proporcionamos los cursos a los componentes hijos */}
    </MisCursosContext.Provider>
  );
};
