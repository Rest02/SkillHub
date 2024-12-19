import React, { useEffect, useRef } from "react";
import { useCursos } from "../../context/ShowCourseContext"; // Importamos el hook de contexto
import { useParams } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js'; // Importamos anime.js

function CommentsValorations() {
  const { fetchRatingsForCourse, ratings, loading, error } = useCursos(); // Desestructuramos el contexto
  const { courseId } = useParams();

  const sectionRef = useRef(null); // Referencia para la sección
  const titleRef = useRef(null); // Referencia para el título
  const ratingRefs = useRef([]); // Referencia para cada valoracion

  useEffect(() => {
    if (courseId) {
      fetchRatingsForCourse(courseId); // Obtener valoraciones para el curso
    }

    // Animación de aparición de la sección
    anime({
      targets: sectionRef.current,
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeInOutQuad',
    });

    // Animación del título
    anime({
      targets: titleRef.current,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 500,
      easing: 'easeOutQuad',
    });

    // Animación de las valoraciones
    ratingRefs.current.forEach((rating, index) => {
      anime({
        targets: rating,
        opacity: [0, 1],
        translateY: [50, 0],
        delay: 200 * index, // Para que cada valoración tenga un retraso
        duration: 600,
        easing: 'easeOutQuad',
      });
    });
  }, [courseId]);

  if (loading) return <p className="text-white">Cargando valoraciones...</p>;

  if (error) return <p className="text-white">{error}</p>;

  if (ratings.length === 0) return <p className="text-white">No hay valoraciones para este curso.</p>;

  return (
    <section
      ref={sectionRef}
      className="border border-black relative flex flex-col justify-center bg-white overflow-hidden antialiased rounded-lg"
    >
      <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">
        <div className="w-full max-w-3xl mx-auto">
          {/* Título atractivo "Valoraciones" */}
          <h1
            ref={titleRef}
            className="text-3xl font-bold text-left text-black mb-8"
          >
            Valoraciones
          </h1>

          {/* Vertical Timeline #3 */}
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent pt-3">
            {ratings.map((rating, index) => (
              <div
                key={index}
                ref={(el) => (ratingRefs.current[index] = el)} // Asignamos la referencia para cada valoración
                className="relative valoracion-item"
              >
                <div className="md:flex items-center md:space-x-4 mb-3">
                  <div className="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow md:order-1">
                      <svg
                        className="fill-emerald-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                      >
                        <path d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                      </svg>
                    </div>
                    {/* Date */}
                    <time className="text-sm font-medium text-indigo-500 md:w-28">
                      {new Date(rating.fecha_valoracion).toLocaleDateString()}
                    </time>
                  </div>
                  {/* Title and Stars */}
                  <div className="flex items-center ml-14">
                    <span className="text-black font-bold">{rating.usuario}</span>
                    <div className="flex ml-2">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={`h-5 w-5 ${index < rating.valoracion ? 'text-yellow-500' : 'text-gray-300'}`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Card */}
                <div className="bg-white p-4 rounded border border-slate-200 text-black shadow ml-14 md:ml-44">
                  "{rating.comentario}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommentsValorations;
