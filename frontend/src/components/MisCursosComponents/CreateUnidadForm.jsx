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
