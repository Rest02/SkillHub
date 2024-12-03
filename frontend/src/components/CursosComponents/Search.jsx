import React, { useState } from "react";

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Función que se ejecuta al hacer submit
  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchQuery);  // Pasa el texto de búsqueda al componente padre
  };

  return (
    <div className="flex items-center justify-center py-4">
      <form onSubmit={handleSearch} className="flex w-full mx-7 lg:max-w-[500px] rounded-full border-black border-opacity-65 border bg-gray-100 px-2">
        {/* Input de búsqueda */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}  // Actualiza el estado con lo que el usuario escribe
          className="flex w-full bg-transparent px-3 text-gray-700 outline-0"
          placeholder="Search name movie or select options"
        />

        {/* Separador */}
        <div className="border-gray-400 border-opacity-70 my-1 border-l"></div>

        {/* Botón de búsqueda */}
        <button type="submit" className="relative rounded-full bg-transparent px-2 py-3">
          <svg className="fill-none w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#999"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default Search;
