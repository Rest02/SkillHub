import React, { useState, useEffect, useContext } from "react";
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
  TextField,
  Button,
} from "@mui/material";
import { useSnackbar } from "notistack"; // Importa useSnackbar para las alertas

const UpdateUnits = () => {
  const { courseId } = useParams();
  const { unidades, setCursoSeleccionado, actualizarUnidad } = useContext(MisCursosContext);
  const { enqueueSnackbar } = useSnackbar(); // Hook de notistack para mostrar notificaciones
  const [selectedUnidad, setSelectedUnidad] = useState("");
  const [unidadData, setUnidadData] = useState({
    titulo: "",
    descripcion: "",
    objetivos: "",
    tema: "",
  });
  const navigate = useNavigate(); // Usamos navigate para redirigir al usuario

  useEffect(() => {
    setCursoSeleccionado({ id: courseId });
  }, [courseId, setCursoSeleccionado]);

  const handleSelectChange = (event) => {
    const unidadId = event.target.value;
    setSelectedUnidad(unidadId);

    const unidadSeleccionada = unidades.find((unidad) => unidad.unidad_id === unidadId);
    if (unidadSeleccionada) {
      setUnidadData({
        titulo: unidadSeleccionada.unidad_titulo,
        descripcion: unidadSeleccionada.unidad_descripcion,
        objetivos: unidadSeleccionada.unidad_objetivos || "",
        tema: unidadSeleccionada.unidad_tema || "",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUnidadData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateUnidad = async () => {
    if (!selectedUnidad || !unidadData.titulo || !unidadData.descripcion) {
      enqueueSnackbar("Por favor, completa todos los campos antes de actualizar.", { variant: "error" });
      return;
    }

    try {
      const result = await actualizarUnidad(courseId, selectedUnidad, unidadData);
      if (result) {
        // Muestra una notificación de éxito
        enqueueSnackbar("Unidad actualizada correctamente.", { variant: "success" });
        
        // Redirige a la página de unidades después de un breve retraso
        setTimeout(() => {
          navigate(`/cursos/${courseId}/unitsandvideos`);
        });
      } else {
        enqueueSnackbar("Ocurrió un error al actualizar la unidad.", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error al intentar actualizar la unidad. Intenta nuevamente.", { variant: "error" });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Actualizar Unidad
      </Typography>

      {unidades.length > 0 ? (
        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="unidad-select-label">Seleccionar Unidad</InputLabel>
            <Select
              labelId="unidad-select-label"
              id="unidad-select"
              value={selectedUnidad}
              onChange={handleSelectChange}
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
              <TextField
                label="Título de la unidad"
                variant="outlined"
                fullWidth
                name="titulo"
                value={unidadData.titulo}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Descripción de la unidad"
                variant="outlined"
                fullWidth
                name="descripcion"
                value={unidadData.descripcion}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Objetivos de la unidad"
                variant="outlined"
                fullWidth
                name="objetivos"
                value={unidadData.objetivos}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Tema de la unidad"
                variant="outlined"
                fullWidth
                name="tema"
                value={unidadData.tema}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleUpdateUnidad}
              >
                Actualizar Unidad
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Crea una unidad en tu curso para poder editarla
        </Typography>
      )}
    </Container>
  );
};

export default UpdateUnits;
