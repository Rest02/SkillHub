import React, { useState, useEffect } from "react";
import { useCursos } from "../../context/ShowCourseContext.jsx"; // Asegúrate de importar el hook
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import anime from "animejs"; // Asegúrate de importar anime.js

function CursoCardShow({ searchQuery }) {
  const navigate = useNavigate(); // Hook para navegar entre rutas

  const { cursos, loading, error, fetchCursos } = useCursos(); // Consumimos el contexto aquí
  const cursosPorPagina = 9; // 3 filas x 3 columnas
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    anime({
      targets: ".card",
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1000,
      easing: "easeOutExpo",
      delay: anime.stagger(100),
    });
  }, [cursos]);

  if (loading) return <div>Cargando cursos...</div>;
  if (error) return <div>{error}</div>;

  const cursosFiltrados = cursos.filter((curso) =>
    curso.titulo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (cursosFiltrados.length === 0 && !loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-center text-xl text-gray-600">
            No se encontraron cursos con ese nombre.
          </p>
        </div>
      </div>
    );
  }

  // Calcular los cursos que se mostrarán en la página actual
  const totalPaginas = Math.ceil(cursosFiltrados.length / cursosPorPagina);
  const indiceInicio = (paginaActual - 1) * cursosPorPagina;
  const indiceFin = indiceInicio + cursosPorPagina;

  const cursosPaginaActual = cursosFiltrados.slice(indiceInicio, indiceFin);

  const handlePaginaChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPaginas) {
      setPaginaActual(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleViewCourse = (courseId) => {
    if (!courseId) {
      console.error("El ID del curso no es válido:", courseId);
      return;
    }
    navigate(`/showcourseuser/${courseId}/details`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 md:px-8">
      {/* Tarjetas de Cursos */}
      <div className="flex justify-center items-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-7xl">
          {cursosPaginaActual.map((curso) => (
            <div
              key={curso.id}
              className="card flex flex-col bg-white shadow-lg rounded-xl overflow-hidden border border-black"
            >
              <div className="w-full relative">
                <img
                  src={`http://localhost:4000/${curso.imagen_portada}`}
                  alt="Imagen del curso"
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              </div>
              <div className="p-6 flex flex-col h-full">
                <h6 className="text-black uppercase font-semibold mb-2">
                  {curso.titulo}
                </h6>
                <span className="text-lg font-bold text-blue-600 mb-4">
                  ${curso.precio}
                </span>
                <p className="text-gray-700 mb-4 truncate-lines flex-grow">
                  {curso.descripcion}
                </p>
                <div className="flex justify-between gap-4 mt-auto">
                  <button
                    onClick={() => handleViewCourse(curso.id)}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-blue-600 transition-colors duration-400 w-full"
                  >
                    Revisar Curso
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paginación */}
      <nav>
        <ul className="flex justify-center mt-8 pb-10">
          <li>
            <button
              onClick={() => handlePaginaChange(paginaActual - 1)}
              disabled={paginaActual === 1}
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-black bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
            >
              ↞
            </button>
          </li>

          {[...Array(totalPaginas)].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePaginaChange(index + 1)}
                className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full ${
                  paginaActual === index + 1
                    ? "bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-md"
                    : "border border-black bg-transparent text-blue-gray-500"
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={() => handlePaginaChange(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-black bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
            >
              ↠
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default CursoCardShow;
