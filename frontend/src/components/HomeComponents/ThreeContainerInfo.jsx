import React from "react";

function ThreeContainerInfo() {
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Contenedor de los tres bloques */}
      <div className="flex flex-wrap justify-between gap-8">
        {/* Primer contenedor */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
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
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
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
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
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
      </div>
    </div>
  );
}

export default ThreeContainerInfo;
