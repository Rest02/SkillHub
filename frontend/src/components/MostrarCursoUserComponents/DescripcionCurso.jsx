import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCursos } from "../../context/ShowCourseContext.jsx";
import Pagination from "@mui/material/Pagination";
import { useCarrito } from "../../context/CarritoContext.jsx";
import anime from "animejs";

function DescripcionCurso() {
  const { courseId } = useParams();
  const { courseDetails, fetchCourseDetails, loading, error } = useCursos();
  const [paginaActual, setPaginaActual] = useState(1);
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const unidadesPorPagina = 10;
  const { addToCarritoContext, loading: carritoLoading, error: carritoError } = useCarrito();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (courseId && (!courseDetails || courseDetails.id !== courseId)) {
      fetchCourseDetails(courseId);
    }
  }, [courseId]);

  useEffect(() => {
    // Animar la aparición de las unidades y videos al cargar
    anime({
      targets: '.unidad-item',
      opacity: [0, 1],
      translateY: [20, 0],
      easing: 'easeOutQuad',
      duration: 800,
      delay: anime.stagger(100), // Stagger para cada unidad
    });
  }, [courseDetails]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  if (!courseDetails || !courseDetails.units) {
    return <p>No se encontraron detalles para este curso.</p>;
  }

  const unidadesAMostrar = courseDetails.units.slice(
    (paginaActual - 1) * unidadesPorPagina,
    paginaActual * unidadesPorPagina
  );

  const handleChangePagina = (event, value) => {
    setPaginaActual(value);
    anime({
      targets: '.unidad-item',
      opacity: [0, 1],
      translateY: [20, 0],
      easing: 'easeOutQuad',
      duration: 800,
      delay: anime.stagger(100),
    });
  };

  const handleExpandUnit = (unitIndex) => {
    if (expandedUnit === unitIndex) {
      setExpandedUnit(null);
    } else {
      setExpandedUnit(unitIndex);
      anime({
        targets: `.unit-${unitIndex} .video-list`,
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutQuad',
        duration: 600,
      });
    }
  };

  const handleClassClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const handleAddToCarrito = async () => {
    try {
      await addToCarritoContext(token, courseId);
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
    }
  };

  const totalPaginas = Math.ceil(courseDetails.units.length / unidadesPorPagina);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-extrabold text-black pb-5">
        {courseDetails.course_title}
      </h1>

      <div className="flex gap-8">
        {/* Lado izquierdo con la lista de unidades */}
        <div className="w-1/2">
          {unidadesAMostrar.map((unidad, index) => (
            <div
              key={unidad.unit_title}
              className="group flex flex-col gap-3 bg-brown border bg-white border-black p-4 rounded-lg mb-4 hover:shadow-xl transition-shadow shadow-lg unidad-item"
            >
              <div
                className="flex cursor-pointer text-black items-center justify-between text-lg font-semibold"
                onClick={() => handleExpandUnit(index)}
              >
                <span>{`${unidad.unit_title}`}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                  className={`w-5 h-5 transform transition-transform ${
                    expandedUnit === index ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Clases de la unidad */}
              <div
                className={`transition-all text-black overflow-hidden ${
                  expandedUnit === index
                    ? "max-h-screen opacity-100 visible"
                    : "max-h-0 opacity-0 invisible"
                }`}
              >
                <ul className="pl-4 text-sm video-list">
                  {unidad.videos.map((video, videoIndex) => (
                    <li key={video.video_name} className="mb-1">
                      <span
                        className="font-semibold cursor-pointer"
                        onClick={() => handleClassClick(video.video_url)}
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
                <div className="w-full max-w-6xl mx-auto px-4 md:px-6 ">
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
                              key={selectedVideo}
                              className="w-full h-full object-cover"
                              controls
                              autoPlay
                              loop
                            >
                              <source
                                src={`http://localhost:4000/${selectedVideo}`}
                                type="video/mp4"
                              />
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
                          onClick={handleAddToCarrito}
                          className="bg-gray-500 text-white py-2 px-6 rounded-full hover:bg-gray-600 transition-colors duration-300"
                          disabled={carritoLoading}
                        >
                          {carritoLoading ? "Añadiendo..." : "Agregar al carrito"}
                        </button>
                      </div>
                    </div>
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
