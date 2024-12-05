import React, { useContext, useState, useEffect } from "react";
import { MisCursosContext } from "../../context/MisCursosContext.jsx";
import { useNavigate } from "react-router-dom";

const MisCursosCard = () => {
  const { cursos, setCursoSeleccionado, deleteCurso } =
    useContext(MisCursosContext);
  const [paginaActual, setPaginaActual] = useState(1);
  const cursosPorPagina = 9; // 3 x 3 = 9 cursos por página
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setPaginaActual(1); // Reinicia a la primera página si cambian los cursos
  }, [cursos]);

  // Calcular los cursos que se mostrarán en la página actual
  const totalPaginas = Math.ceil(cursos.length / cursosPorPagina);
  const indiceInicio = (paginaActual - 1) * cursosPorPagina;
  const indiceFin = indiceInicio + cursosPorPagina;

  // Filtrar y mostrar los cursos
  const cursosActuales = cursos
    .filter(
      (curso) =>
        curso.titulo &&
        curso.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indiceInicio, Math.min(indiceFin, cursos.length));

  // Cambiar de página
  const handlePaginaChange = (value) => {
    if (value >= 1 && value <= totalPaginas) {
      setPaginaActual(value);
    }
  };

  // Redirige a la ruta del curso
  const handleViewCourse = (cursoID) => {
    setCursoSeleccionado(cursos.find((curso) => curso.id === cursoID));
    navigate(`/cursos/${cursoID}/unitsandvideos`);
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este curso?")) {
      const result = await deleteCurso(courseId);
      alert(
        result?.success
          ? "Curso eliminado con éxito"
          : result?.message || "Hubo un error"
      );
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-10">
      <h1 className="text-2xl font-semibold mb-4">Mis Cursos</h1>

      {/* Barra de búsqueda mejorada */}
      <div className="flex mb-4 justify-start items-center w-full max-w-[600px] mx-auto">
        <div className="flex rounded-full bg-[#ffffff] px-2 w-full border border-black">
          {/* Icono de búsqueda */}
          <input
            type="text"
            className="w-full bg-transparent pl-2 text-[#cccccc] outline-0 py-2"
            placeholder="Buscar curso"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Botón de búsqueda */}
          <button
            type="submit"
            className="relative p-2 rounded-full ml-2"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="#999"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>

      {/* Tarjetas de Cursos */}
      <div className="flex justify-center items-center w-full ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl ">
          {cursosActuales.map((curso) => (
            <div className="flex flex-col bg-white shadow-lg rounded-xl overflow-hidden border border-black">
              <div className="w-full relative">
                <img
                  src={`http://localhost:4000/${curso.imagen_portada}`}
                  alt="Imagen del curso"
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              </div>
              <div className="p-6 flex flex-col h-full">
                <h6 className="text-black uppercase font-semibold mb-4">
                  {curso.titulo}
                </h6>
                <p className="text-gray-700 mb-4 truncate-lines flex-grow">
                  {curso.descripcion}
                </p>
                <div className="flex justify-between gap-4 mt-auto">
                  <button
                    onClick={() => handleViewCourse(curso.id)}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-blue-600 transition-colors duration-400 w-full"
                  >
                    Ver Curso
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(curso.id)}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-red-600 transition-colors duration-400 w-full"
                  >
                    Eliminar
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
          {/* Botón Anterior */}
          <li>
            <button
              onClick={() => handlePaginaChange(paginaActual - 1)}
              disabled={paginaActual === 1}
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-black bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
            >
              <span className="material-icons text-sm">↞</span>
            </button>
          </li>

          {/* Botones de Páginas */}
          {[...Array(totalPaginas)].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePaginaChange(index + 1)}
                className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full ${
                  paginaActual === index + 1
                    ? "bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-md shadow-pink-500/20"
                    : "border border-black bg-transparent text-blue-gray-500"
                } p-0 text-sm transition duration-150 ease-in-out hover:bg-light-300`}
              >
                {index + 1}
              </button>
            </li>
          ))}

          {/* Botón Siguiente */}
          <li>
            <button
              onClick={() => handlePaginaChange(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-black bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
            >
              <span className="material-icons text-sm">↠</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MisCursosCard;
