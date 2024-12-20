import React, { useContext, useState, useEffect } from "react";
import { MisCursosContext } from "../../context/MisCursosContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Importa toast
import anime from "animejs"; // Asegúrate de importar anime.js

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

  // Reemplazar la confirmación de eliminación con toast
  const handleDeleteCourse = async (courseId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este curso?"
    );
    if (confirmDelete) {
      const result = await deleteCurso(courseId);
      console.log(result.message)
      if (result.message === "Curso eliminado exitosamente") {
        toast.success("Curso eliminado con éxito", {
          position: "bottom-right",
          autoClose: 5000,  // El toast se cierra después de 5 segundos
          hideProgressBar: true,
          closeButton: true,
        });
        
      } else {
        toast.error(result?.message || "Hubo un error");
      }
    }
  };

  const handleCrearCurso = () => {
    navigate("/createcourse"); // Redirige a la página de creación de curso
  };

  // Animación para las tarjetas de cursos
  useEffect(() => {
    anime({
      targets: '.card', // Aplica la animación a las tarjetas
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: anime.stagger(100), // Retraso entre tarjetas
    });
  }, [cursos]);

  return (
    <div className="flex flex-col items-center min-h-screen py-10 px-4 md:px-8">
      <h1 className="text-2xl font-semibold mb-4">Mis Cursos</h1>

      {/* Mostrar mensaje si no hay cursos */}
      {cursos.length === 0 ? (
        <div className="flex flex-col items-center mt-4">
          <h2 className="text-xl font-semibold text-gray-500">
            Aún no has creado ningún curso.
          </h2>
          <p className="text-gray-600 mt-2 text-center">
            Comienza a crear cursos para que aparezcan aquí.
          </p>
          <button
            onClick={handleCrearCurso}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Crear Curso
          </button>
        </div>
      ) : (
        <>
          {/* Barra de búsqueda con botón al lado derecho - Mostrar solo si hay cursos */}
          <div className="flex mb-4 items-center w-full max-w-[600px]">
            <div className="flex items-center w-full rounded-lg bg-white border border-black shadow-xl focus-within:ring-2 transition duration-300">
              <span className="pl-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm5.292-1.292a1 1 0 011.416 0l4 4a1 1 0 01-1.416 1.416l-4-4a1 1 0 010-1.416z"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="w-full bg-transparent pl-2 pr-4 py-2 text-gray-700 placeholder-gray-400 outline-none"
                placeholder="Buscar curso"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={handleCrearCurso}
              className="ml-4 px-4 h-11 bg-black shadow-xl text-white whitespace-nowrap rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Crear curso
            </button>
          </div>

          {/* Tarjetas de Cursos */}
          <div className="flex justify-center items-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl">
              {cursosActuales.map((curso) => (
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
                        Editar Curso
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
        </>
      )}
    </div>
  );
};

export default MisCursosCard;
