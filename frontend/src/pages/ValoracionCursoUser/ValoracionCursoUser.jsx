import React, { useState } from 'react';
import { createRatingApi } from '../../api/showCourses.api'; // Asegúrate de importar la función
import { useParams } from 'react-router-dom';

const ValoracionCursoUser = () => {
  const [rating, setRating] = useState(1);  // Valoración inicial (1-5)
  const [comment, setComment] = useState(""); // Comentario
  const { courseId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createRatingApi(courseId, rating, comment);
      alert(result.message);  // Muestra el mensaje de éxito
    } catch (error) {
      alert("Error al crear la valoración");
    }
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          
          {/* Valoración */}
          <div className="mb-5">
            <label htmlFor="rating" className="mb-3 block text-base font-medium text-[#07074D]">
              Valoración
            </label>
            <select 
              id="rating" 
              value={rating} 
              onChange={(e) => setRating(e.target.value)} 
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          {/* Comentario */}
          <div className="mb-5">
            <label htmlFor="comment" className="mb-3 block text-base font-medium text-[#07074D]">
              Comentario
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Deja tu comentario..."
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          {/* Botón de Enviar */}
          <div className="mt-5">
            <button
              type="submit"
              className="w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none hover:shadow-lg focus:ring-2 focus:ring-[#6A64F1]"
            >
              Enviar Valoración
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ValoracionCursoUser;
