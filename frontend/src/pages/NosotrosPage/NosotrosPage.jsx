import React from 'react';

function NosotrosPage() {
  return (
    <div className="flex items-center justify-center pt-28">
      <div className="max-w-4xl w-full rounded-lg  p-8 ">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          ¿Quiénes Somos?
        </h1>
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700">
            En <span className="font-semibold text-blue-500">SkillHub</span>, nuestra misión es conectar
            a estudiantes y profesionales a través de una plataforma accesible para compartir
            conocimientos. Creemos que el aprendizaje debe ser accesible para todos, y por eso hemos
            creado un espacio donde las personas pueden enseñar y aprender de manera flexible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-500 text-white rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Nuestra Visión</h2>
            <p className="text-lg">
              Ser la plataforma líder en educación online, donde cualquier persona pueda encontrar y
              compartir conocimientos valiosos en una comunidad inclusiva y colaborativa.
            </p>
          </div>

          <div className="bg-green-500 text-white rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Nuestros Valores</h2>
            <ul className="list-inside list-disc">
              <li>Accesibilidad para todos</li>
              <li>Innovación continua</li>
              <li>Aprendizaje colaborativo</li>
              <li>Compromiso con el éxito de nuestros usuarios</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700">
            ¡Únete a nuestra comunidad y empieza a compartir tus conocimientos hoy mismo!
          </p>
          
          {/* Botones al lado */}
          <div className="mt-6 flex justify-center space-x-6">
            <a
              href="/cursos"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Explorar Cursos
            </a>
            <a
              href="/path-to-your-file/Manual_SkillHub.pdf"  // Cambia esta ruta por la del archivo manual real
              download
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Descargar Manual
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NosotrosPage;
