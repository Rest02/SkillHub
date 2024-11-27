import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MisCursosContext } from "../../context/MisCursosContext.jsx";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  TextField,
  Button
} from "@mui/material";
import { getVideosByUnidad } from "../../api/misCursos.api.js"; // Asegúrate de tener esta función

const ListUnits = () => {
  const { courseId } = useParams(); // Obtener el ID del curso desde la URL
  const { unidades, setCursoSeleccionado, updateVideo } = useContext(MisCursosContext); // Obtener unidades y función de actualización desde el contexto
  const [selectedUnidad, setSelectedUnidad] = useState(""); // Estado para la unidad seleccionada
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [videos, setVideos] = useState([]); // Estado para almacenar los videos/clases
  const [selectedVideo, setSelectedVideo] = useState(""); // Estado para la clase seleccionada
  const [videoData, setVideoData] = useState({ nombre: "", descripcion: "" }); // Estado para almacenar los datos del video a editar
  const [videoLoading, setVideoLoading] = useState(false); // Estado para manejar la carga de videos
  const [file, setFile] = useState(null); // Estado para almacenar el archivo de video si es necesario
  const [videoUrl, setVideoUrl] = useState(null); // Estado para almacenar la URL temporal del video

  const navigate = useNavigate(); // Usamos useNavigate para redirigir (en caso de necesitarlo)

  useEffect(() => {
    // Establecer el curso seleccionado para cargar las unidades
    setCursoSeleccionado({ id: courseId });
    setLoading(true); // Comenzar el estado de carga

    const timer = setTimeout(() => {
      setLoading(false); // Simula el final de la carga
    }, 1000); // Ajustar el tiempo según los datos reales

    return () => clearTimeout(timer); // Limpiar el timeout al desmontar
  }, [courseId, setCursoSeleccionado]);

  useEffect(() => {
    if (selectedUnidad) {
      // Al seleccionar una unidad, hacer la solicitud para obtener los videos
      setVideoLoading(true);
      getVideosByUnidad(courseId, selectedUnidad)
        .then((videosData) => {
          setVideos(videosData);
          setVideoLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener los videos:", error);
          setVideoLoading(false);
        });
    }
  }, [selectedUnidad, courseId]);

  useEffect(() => {
    if (selectedVideo) {
      // Al seleccionar un video, cargar los datos de ese video para editar
      const selected = videos.find((video) => video.id === selectedVideo);
      if (selected) {
        setVideoData({
          nombre: selected.nombre,
          descripcion: selected.descripcion
        });
      }
    }
  }, [selectedVideo, videos]);

  useEffect(() => {
    if (!file) {
      setVideoUrl(null);
    } else {
      // Crear una URL temporal para el video seleccionado
      setVideoUrl(URL.createObjectURL(file));
    }
  }, [file]);

  const handleSelectUnidad = (event) => {
    setSelectedUnidad(event.target.value); // Actualizar el estado con la unidad seleccionada
  };

  const handleSelectVideo = (event) => {
    setSelectedVideo(event.target.value); // Actualizar el estado con el video seleccionado
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file); // Guardar el archivo de video en el estado
  };

  const handleSaveChanges = async () => {
    if (selectedVideo) {
      // Llamar a la función para actualizar el video
      const result = await updateVideo(courseId, selectedVideo, videoData, file);
      if (result.success) {
        alert("Video actualizado correctamente");
      } else {
        alert("Error al actualizar el video");
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Listado de Unidades
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : unidades.length > 0 ? (
        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="unidad-select-label">Seleccionar Unidad</InputLabel>
            <Select
              labelId="unidad-select-label"
              id="unidad-select"
              value={selectedUnidad}
              onChange={handleSelectUnidad}
              label="Seleccionar Unidad"
            >
              <MenuItem value="">
                <em>Seleccione una unidad</em>
              </MenuItem>
              {unidades.map((unidad) => (
                <MenuItem key={unidad.unidad_id} value={unidad.unidad_id}>
                  {unidad.unidad_titulo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedUnidad && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Unidad seleccionada:{" "}
              {
                unidades.find((u) => u.unidad_id === selectedUnidad)
                  ?.unidad_titulo
              }
            </Typography>
          )}

          {/* Mostrar los videos/clases disponibles para la unidad seleccionada */}
          {selectedUnidad && (
            <Box sx={{ mt: 3 }}>
              {videoLoading ? (
                <CircularProgress />
              ) : (
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="video-select-label">
                    Seleccionar Video
                  </InputLabel>
                  <Select
                    labelId="video-select-label"
                    id="video-select"
                    value={selectedVideo} // Estado para el video seleccionado
                    onChange={handleSelectVideo} // Actualiza el estado con el video seleccionado
                    label="Seleccionar Video"
                  >
                    <MenuItem value="">
                      <em>Seleccione un video</em>
                    </MenuItem>
                    {videos.length > 0 ? (
                      videos.map((video) => (
                        <MenuItem key={video.id} value={video.id}>
                          {video.nombre}{" "}
                          {/* Asumiendo que "nombre" es el campo del video */}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">
                        <em>No hay videos disponibles</em>
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              )}
            </Box>
          )}

          {/* Si un video ha sido seleccionado, mostrar formulario para editar */}
          {selectedVideo && (
            <Box sx={{ mt: 3 }}>
              <TextField
                label="Nombre del Video"
                variant="outlined"
                fullWidth
                name="nombre"
                value={videoData.nombre}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                name="descripcion"
                value={videoData.descripcion}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <input type="file" onChange={handleFileChange} />
              {file && (
                <Box sx={{ mt: 2 }}>
                  <video width="100%" controls>
                    <source src={videoUrl} type="video/mp4" />
                    Tu navegador no soporta la etiqueta de video.
                  </video>
                </Box>
              )}
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleSaveChanges}
              >
                Guardar Cambios
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No hay unidades disponibles para este curso. Crea una unidad para que
          aparezca aquí.
        </Typography>
      )}
    </Container>
  );
};

export default ListUnits;
