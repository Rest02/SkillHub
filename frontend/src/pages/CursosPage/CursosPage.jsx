import React, { useState } from "react";
import CursoCardShow from "../../components/CursosComponents/CursoCardShow.jsx";
import Filter from "../../components/CursosComponents/Filter.jsx";
import Search from "../../components/CursosComponents/Search.jsx";

function CursosPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Función para manejar el texto de búsqueda
  const handleSearch = (query) => {
    setSearchQuery(query); // Actualiza el estado con la búsqueda
  };

  return (
    <div className="flex flex-col p-4 gap-4 min-h-screen">
      {/* Barra de búsqueda en la parte superior */}
      <div>
        <Search onSearch={handleSearch} />  {/* Pasa la función al componente Search */}
      </div>

      {/* Contenedor principal con filtro y tarjetas */}
      <div className="flex flex-col md:flex-row gap-4 flex-grow justify-center">
        {/* Filtro en la parte superior en pantallas pequeñas y al lado de las tarjetas en pantallas grandes */}
        <div className="w-full md:w-[22%] mb-4 md:mb-0">
          <Filter />
        </div>

        {/* Tarjetas de cursos en el lado derecho */}
        <div className="w-full md:w-[55%]">
          <CursoCardShow searchQuery={searchQuery} />  {/* Pasa la query de búsqueda al componente de las tarjetas */}
        </div>
      </div>
    </div>
  );
}

export default CursosPage;
