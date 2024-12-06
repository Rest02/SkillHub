import React from "react";

function ThreeContainerInfo() {
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Contenedor de los cinco bloques */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* Primer contenedor */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2293/2293883.png"
              alt="icon1"
              className="w-16 h-16 mr-4"
            />
            <h3 className="text-xl font-semibold text-blue-600">Aprende de Creadores</h3>
          </div>
          <p className="text-gray-700">
            Aprende de los mejores creadores y expertos en el mundo de los cursos online. Nuestro contenido está diseñado para ayudarte a mejorar tus habilidades en áreas clave, desde programación hasta marketing digital.
          </p>
        </div>

        {/* Segundo contenedor */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2377/2377746.png"
              alt="icon2"
              className="w-16 h-16 mr-4"
            />
            <h3 className="text-xl font-semibold text-blue-600">Videos y Comentarios</h3>
          </div>
          <p className="text-gray-700">
            Accede a miles de videos educativos y opiniones de estudiantes para ayudarte a elegir el curso adecuado. Los comentarios y valoraciones te permitirán conocer la calidad del contenido y la efectividad de cada lección.
          </p>
        </div>

        {/* Tercer contenedor */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5406/5406791.png"
              alt="icon3"
              className="w-16 h-16 mr-4"
            />
            <h3 className="text-xl font-semibold text-blue-600">Certificaciones</h3>
          </div>
          <p className="text-gray-700">
            Al finalizar los cursos, obtén certificados oficiales que avalan tus nuevos conocimientos. Estos certificados son ideales para mejorar tu currículum y destacar en el mundo laboral.
          </p>
        </div>

        {/* Cuarta Card - Soporte 24/7 */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828505.png" // Icono de teléfono
              alt="icon4"
              className="w-16 h-16 mr-4"
            />
            <h3 className="text-xl font-semibold text-blue-600">Soporte 24/7</h3>
          </div>
          <p className="text-gray-700">
            Nuestro equipo de soporte está disponible las 24 horas del día, los 7 días de la semana. Si tienes alguna duda o problema, estamos aquí para ayudarte en cualquier momento.
          </p>
        </div>

        {/* Quinta Card - Acceso a Material Exclusivo */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1814/1814890.png" // Icono de libro
              alt="icon5"
              className="w-16 h-16 mr-4"
            />
            <h3 className="text-xl font-semibold text-blue-600">Material Exclusivo</h3>
          </div>
          <p className="text-gray-700">
            Accede a materiales exclusivos que solo los estudiantes de nuestros cursos pueden descargar. Ya sea ebooks, plantillas o recursos adicionales, te ayudamos a continuar tu aprendizaje más allá del curso.
          </p>
        </div>

        {/* Sexta Card - Tutorías en Vivo */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1034/1034155.png" // Icono de tutoría
              alt="icon6"
              className="w-16 h-16 mr-4"
            />
            <h3 className="text-xl font-semibold text-blue-600">Tutorías Continuas</h3>
          </div>
          <p className="text-gray-700">
            Conéctate con nuestros tutores expertos en el menor tiempo posible. Ofrecemos tutorías para resolver tus dudas y ayudarte a avanzar en tus cursos. ¡Aprende en el momento exacto que lo necesitas!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ThreeContainerInfo;
