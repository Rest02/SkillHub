import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination"; // Si usas pagination de Material UI para mantener la misma funcionalidad

function DescripcionCurso({ course, units }) {
  const [expanded, setExpanded] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const unidadesPorPagina = 10;
  const navigate = useNavigate();

  if (!units || units.length === 0) {
    return (
      <div className="flex justify-center items-center p-6 bg-black text-white">
        <p className="text-xl font-semibold text-center bg-red-600 px-6 py-4 rounded-lg shadow-md">
          No hay unidades disponibles para este curso.
        </p>
      </div>
    );
  }

  // Función para manejar el cambio de página
  const handleChangePagina = (event, value) => {
    setPaginaActual(value);
  };

  // Calculamos las unidades que se deben mostrar en la página actual
  const unidadesAMostrar = units.slice(
    (paginaActual - 1) * unidadesPorPagina,
    paginaActual * unidadesPorPagina
  );

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Calculamos el número total de páginas
  const totalPaginas = Math.ceil(units.length / unidadesPorPagina);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl mb-6 underline text-black">{course.titulo}</h1>

      {unidadesAMostrar.map((unit, index) => (
        <div key={unit.unidad_id} className="group flex flex-col gap-3 bg-gray-800 p-4 rounded-lg mb-4">
          <div
            className="flex cursor-pointer items-center justify-between text-lg font-semibold"
            onClick={() => setExpanded(expanded === `panel${index}` ? false : `panel${index}`)}
          >
            <span>{`Unidad ${index + 1}: ${unit.unidad_titulo}`}</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
              className={`h-3 w-4 transition-all duration-500 ${expanded === `panel${index}` ? "-rotate-180" : ""}`}
            />
          </div>

          <div
            className={`transition-all max-h-0 overflow-hidden ${expanded === `panel${index}` ? "max-h-screen opacity-100 visible" : "opacity-0 invisible"}`}
          >
            <ul className="pl-4 text-sm">
              {unit.videos.map((video, videoIndex) => (
                <li key={video.video_id} className="mb-1">
                  <span className="font-semibold">{`${videoIndex + 1}. ${video.video_nombre}`}</span>
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
          color="primary" // Aquí puedes ajustar el color
        />
      </div>
    </div>
  );
}

export default DescripcionCurso;
