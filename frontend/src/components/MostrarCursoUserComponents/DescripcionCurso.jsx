import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCursos } from "../../context/ShowCourseContext.jsx";
import Pagination from "@mui/material/Pagination"; // Importamos la paginación de Material UI
import { useCarrito } from "../../context/CarritoContext.jsx"; // Importa el hook para acceder al contexto

function DescripcionCurso() {
  const { courseId } = useParams(); // Obtener courseId de los parámetros de la URL
  const { courseDetails, fetchCourseDetails, loading, error } = useCursos();
  const [paginaActual, setPaginaActual] = useState(1);
  const [expandedUnit, setExpandedUnit] = useState(null); // Estado para manejar qué unidad está expandida
  const [selectedVideo, setSelectedVideo] = useState(null); // Estado para manejar el video seleccionado
  const unidadesPorPagina = 10;
  const { addToCarritoContext, loading: carritoLoading, error: carritoError } = useCarrito(); // Desestructura el contexto para obtener la función
  const token = localStorage.getItem("token"); // Obtén el token del usuario desde localStorage (o tu método de autenticación)

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

  // Función para manejar el cambio de video seleccionado
  const handleClassClick = (videoUrl) => {
    console.log("Ruta del video:", videoUrl);
    setSelectedVideo(videoUrl); // Actualiza la URL del video seleccionado
  };

  // Función para agregar al carrito
  const handleAddToCarrito = async () => {
    try {
      console.log("el curso id", courseId);
      await addToCarritoContext(token, courseId); // Llama a la función para agregar el curso al carrito
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
    }
  };

  // Calculamos el número total de páginas
  const totalPaginas = Math.ceil(courseDetails.units.length / unidadesPorPagina);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl mb-6 underline text-black">{courseDetails.course_title}</h1>

      <div className="flex gap-8">
        {/* Lado izquierdo con la lista de unidades */}
        <div className="w-1/2">
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
                      <span
                        className="font-semibold cursor-pointer"
                        onClick={() => handleClassClick(video.video_url)} // Pasa la URL correctamente
                      >
                        {`${videoIndex + 1}. ${video.video_name}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Lado derecho con el Video */}
        <div className="w-1/2">
  {selectedVideo ? (
    <div className="relative font-inter antialiased">
      <main className="relative flex flex-col justify-center">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 pt-16">
          <div className="flex flex-col items-center">
            <div className="rounded-none border-2 border-black bg-white w-full max-w-lg mx-auto">
              <div className="w-full mb-4">
                <button
                  className="relative flex justify-center items-center focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 group"
                  aria-controls="modal"
                  aria-label="Watch the video"
                >
                  <div className="w-full h-full">
                    <video
                      key={selectedVideo} // Usa la URL del video como clave
                      className="w-full h-full object-cover" // Asegura que el video ocupe todo el contenedor sin distorsionar
                      controls
                      autoPlay
                      loop
                    >
                      <source src={`http://localhost:4000/${selectedVideo}`} type="video/mp4" />
                      Tu navegador no soporta el tag de video.
                    </video>
                  </div>
                </button>
              </div>

              {/* Action Buttons below the video */}
              <div className="flex flex-col space-y-4 mb-4 px-6 py-4">
                <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300">
                  Comprar
                </button>
                <button
                  onClick={handleAddToCarrito} // Llama a la función al hacer clic
                  className="bg-gray-500 text-white py-2 px-6 rounded-full hover:bg-gray-600 transition-colors duration-300"
                  disabled={carritoLoading} // Deshabilitar el botón mientras se carga
                >
                  {carritoLoading ? "Añadiendo..." : "Agregar al carrito"}
                </button>
              </div>
            </div> {/* End of the Card */}
          </div>
        </div>
      </main>
    </div>
  ) : (
    <p>Selecciona una clase para ver el video</p>
  )}
</div>


      </div>

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
