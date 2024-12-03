import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCursos } from "../../context/ShowCourseContext.jsx";
import Pagination from "@mui/material/Pagination"; // Importamos la paginación de Material UI

function DescripcionCurso() {
  const { courseId } = useParams(); // Obtener courseId de los parámetros de la URL
  const { courseDetails, fetchCourseDetails, loading, error } = useCursos();
  const [paginaActual, setPaginaActual] = useState(1);
  const [expandedUnit, setExpandedUnit] = useState(null); // Estado para manejar qué unidad está expandida
  const unidadesPorPagina = 10;

  // Convertir courseId a número antes de compararlo
//   const courseIdNumber = Number(courseId);

  // Llamada a la API solo si courseId cambia o si no se han cargado los detalles
  useEffect(() => {
    if (courseId && (!courseDetails || courseDetails.id !== courseId)) {
      fetchCourseDetails(courseId); // Solo hacer la llamada si es necesario
    }
  }, [courseId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  // Verificar que courseDetails y sus propiedades existen antes de renderizar
  if (!courseDetails || !courseDetails.units) {
    return <p>No se encontraron detalles para este curso.</p>;
  }

  // Calculamos las unidades a mostrar por página
  const unidadesAMostrar = courseDetails.units.slice(
    (paginaActual - 1) * unidadesPorPagina,
    paginaActual * unidadesPorPagina
  );

  // Función para manejar el cambio de página
  const handleChangePagina = (event, value) => {
    setPaginaActual(value);
  };

  // Función para manejar la expansión de las unidades
  const handleExpandUnit = (unitIndex) => {
    if (expandedUnit === unitIndex) {
      setExpandedUnit(null); // Colapsa la unidad si ya está expandida
    } else {
      setExpandedUnit(unitIndex); // Expande la unidad
    }
  };

  // Calculamos el número total de páginas
  const totalPaginas = Math.ceil(courseDetails.units.length / unidadesPorPagina);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl mb-6 underline text-black">{courseDetails.course_title}</h1>

      {unidadesAMostrar.map((unidad, index) => (
        <div key={unidad.unit_title} className="group flex flex-col gap-3 bg-gray-800 p-4 rounded-lg mb-4">
          <div
            className="flex cursor-pointer items-center justify-between text-lg font-semibold"
            onClick={() => handleExpandUnit(index)} // Llama a la función para expandir o colapsar
          >
            <span>{`Unidad ${index + 1}: ${unidad.unit_title}`}</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
              className={`h-3 w-4 transition-all duration-500 ${expandedUnit === index ? "-rotate-180" : ""}`}
              alt="Toggle"
            />
          </div>

          {/* Clases de la unidad */}
          <div
            className={`transition-all overflow-hidden ${expandedUnit === index ? "max-h-screen opacity-100 visible" : "max-h-0 opacity-0 invisible"}`}
          >
            <ul className="pl-4 text-sm">
              {unidad.videos.map((video, videoIndex) => (
                <li key={video.video_name} className="mb-1">
                  <span className="font-semibold">{`${videoIndex + 1}. ${video.video_name}`}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* Paginación */}
      <div className="flex justify-center mt-6">
        <Pagination
          count={totalPaginas}
          page={paginaActual}
          onChange={handleChangePagina}
          color="primary"
        />
      </div>
    </div>
  );
}

export default DescripcionCurso;
