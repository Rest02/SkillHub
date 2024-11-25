import React, { useContext, useState, useEffect } from "react";
import { MisCursosContext } from "../../context/MisCursosContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  InputLabel,
  FormControl,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material";

function CreateClaseVideo() {
  const { cursos, unidades, uploadVideo, createUnidad } = useContext(MisCursosContext);
  const [selectedUnidad, setSelectedUnidad] = useState("");
  const [videoData, setVideoData] = useState({ nombre: "", descripcion: "" });
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const navigate = useNavigate();

  // Asegúrate de que las unidades se actualicen si cambian
  useEffect(() => {
    if (cursos.length > 0) {
      setSelectedUnidad(""); // Restablece la selección de unidad si el curso cambia
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
      alert("Por favor, completa todos los campos y selecciona un archivo.");
      return;
    }

    const cursoId = cursos[0]?.id;
    if (!cursoId) {
      alert("No se pudo identificar el curso.");
      return;
    }

    try {
      const result = await uploadVideo(cursoId, selectedUnidad, videoData, videoFile);
      if (result) {
        setVideoFile(null);
        setVideoPreview("");
        setVideoData({ nombre: "", descripcion: "" });
        setSelectedUnidad("");

        // Redirigir al usuario después de subir el video
        setTimeout(() => {
          navigate(`/cursos/${cursoId}/unitsandvideos`);
          // Mostrar alerta después de redirigir
          setSuccessAlert(true);
        }, 1500);
      } else {
        setErrorAlert(true);
      }
    } catch (error) {
      setErrorAlert(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Crear Clase en Video
      </Typography>

      {successAlert && (
        <Alert severity="success" onClose={() => setSuccessAlert(false)} sx={{ mb: 3 }}>
          <AlertTitle>Éxito</AlertTitle>
          El video se subió correctamente.
        </Alert>
      )}

      {errorAlert && (
        <Alert severity="error" onClose={() => setErrorAlert(false)} sx={{ mb: 3 }}>
          <AlertTitle>Error</AlertTitle>
          Ocurrió un error al subir el video. Inténtalo de nuevo.
        </Alert>
      )}

      {cursos.length > 0 && unidades.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="unidad-label">Seleccionar Unidad</InputLabel>
              <Select labelId="unidad-label" id="unidad" value={selectedUnidad} onChange={handleSelectChange} label="Seleccionar Unidad">
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

            <TextField fullWidth id="nombre" name="nombre" label="Nombre del Video" value={videoData.nombre} onChange={handleInputChange} variant="outlined" />

            <TextField fullWidth id="descripcion" name="descripcion" label="Descripción" value={videoData.descripcion} onChange={handleInputChange} variant="outlined" multiline rows={4} />

            <Button variant="contained" component="label" sx={{ alignSelf: "flex-start" }}>
              Subir Archivo de Video
              <input type="file" id="video" hidden onChange={handleFileChange} accept="video/*" />
            </Button>

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Subir Video
            </Button>
          </Box>

          {videoPreview && (
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Vista Previa del Video
              </Typography>
              <video controls src={videoPreview} style={{ width: "100%", height: "auto", borderRadius: 8 }} />
            </Box>
          )}
        </Box>
      ) : (
        <Typography variant="body1">Cargando unidades...</Typography>
      )}
    </Container>
  );
}

export default CreateClaseVideo;
