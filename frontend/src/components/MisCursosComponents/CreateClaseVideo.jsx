import React, { useContext, useState } from "react";
import { MisCursosContext } from "../../context/MisCursosContext.jsx";

function CreateClaseVideo() {
  const { cursos, unidades, uploadVideo } = useContext(MisCursosContext); // Accedemos a uploadVideo
  const [selectedUnidad, setSelectedUnidad] = useState("");
  const [videoData, setVideoData] = useState({
    nombre: "",
    descripcion: "",
  });
  const [videoFile, setVideoFile] = useState(null);

  const handleSelectChange = (event) => {
    setSelectedUnidad(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVideoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedUnidad || !videoData.nombre || !videoData.descripcion || !videoFile) {
      alert("Por favor, completa todos los campos y selecciona un archivo.");
      return;
    }

    const cursoId = cursos[0]?.id; // Obtener el curso asociado (ajusta según tu lógica)
    if (!cursoId) {
      alert("No se pudo identificar el curso.");
      return;
    }

    const result = await uploadVideo(cursoId, selectedUnidad, videoData, videoFile);
    if (result) {
      alert("Video subido exitosamente");
    } else {
      alert("Error al subir el video.");
    }
  };

  return (
    <div>
      <h2>Crear Clase en Video</h2>
      {cursos.length > 0 && unidades.length > 0 ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="unidad">Seleccionar Unidad:</label>
            <select id="unidad" value={selectedUnidad} onChange={handleSelectChange}>
              <option value="">Seleccione una unidad</option>
              {unidades.map((unidad) => (
                <option key={unidad.unidad_id} value={unidad.unidad_id}>
                  {unidad.unidad_titulo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="nombre">Nombre del Video:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={videoData.nombre}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={videoData.descripcion}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="video">Archivo de Video:</label>
            <input type="file" id="video" onChange={handleFileChange} />
          </div>

          <button type="submit">Subir Video</button>
        </form>
      ) : (
        <p>Cargando unidades...</p>
      )}
    </div>
  );
}

export default CreateClaseVideo;
