import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el courseId de los parámetros
import { useHacerCurso } from '../../context/HacerCursoContext.jsx'; // El contexto que has creado

const ListadoCurso = () => {
  const { courseId } = useParams(); // Obtiene el courseId desde la URL
  const { courseUnits, loading, error, loadCourseUnits } = useHacerCurso(); // Usamos el contexto
  const [expandedUnit, setExpandedUnit] = useState(null); // Estado para manejar qué unidad está expandida

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtén el token de localStorage
    if (token) {
      loadCourseUnits(token, courseId); // Carga las unidades del curso al montar el componente
    }
  }, [courseId, loadCourseUnits]); // Vuelve a ejecutar si courseId cambia

  // Manejo de carga y error
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-lg font-semibold text-[#6A64F1]">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-lg font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Función para manejar la expansión de las unidades
  const handleExpandUnit = (unitIndex) => {
    if (expandedUnit === unitIndex) {
      setExpandedUnit(null); // Colapsa la unidad si ya está expandida
    } else {
      setExpandedUnit(unitIndex); // Expande la unidad
    }
  };

  return (
    <div className="m-2 space-y-2">
      <h1 className="text-3xl font-semibold text-center mb-6 text-[black]">
        Unidades y Clases del Curso
      </h1>
      {courseUnits.length > 0 ? (
        courseUnits.map((unit, index) => (
          <div
            key={unit.id}
            className="group flex flex-col gap-2 rounded-lg bg-gray-800 p-5 text-white w-2/6 border border-black"
            tabindex="1"
          >
            <div
              className="flex cursor-pointer items-center justify-between text-lg font-semibold"
              onClick={() => handleExpandUnit(index)} // Llama a la función para expandir o colapsar
            >
              <span>{unit.titulo}</span>
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
                {unit.clases && unit.clases.map((clase, claseIndex) => (
                  <li
                    key={clase.id}
                    className="mb-1 cursor-pointer font-semibold transition-colors duration-300 hover:text-red-500"
                  >
                    {`${claseIndex + 1}. ${clase.nombre}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div className="text-lg text-gray-600 text-center">
          No hay unidades disponibles para este curso.
        </div>
      )}
    </div>
  );
};

export default ListadoCurso;
