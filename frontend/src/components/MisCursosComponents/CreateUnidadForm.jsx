import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Importar toast para las notificaciones
import anime from "animejs";
import { MisCursosContext } from "../../context/MisCursosContext.jsx";

function CreateUnidadForm() {
  const { courseId } = useParams(); // ID del curso desde la URL
  const navigate = useNavigate(); // Redirección
  const { createUnidad } = useContext(MisCursosContext); // Función del contexto

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    objetivos: "",
    tema: "",
  });

  const formRef = useRef(null); // Referencia para el formulario

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createUnidad(courseId, formData);

      if (response.success) {
        toast.success("¡Unidad creada exitosamente!", {
          position: "bottom-right",
          duration: 2000,
        });

        setTimeout(() => {
          navigate(`/cursos/${courseId}/unitsandvideos`);
        }, 2000);
      } else {
        toast.error(response.message || "Error al crear la unidad.");
      }
    } catch (err) {
      toast.error("Error al crear la unidad.");
    }
  };

  // Animar entrada del formulario
  useEffect(() => {
    anime({
      targets: formRef.current,
      opacity: [0, 1],
      translateY: [-50, 0],
      duration: 1000,
      easing: "easeOutExpo",
    });
  }, []);

  return (
    <div
      ref={formRef}
      className="max-w-4xl mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg mt-10 mb-10"
    >
      <h2 className="text-3xl font-bold text-center mb-6">Crear Unidad</h2>
      <form onSubmit={handleSubmit}>
        {/* Título */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold">Título</label>
          <input
            type="text"
            name="titulo"
            placeholder="Ej. Introducción a React"
            value={formData.titulo}
            onChange={(e) => {
              handleChange(e);
              if (!formData.titulo) {
                anime({
                  targets: e.target,
                  translateX: [-10, 10, 0],
                  duration: 300,
                  easing: "easeInOutSine",
                });
              }
            }}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Descripción */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold">Descripción</label>
          <textarea
            name="descripcion"
            rows="4"
            placeholder="Describe brevemente el contenido de la unidad"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Objetivos */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold">Objetivos</label>
          <textarea
            name="objetivos"
            rows="4"
            placeholder="Especifica los objetivos de esta unidad"
            value={formData.objetivos}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tema */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold">Tema</label>
          <textarea
            name="tema"
            rows="4"
            placeholder="Indica los temas que se cubrirán"
            value={formData.tema}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botón Enviar */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition duration-300"
        >
          Crear Unidad
        </button>
      </form>
    </div>
  );
}

export default CreateUnidadForm;
