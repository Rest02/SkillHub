import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useHacerCurso } from "../../context/HacerCursoContext.jsx";

function HacerCurso() {
  const [showResponse, setShowResponse] = useState({});
  const [responseContent, setResponseContent] = useState(""); // Nuevo estado para manejar el contenido de la respuesta
  const [commentContent, setCommentContent] = useState(""); // Estado para el contenido del nuevo comentario
  const [videoId, setVideoId] = useState(null); // Estado para el videoId
  const { courseId } = useParams();
  const { courseUnits, loading, error, loadCourseUnits, createResponse, createNewComment, commentLoading, commentError } = useHacerCurso();
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

  const handleClassClick = (videoUrl, comentarios, videoId) => {
    setVideoUrl(videoUrl); // Actualiza la URL del video
    setSelectedComments(comentarios); // Actualiza los comentarios para este video
    setVideoId(videoId); // Aquí estableces el ID del video seleccionado
  };

  // Función para manejar el envío de la respuesta
  const handleSendResponse = async (commentId) => {
    const token = localStorage.getItem("token"); // Obtener el token
    try {
      if (token && responseContent.trim()) {
        // Llamar a la función para crear la respuesta
        const response = await createResponse(
          token,
          courseId,
          commentId,
          responseContent
        );

        console.log("Respuesta creada:", response); // Verifica que la respuesta contiene los datos correctos

        // Limpiar el campo de respuesta
        setResponseContent("");

        alert("Respuesta enviada exitosamente.");

        // Recargar la página para mostrar los comentarios actualizados
        window.location.reload();
      } else {
        alert("Por favor, ingrese un contenido válido para la respuesta.");
      }
    } catch (err) {
      console.error(err);
      alert("Hubo un error al enviar la respuesta.");
    }
  };

  const handleSendComment = async () => {
    const token = localStorage.getItem("token");
  
    if (!videoId) {
      alert("No se ha seleccionado un video para comentar.");
      return; // No se permite enviar el comentario si no hay un videoId válido.
    }
  
    try {
      if (token && commentContent.trim()) {
        const response = await createNewComment(token, courseId, videoId, commentContent);
        console.log("Comentario creado:", response);
  
        setCommentContent(""); // Limpiar el campo de comentario.
  
        alert("Comentario enviado exitosamente.");
  
        // Recargar la página para actualizar los comentarios
        window.location.reload(); // Esto refresca la página
  
      } else {
        alert("Por favor, ingrese un contenido válido para el comentario.");
      }
    } catch (err) {
      console.error(err);
      alert("Hubo un error al enviar el comentario.");
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
                          {unit.clases &&
                            unit.clases.map((clase, claseIndex) => (
                              <li
                                key={clase.id}
                                className="mb-1 cursor-pointer font-semibold transition-colors duration-300 hover:text-red-500"
                                onClick={() => handleClassClick(clase.videoUrl, clase.comentarios, clase.id)} // Pasamos el videoId
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
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      loop
                    >
                      <source src={`http://localhost:4000/${videoUrl}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="flex justify-center items-center text-gray-500">
                      Selecciona una clase para ver el video
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Agregar un Comentario</h4>
            <textarea
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe tu comentario aquí..."
              rows="4"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)} // Controla el contenido del comentario
            />
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSendComment} // Llama a la función para enviar el comentario
              disabled={commentLoading} // Desactiva el botón mientras se está creando el comentario
            >
              {commentLoading ? "Enviando..." : "Agregar Comentario"}
            </button>
            {commentError && <p className="text-red-500 mt-2">{commentError}</p>} {/* Muestra el error si ocurre */}
          </div>

          {selectedComments.map((comment) => (
            <div key={comment.id} className="mt-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
                  alt="Commentor"
                  className="relative inline-block h-[58px] w-[58px] rounded-full object-cover object-center shadow-md"
                />
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                    <h5 className="font-sans text-xl font-semibold text-blue-gray-900">
                      {comment.nombreUsuario}
                    </h5>
                    <p className="text-gray-600 text-sm">
                      {new Date(comment.fecha).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">{comment.contenido}</p>
                </div>
              </div>

              {/* Botón para alternar visibilidad de la respuesta */}
              <button
                onClick={() =>
                  setShowResponse((prev) => ({
                    ...prev,
                    [comment.id]: !prev[comment.id],
                  }))
                }
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                {showResponse[comment.id] ? "Ocultar Respuesta" : "Responder"}
              </button>

              {/* Mostrar las respuestas a este comentario */}
              {comment.respuestas.length > 0 && (
                <div className="mt-4 pl-6 border-l-2 border-gray-300">
                  {comment.respuestas.map((response) => (
                    <div key={response.id + 1} className="mt-4">
                      <div className="flex items-start gap-4">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
                          alt="Responder"
                          className="relative inline-block h-[48px] w-[48px] rounded-full object-cover object-center shadow-md"
                        />
                        <div className="flex flex-col w-full">
                          <div className="flex items-center justify-between">
                            <h5 className="font-sans text-sm font-medium text-blue-gray-900">
                              {response.responderNombre}
                            </h5>
                            <p className="text-gray-500 text-xs">
                              {new Date(response.fecha).toLocaleString()}
                            </p>
                          </div>
                          <p className="text-sm text-gray-700">
                            {response.contenido}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Formulario de Respuesta (solo visible si showResponse es true) */}
              {showResponse[comment.id] && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Responde a este comentario
                  </h4>
                  <textarea
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Escribe tu respuesta aquí..."
                    rows="4"
                    value={responseContent}
                    onChange={(e) => setResponseContent(e.target.value)} // Controlar el contenido de la respuesta
                  />
                  <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => handleSendResponse(comment.id)}
                  >
                    Responder
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HacerCurso;
