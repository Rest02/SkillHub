import React, { useState } from "react";
import { useCursos } from "../../context/ShowCourseContext.jsx";

function CursoFilterBar() {
  const { applyFilters } = useCursos();
  const [titulo, setTitulo] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [modalidad, setModalidad] = useState("");

  const handleFilterChange = () => {
    applyFilters({ titulo, maxPrice, rating, modalidad });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-0 border border-black ">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtrar Cursos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Buscar por título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Valoración mínima"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={modalidad}
          onChange={(e) => setModalidad(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas las modalidades</option>
          <option value="completo">Completo</option>
          <option value="continuo">Continuo</option>
        </select>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleFilterChange}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
}

export default CursoFilterBar;
