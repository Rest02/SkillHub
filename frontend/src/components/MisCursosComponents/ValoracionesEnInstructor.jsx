import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MisCursosContext } from "../../context/MisCursosContext";
import { useParams } from "react-router-dom";
import anime from "animejs";

function ValoracionesEnInstructor() {
  const { courseId } = useParams(); // Obtener el `courseId` de la URL
  const { valoraciones, setCursoSeleccionado } = useContext(MisCursosContext);
  const [valoracionesCurso, setValoracionesCurso] = useState([]);

  // Configurar el curso seleccionado cuando cambie el `courseId`
  useEffect(() => {
    if (courseId) {
      setCursoSeleccionado({ id: courseId });
    }
  }, [courseId, setCursoSeleccionado]);

  // Obtener las valoraciones cuando `valoraciones` cambie
  useEffect(() => {
    if (valoraciones && valoraciones.ratings) {
      setValoracionesCurso(valoraciones.ratings); // Guardar las valoraciones del curso
    }
  }, [valoraciones]);

  useEffect(() => {
    // Animar las valoraciones al cargarse
    anime({
      targets: '.valoracion-item',
      opacity: [0, 1],
      translateX: [-50, 0],
      easing: 'easeOutExpo',
      duration: 800,
      delay: anime.stagger(100), // Stagger para que las valoraciones aparezcan de una en una
    });

    // Animación para las estrellas
    anime({
      targets: '.star',
      scale: [0, 1],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 800,
      delay: anime.stagger(100, { start: 300 }), // Retraso para las estrellas
    });
  }, [valoracionesCurso]);

  // Función para renderizar las estrellas
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className="star"
        color={index < rating ? "#ffc107" : "#e4e5e9"}
      />
    ));
  };

  // Verificar que `valoracionesCurso` sea un arreglo
  if (!Array.isArray(valoracionesCurso) || valoracionesCurso.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center bg-white border border-black rounded-lg shadow-md">
        <p className="text-lg text-gray-700 font-semibold mb-4">
          Aún no se han creado valoraciones para tu curso de parte de tus alumnos.
        </p>
        <p className="text-sm text-gray-500">
          ¡Sé el primero en recibir una valoración! Tus alumnos podrán compartir sus opiniones
          aquí para ayudarte a mejorar.
        </p>
      </div>
    );
  }

  return (
    <section className="border border-black relative flex flex-col justify-center bg-white overflow-hidden antialiased rounded-lg">
      <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">
        <div className="w-full max-w-3xl mx-auto">
          {/* Vertical Timeline #3 */}
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent pt-3">
            {valoracionesCurso.map((valoracion, index) => (
              <div key={index} className="relative valoracion-item">
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
                      {new Date(valoracion.date).toLocaleDateString()} {/* Asegúrate de tener una propiedad `date` en las valoraciones */}
                    </time>
                  </div>
                  {/* Title and Stars */}
                  <div className="flex items-center ml-14">
                    <span className="text-black font-bold">{valoracion.user.name}</span> {/* Aquí se usa `user.name` */}
                    <div className="flex ml-2">
                      {renderStars(valoracion.score)} {/* Las estrellas basadas en la valoración */}
                    </div>
                  </div>
                </div>
                {/* Card */}
                <div className="bg-white p-4 rounded border border-slate-200 text-black shadow ml-14 md:ml-44">
                  "{valoracion.comment}" {/* Aquí se usa `comment` */}
                </div>
              </div>
            ))}
          </div>
          {/* End: Vertical Timeline #3 */}
        </div>
      </div>
    </section>
  );
}

export default ValoracionesEnInstructor;
