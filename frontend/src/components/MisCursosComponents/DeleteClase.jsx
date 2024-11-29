import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack"; // Importa useSnackbar
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
  Button,
} from "@mui/material";
import { getVideosByUnidad } from "../../api/misCursos.api.js";

const DeleteClase = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { unidades, setCursoSeleccionado, deleteVideo } = useContext(MisCursosContext);
  const { enqueueSnackbar } = useSnackbar(); // Hook de notistack para mostrar notificaciones
  const [selectedUnidad, setSelectedUnidad] = useState("");
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);

  useEffect(() => {
    setCursoSeleccionado({ id: courseId });
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [courseId, setCursoSeleccionado]);

  useEffect(() => {
    if (selectedUnidad) {
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

  const handleSelectUnidad = (event) => {
    setSelectedUnidad(event.target.value);
  };

  const handleSelectVideo = (event) => {
    setSelectedVideo(event.target.value);
  };

  const handleDeleteClase = async (courseId, unidadId, videoId) => {
    const response = await deleteVideo(courseId, unidadId, videoId);
    if (response && response.success) {
      // Muestra una notificación de éxito
      enqueueSnackbar("¡Clase eliminada correctamente!", { variant: "success" });

      // Redirige al usuario
      setTimeout(() => {
        navigate(`/cursos/${courseId}/unitsandvideos`);
      }, 2000); // Espera 2 segundos para mostrar la notificación antes de redirigir
    } else {
      enqueueSnackbar("Error al eliminar la clase.", { variant: "error" });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Eliminar Clase
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
            <Box sx={{ mt: 3 }}>
              {videoLoading ? (
                <CircularProgress />
              ) : (
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="video-select-label">Seleccionar Clase</InputLabel>
                  <Select
                    labelId="video-select-label"
                    id="video-select"
                    value={selectedVideo}
                    onChange={handleSelectVideo}
                    label="Seleccionar Clase"
                  >
                    <MenuItem value="">
                      <em>Seleccione una clase</em>
                    </MenuItem>
                    {videos.length > 0 ? (
                      videos.map((video) => (
                        <MenuItem key={video.id} value={video.id}>
                          {video.nombre}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">
                        <em>No hay clases disponibles</em>
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              )}
            </Box>
          )}

          {selectedVideo && (
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                ¿Estás seguro de que deseas eliminar la clase "
                {videos.find((v) => v.id === selectedVideo)?.nombre}"?
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  handleDeleteClase(courseId, selectedUnidad, selectedVideo)
                }
              >
                Eliminar Clase
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

export default DeleteClase;
