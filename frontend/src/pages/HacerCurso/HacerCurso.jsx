import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHacerCurso } from "../../context/HacerCursoContext.jsx";

function HacerCurso() {
  const { courseId } = useParams();
  const { courseUnits, loading, error, loadCourseUnits } = useHacerCurso();
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadCourseUnits(token, courseId); // Carga las unidades del curso
    }
  }, [courseId, loadCourseUnits]);

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

  const handleClassClick = (videoUrl) => {
    if (videoUrl) {
      console.log("Video URL: ", videoUrl); // Verifica la URL aquí
      setVideoUrl(videoUrl); // Actualiza la URL del video
    }
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
                              onClick={() => handleClassClick(clase.videoUrl)} // Actualiza el video cuando se hace clic
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
                    <video className="w-full h-full object-cover" controls autoPlay loop>
                      <source src={`http://localhost:4000/${courseUnits.videoUrl}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="flex justify-center items-center text-gray-500">Selecciona una clase para ver el video</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col w-full mt-8 rounded-xl bg-white shadow-lg p-6 border border-black">
            <div className="relative flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                alt="Commentor"
                className="relative inline-block h-[58px] w-[58px] rounded-full object-cover object-center shadow-md"
              />
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                  <h5 className="font-sans text-xl font-semibold text-blue-gray-900">Tania Andrew</h5>
                  <div className="flex items-center gap-0">
                    {[...Array(5)].map((_, index) => (
                      <svg key={index} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`h-5 w-5 ${index < 4 ? 'text-yellow-500' : 'text-gray-300'}`}>
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">Frontend Lead @ Google</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-base text-gray-700">"I found solution to all my design needs from Creative Tim. I use them as a freelancer in my hobby projects for fun! And it's really affordable, very humble guys !!!"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HacerCurso;
