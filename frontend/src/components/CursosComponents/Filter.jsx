import React, { useState } from "react";

function Filter() {
  const [isOpen, setIsOpen] = useState(false); // Controla si el filtro está desplegado o no
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(50);
  const [rating, setRating] = useState(0);
  const [format, setFormat] = useState("continuous");

  const categories = ["Programming", "Design", "Marketing", "Business"];

  return (
    <div className="w-4/5 max-w-4xl mx-auto p-4">
      {/* Botón para desplegar/ocultar filtros */}
      <div
        className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg shadow-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-bold text-gray-800">Filter Courses</h2>
        <svg
          className={`w-6 h-6 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Contenido desplegable */}
      {isOpen && (
        <div className="p-6 bg-white rounded-lg shadow-md mt-4">
          {/* Categoría */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Type to search categories..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <ul className="mt-2 border border-gray-300 rounded-lg bg-white max-h-32 overflow-auto">
              {categories
                .filter((cat) =>
                  cat.toLowerCase().includes(category.toLowerCase())
                )
                .map((cat, index) => (
                  <li
                    key={index}
                    onClick={() => setCategory(cat)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {cat}
                  </li>
                ))}
            </ul>
          </div>

          {/* Precio */}
          <div className="mb-4">
            <label htmlFor="price" className="block font-medium text-gray-700 mb-2">
              Price: ${price}
            </label>
            <input
              id="price"
              type="range"
              min="0"
              max="100"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Valoración */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => setRating(star)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={star <= rating ? "gold" : "gray"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17.25l5.158 2.717c.554.292 1.218-.176 1.056-.785l-1.313-5.33 4.158-3.437c.473-.391.217-1.159-.407-1.225l-5.431-.592L12 3.75 9.779 8.598l-5.431.592c-.624.066-.88.834-.407 1.225l4.158 3.437-1.313 5.33c-.162.609.502 1.077 1.056.785L12 17.25z"
                  />
                </svg>
              ))}
            </div>
          </div>

          {/* Formato */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">Format</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="continuous"
                  checked={format === "continuous"}
                  onChange={() => setFormat("continuous")}
                  className="text-blue-500"
                />
                Continuous
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="complete"
                  checked={format === "complete"}
                  onChange={() => setFormat("complete")}
                  className="text-blue-500"
                />
                Complete
              </label>
            </div>
          </div>

          {/* Botón de aplicar */}
          <button
            onClick={() => console.log({ category, price, rating, format })}
            className="w-full bg-[#1D63FF] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#000] transition"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Filter;
