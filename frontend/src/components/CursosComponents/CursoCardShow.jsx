import React, { useState } from "react";
import { useCursos } from "../../context/ShowCourseContext.jsx"; // Asegúrate de importar el hook

function CursoCardShow({ searchQuery }) {
  const { cursos, loading, error } = useCursos(); // Consumimos el contexto aquí
  const cursosPorPagina = 18; // 3 filas x 6 columnas
  const [paginaActual, setPaginaActual] = useState(1);

  if (loading) return <div>Cargando cursos...</div>; // Muestra un mensaje mientras se cargan los cursos
  if (error) return <div>{error}</div>; // Muestra el error si ocurre

  // Filtrar los cursos según el texto de búsqueda
  const cursosFiltrados = cursos.filter((curso) =>
    curso.titulo.toLowerCase().includes(searchQuery.toLowerCase()) // Filtra por el título del curso
  );

  // Si no hay cursos que coincidan con la búsqueda
  if (cursosFiltrados.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-center text-xl text-gray-600">No se encontraron cursos con ese nombre.</p>
        </div>
      </div>
    );
  }

  // Calcular los cursos que se mostrarán en la página actual
  const totalPaginas = Math.ceil(cursosFiltrados.length / cursosPorPagina);
  const indiceInicio = (paginaActual - 1) * cursosPorPagina;
  const indiceFin = indiceInicio + cursosPorPagina;

  const cursosPaginaActual = cursosFiltrados.slice(indiceInicio, indiceFin);

  // Cambiar de página
  const handlePaginaChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPaginas) {
      setPaginaActual(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazarse al principio de la página
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-3 gap-6">
          {cursosPaginaActual.map((curso) => (
            <div
              key={curso.id}
              className="relative flex flex-col text-black bg-white shadow-lg border border-black bg-clip-border rounded-xl min-h-[400px]" // Ajusta la altura mínima según sea necesario
            >
              <div className="relative mx-4 mt-4 overflow-hidden text-black bg-white bg-clip-border rounded-xl h-96">
                <img
                  src={`http://localhost:4000/${curso.imagen_portada}`} // Cambia la URL según tus datos
                  alt="card"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <p className="block font-sans text-base font-medium leading-relaxed text-[#1D63FF]">
                    {curso.titulo} {/* Título dinámico del curso */}
                  </p>
                  <p className="block font-sans text-base font-medium leading-relaxed text-black">
                    ${curso.precio} {/* Precio dinámico del curso */}
                  </p>
                </div>
                {/* Descripción: limitada a 6 líneas y con scroll si excede */}
                <p className="block font-sans text-sm font-normal leading-normal text-[#000000] opacity-75 scrollable-clamp flex-grow">
                  {curso.descripcion}
                </p>
                <div className="mt-auto pt-6">
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all text-white bg-[#1D63FF] py-3 px-6 rounded-lg shadow-lg hover:bg-[#000000] active:shadow-md block w-full"
                    type="button"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <nav className="mt-6">
          <ul className="flex justify-center">
            <li>
              <button
                onClick={() => handlePaginaChange(paginaActual - 1)}
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                aria-label="Previous"
                disabled={paginaActual === 1}
              ></button>
            </li>
            {[...Array(totalPaginas)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePaginaChange(index + 1)}
                  className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full ${
                    paginaActual === index + 1
                      ? "bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-md shadow-pink-500/20"
                      : "border border-blue-gray-100 bg-transparent text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePaginaChange(paginaActual + 1)}
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                aria-label="Next"
                disabled={paginaActual === totalPaginas}
              ></button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default CursoCardShow;
