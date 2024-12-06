import React, { useEffect } from "react";
import { useCursos } from "../../context/ShowCourseContext"; // Importamos el hook de contexto
import { useParams } from 'react-router-dom';

function ValoracionesEnInstructor() {
  const { fetchRatingsForCourse, ratings, loading, error } = useCursos(); // Desestructuramos el contexto
  const { courseId } = useParams();
  console.log(courseId);

  useEffect(() => {
    if (courseId) {
      fetchRatingsForCourse(courseId); // Obtener valoraciones para el curso
    }
  }, [courseId]); // Se vuelve a llamar cuando cambia el courseId

  console.log('Valoraciones en el contexto:', ratings);

  if (loading) return <p className="text-white">Cargando valoraciones...</p>;

  if (error) return <p className="text-white">{error}</p>;

  if (ratings.length === 0) return <p className="text-white">No hay valoraciones para este curso.</p>;

  return (
    <div className="relative flex flex-col w-full rounded-xl bg-gray-800 shadow-lg p-6">
      {ratings.map((rating) => (
        <div key={rating.id} className="relative flex gap-4 mb-6 flex-col md:flex-row">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
            alt={rating.usuario}
            className="relative inline-block h-[58px] w-[58px] rounded-full object-cover object-center shadow-md"
          />
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between">
              <h5 className="font-sans text-xl font-semibold text-white">{rating.usuario}</h5>
              <div className="flex items-center gap-0">
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
            <p className="text-sm text-gray-600">Fecha: {new Date(rating.fecha_valoracion).toLocaleDateString()}</p>
            <p className="mt-2 text-base text-white">{rating.comentario}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ValoracionesEnInstructor;
