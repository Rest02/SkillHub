import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

function DescripcionCurso({ course, units }) {
  const [expanded, setExpanded] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const unidadesPorPagina = 7; 
  const navigate = useNavigate();

  if (!units || units.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl font-bold text-center bg-red-600 px-6 py-4 rounded-lg shadow-md">
          No hay unidades disponibles para este curso.
        </p>
        <p className="text-md text-gray-400 mt-4">
          Parece que este curso aún no tiene unidades asignadas. Por favor, intenta más tarde o contacta al administrador.
        </p>
      </div>
    );
  }

  const handleChangePagina = (event, value) => {
    setPaginaActual(value);
  };

  const unidadesAMostrar = units.slice(
    (paginaActual - 1) * unidadesPorPagina,
    paginaActual * unidadesPorPagina
  );

  const handleExpand = (panel) => {
    setExpanded(expanded === panel ? false : panel);
  };

  const totalPaginas = Math.ceil(units.length / unidadesPorPagina);

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen rounded-lg">
      {/* Título del curso */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-500">{course.titulo}</h1>
        <p className="text-lg text-gray-400 mt-2">{course.descripcion}</p>
      </div>

      {/* Lista de unidades */}
      <div className="space-y-4">
        {unidadesAMostrar.map((unit, index) => (
          <div
            key={unit.unidad_id}
            className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
          >
            {/* Cabecera de la unidad */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleExpand(`panel${index}`)}
            >
              <h2 className="text-xl font-semibold">{`Unidad ${index + 1}: ${unit.unidad_titulo}`}</h2>
              <span
                className={`transform transition-transform ${
                  expanded === `panel${index}` ? "rotate-180" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>

            {/* Contenido de la unidad */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                expanded === `panel${index}` ? "max-h-screen mt-4" : "max-h-0"
              }`}
            >
              <ul className="pl-4 text-sm space-y-2">
                {unit.videos.map((video, videoIndex) => (
                  <li key={video.video_id} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-4 h-4 text-blue-400"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8c0 4.418-3.582 8-8 8S0 12.418 0 8 3.582 0 8 0s8 3.582 8 8zM7 5.5v5l4-2.5-4-2.5z" />
                    </svg>
                    <span className="text-gray-300">{`${videoIndex + 1}. ${video.video_nombre}`}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-8">
        <Pagination
          count={totalPaginas}
          page={paginaActual}
          onChange={handleChangePagina}
          color="primary"
          className="bg-gray-800 rounded-lg p-2"
        />
      </div>
    </div>
  );
}

export default DescripcionCurso;
