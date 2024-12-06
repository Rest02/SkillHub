import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useHacerCurso } from "../../context/HacerCursoContext.jsx";

function HacerCurso() {
  const { courseId } = useParams();
  const { courseUnits, loading, error, loadCourseUnits } = useHacerCurso();
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedComments, setSelectedComments] = useState([]); // Nuevo estado para los comentarios
  const videoRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadCourseUnits(token, courseId); // Carga las unidades del curso
    }
  }, [courseId, loadCourseUnits]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

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

  const handleExpandUnit = (unitIndex) => {
    setExpandedUnit(expandedUnit === unitIndex ? null : unitIndex);
  };

  const handleClassClick = (videoUrl, comentarios) => {
    setVideoUrl(videoUrl); // Actualiza la URL del video
    setSelectedComments(comentarios); // Actualiza los comentarios para este video
  };
  
  return (
    <div className="py-8 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto space-y-8 border border-black rounded-lg">
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-8">
          <h1 className="text-3xl font-semibold text-center mb-6 text-[black]">
            Unidades y Clases del Curso
          </h1>

          <div className="flex gap-8">
            <div className="flex-1">
              <div className="m-2 space-y-2">
                {courseUnits.length > 0 ? (
                  courseUnits.map((unit, index) => (
                    <div
                      key={unit.id}
                      className="group flex flex-col gap-2 rounded-lg bg-gray-800 p-5 text-white w-full border border-black"
                      tabIndex="1"
                    >
                      <div
                        className="flex cursor-pointer items-center justify-between text-lg font-semibold"
                        onClick={() => handleExpandUnit(index)}
                      >
                        <span>{unit.titulo}</span>
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
                          className={`h-3 w-4 transition-all duration-500 ${expandedUnit === index ? "-rotate-180" : ""}`}
                          alt="Toggle"
                        />
                      </div>

                      <div
                        className={`transition-all overflow-hidden ${expandedUnit === index ? "max-h-screen opacity-100 visible" : "max-h-0 opacity-0 invisible"}`}
                      >
                        <ul className="pl-4 text-sm">
                          {unit.clases && unit.clases.map((clase, claseIndex) => (
                            <li
                              key={clase.id}
                              className="mb-1 cursor-pointer font-semibold transition-colors duration-300 hover:text-red-500"
                              onClick={() => handleClassClick(clase.videoUrl, clase.comentarios)} // Actualiza el video y los comentarios
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
            </div>

            <div className="flex-1">
              <div className="relative flex justify-center items-center">
                <div className="rounded-3xl shadow-2xl overflow-hidden w-full h-80">
                  {videoUrl ? (
                    <video ref={videoRef} className="w-full h-full object-cover" controls autoPlay loop>
                      <source src={`http://localhost:4000/${videoUrl}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="flex justify-center items-center text-gray-500">Selecciona una clase para ver el video</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {selectedComments.length > 0 && (
            <div className="relative flex flex-col w-full mt-8 rounded-xl bg-white shadow-lg p-6 border border-black">
              <h3 className="text-xl font-semibold">Comentarios</h3>
              {selectedComments.map((comment) => (
                <div key={comment.id} className="mt-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                      alt="Commentor"
                      className="relative inline-block h-[58px] w-[58px] rounded-full object-cover object-center shadow-md"
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex items-center justify-between">
                        <h5 className="font-sans text-xl font-semibold text-blue-gray-900">{comment.nombreUsuario}</h5>
                        <p className="text-gray-600 text-sm">{new Date(comment.fecha).toLocaleString()}</p>
                      </div>
                      <p className="text-sm text-gray-700">{comment.contenido}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HacerCurso;
