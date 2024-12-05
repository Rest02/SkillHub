import React, { useContext, useState, useEffect } from "react";
import { MisCursosContext } from "../../context/MisCursosContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack"; // Importa useSnackbar

function CreateClaseVideo() {
  const { courseId } = useParams();
  const { cursos, unidades, uploadVideo } = useContext(MisCursosContext);
  const [selectedUnidad, setSelectedUnidad] = useState("");
  const [videoData, setVideoData] = useState({ nombre: "", descripcion: "" });
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Hook de notistack para mostrar notificaciones

  useEffect(() => {
    if (cursos.length > 0) {
      setSelectedUnidad("");
    }
  }, [cursos]);

  const handleSelectChange = (event) => {
    setSelectedUnidad(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVideoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
    } else {
      setVideoPreview("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedUnidad || !videoData.nombre || !videoData.descripcion || !videoFile) {
      enqueueSnackbar("Por favor, completa todos los campos y selecciona un archivo.", { variant: "error" });
      return;
    }

    console.log("Curso ID desde params:", courseId);

    try {
      const result = await uploadVideo(courseId, selectedUnidad, videoData, videoFile);
      if (result) {
        setVideoFile(null);
        setVideoPreview("");
        setVideoData({ nombre: "", descripcion: "" });
        setSelectedUnidad("");

        // Muestra una notificación de éxito
        enqueueSnackbar("¡El video se subió correctamente!", { variant: "success" });

        // Redirige después de un pequeño retraso
        setTimeout(() => {
          navigate(`/cursos/${courseId}/unitsandvideos`);
        });
      } else {
        enqueueSnackbar("Ocurrió un error al subir el video. Inténtalo de nuevo.", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Ocurrió un error al subir el video. Inténtalo de nuevo.", { variant: "error" });
    }
  };

  return (
    <div className="flex items-center justify-center py-8 ">
      <div className="w-full max-w-[550px] bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-white mb-6">Crear Clase en Video</h2>

        {cursos.length > 0 && unidades.length > 0 ? (
          <div className="flex flex-col gap-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <label htmlFor="unidad" className="text-white">Seleccionar Unidad</label>
                <select
                  id="unidad"
                  value={selectedUnidad}
                  onChange={handleSelectChange}
                  className="w-full p-3 rounded-md bg-white text-black focus:outline-none focus:border-[#6A64F1] focus:ring-2 focus:ring-[#6A64F1]"
                >
                  <option value="">Seleccione una unidad</option>
                  {unidades.map((unidad) => (
                    <option key={unidad.unidad_id} value={unidad.unidad_id}>
                      {unidad.unidad_titulo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="nombre" className="text-white">Nombre del Video</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={videoData.nombre}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-white text-black focus:outline-none focus:border-[#6A64F1] focus:ring-2 focus:ring-[#6A64F1]"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="descripcion" className="text-white">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={videoData.descripcion}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-white text-black focus:outline-none focus:border-[#6A64F1] focus:ring-2 focus:ring-[#6A64F1]"
                  rows={4}
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-white">Subir Archivo de Video</label>
                <input
                  type="file"
                  id="video"
                  onChange={handleFileChange}
                  accept="video/*"
                  className="p-3 rounded-md text-black border border-gray-400 focus:outline-none focus:border-[#6A64F1]"
                />
              </div>

              <button
                type="submit"
                className="mt-4 py-3 px-8 rounded-md bg-[#6A64F1] text-white font-semibold transition duration-300 hover:bg-[#FF4081] focus:outline-none"
              >
                Subir Video
              </button>
            </form>

            {videoPreview && (
              <div className="flex flex-col items-center justify-center mt-6 border-2 border-gray-500 p-4 rounded-lg">
                <h3 className="text-white mb-3">Vista Previa del Video</h3>
                <video controls src={videoPreview} className="w-full rounded-md" />
              </div>
            )}
          </div>
        ) : (
          <p className="text-white">Cargando unidades...</p>
        )}
      </div>
    </div>
  );
}

export default CreateClaseVideo;
