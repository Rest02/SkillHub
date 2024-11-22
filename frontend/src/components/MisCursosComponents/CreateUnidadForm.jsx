import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MisCursosContext } from "../../context/MisCursosContext.jsx"; // Asegúrate de que MisCursosContext esté configurado correctamente

function CreateUnidadForm() {
  const { courseId } = useParams(); // Obtiene el ID del curso desde los parámetros de la URL
  const navigate = useNavigate(); // Usamos useNavigate para redirigir al usuario
  const { createUnidad } = useContext(MisCursosContext); // Accede a la función createUnidad desde el contexto

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    objetivos: "",
    tema: "",
  });

  const [error, setError] = useState(null);

  // Manejador de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Llamamos a la función createUnidad con los datos del formulario
      const response = await createUnidad(courseId, formData);

      // Si la creación fue exitosa, redirigimos al usuario a la página de unidades del curso
      if (response.success) {
        navigate(`/curso/${courseId}/unidades`);
      } else {
        // Si hubo un error, mostramos el mensaje de error
        setError(response.message);
      }
    } catch (err) {
      // Si ocurre un error inesperado, mostramos un mensaje genérico
      setError("Error al crear la unidad");
    }
  };

  return (
    <div>
      <h2>Crear Unidad para el Curso</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Objetivos</label>
          <textarea
            name="objetivos"
            value={formData.objetivos}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tema</label>
          <textarea
            name="tema"
            value={formData.tema}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear Unidad</button>
      </form>
    </div>
  );
}

export default CreateUnidadForm;
