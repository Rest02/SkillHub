import React, { useState } from "react";
import { useCursos } from "../../context/ShowCourseContext.jsx";

function CursoFilterBar() {
  const { applyFilters } = useCursos();
  const [titulo, setTitulo] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [showFilter, setShowFilter] = useState(false); // Estado para controlar si el filtro se muestra

  const handleFilterChange = () => {
    applyFilters({ titulo, maxPrice, rating, modalidad });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto border border-black">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Filtrar Cursos</h2>
      
      {/* Botón para abrir/cerrar el menú de filtros */}
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="w-full mb-4 text-white bg-blue-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
      >
        {showFilter ? 'Cerrar filtros' : 'Abrir filtros'}
      </button>

      {/* Filtro desplegable */}
      {showFilter && (
        <div className="flex flex-col gap-4 w-full">
          {/* Input para buscar por título */}
          <input
            type="text"
            placeholder="Buscar por título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />

          {/* Input para precio máximo */}
          <input
            type="number"
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />

          {/* Input para valoración */}
          <input
            type="number"
            placeholder="Valoración mínima"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />

          {/* Select para modalidad */}
          <select
            value={modalidad}
            onChange={(e) => setModalidad(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="">Todas las modalidades</option>
            <option value="completo">Completo</option>
            <option value="continuo">Continuo</option>
          </select>

          {/* Botón para aplicar filtros */}
          <button
            onClick={handleFilterChange}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            Aplicar filtros
          </button>
        </div>
      )}

      {/* Filtros estáticos para pantallas grandes */}
      <div className="hidden md:block mt-4">
        <div className="flex flex-col gap-4">
          {/* Input para buscar por título */}
          <input
            type="text"
            placeholder="Buscar por título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />

          {/* Input para precio máximo */}
          <input
            type="number"
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />

          {/* Input para valoración */}
          <input
            type="number"
            placeholder="Valoración mínima"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />

          {/* Select para modalidad */}
          <select
            value={modalidad}
            onChange={(e) => setModalidad(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="">Todas las modalidades</option>
            <option value="completo">Completo</option>
            <option value="continuo">Continuo</option>
          </select>

          {/* Botón para aplicar filtros */}
          <button
            onClick={handleFilterChange}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
}

export default CursoFilterBar;
