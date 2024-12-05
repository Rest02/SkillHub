import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack"; // Importa useSnackbar
import { MisCursosContext } from "../../context/MisCursosContext.jsx"; // Asegúrate de que MisCursosContext esté configurado correctamente

function CreateUnidadForm() {
  const { courseId } = useParams(); // Obtiene el ID del curso desde los parámetros de la URL
  const navigate = useNavigate(); // Usamos useNavigate para redirigir al usuario
  const { createUnidad } = useContext(MisCursosContext); // Accede a la función createUnidad desde el contexto
  const { enqueueSnackbar } = useSnackbar(); // Hook de notistack para mostrar notificaciones

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    objetivos: "",
    tema: "",
  });

  const [error, setError] = useState(null);

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
        // Muestra una notificación de éxito
        enqueueSnackbar("¡Unidad creada exitosamente!", { variant: "success" });

        // Redirige al usuario
        navigate(`/cursos/${courseId}/unitsandvideos`);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Error al crear la unidad.");
    }
  };

  return (
    <div className="flex items-center justify-center py-20 ">
      <div className="mx-auto w-full max-w-[550px] bg-gray-800 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3">
              <div className="mb-5">
                <label
                  htmlFor="titulo"
                  className="mb-3 block text-base font-medium text-[#ffffff]"
                >
                  Título
                </label>
                <input
                  type="text"
                  name="titulo"
                  id="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#000000] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="descripcion"
              className="mb-3 block text-base font-medium text-[#ffffff]"
            >
              Descripción
            </label>
            <textarea
              name="descripcion"
              id="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#000000] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="objetivos"
              className="mb-3 block text-base font-medium text-[#ffffff]"
            >
              Objetivos
            </label>
            <textarea
              name="objetivos"
              id="objetivos"
              value={formData.objetivos}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#000000] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="tema"
              className="mb-3 block text-base font-medium text-[#ffffff]"
            >
              Tema
            </label>
            <textarea
              name="tema"
              id="tema"
              value={formData.tema}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#000000] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div>
            <button
              type="submit"
              className="hover:bg-[#FF4081] hover:shadow-lg transition-colors duration-300 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Crear Unidad
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUnidadForm;
