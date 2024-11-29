import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { MisCursosContext } from "../../context/MisCursosContext.jsx";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from "@mui/material";

const DeleteUnidad = () => {
  const { courseId } = useParams();
  const { unidades, setCursoSeleccionado, deleteUnidad } = useContext(MisCursosContext);
  const [selectedUnidad, setSelectedUnidad] = useState("");

  // Configura el curso seleccionado al montar el componente
  useEffect(() => {
    setCursoSeleccionado({ id: courseId });
  }, [courseId, setCursoSeleccionado]);

  // Maneja el cambio de unidad seleccionada
  const handleSelectChange = (event) => {
    setSelectedUnidad(event.target.value);
  };

  // Maneja la eliminación de la unidad
  const handleDeleteUnidad = async () => {
    if (!selectedUnidad) {
      alert("Selecciona una unidad para eliminar.");
      return;
    }

    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta unidad? Esta acción no se puede deshacer."
    );

    if (confirmDelete) {
      const result = await deleteUnidad(courseId, selectedUnidad);
      if (result && result.success) {
        alert("Unidad eliminada con éxito.");
        setSelectedUnidad(""); // Resetea la selección
      } else {
        alert(result?.message || "Error al eliminar la unidad.");
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Eliminar Unidad
      </Typography>

      {/* Verifica si hay unidades disponibles */}
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
              {/* Reutiliza el mapeo de unidades */}
              {unidades.map((unidad) => (
                <MenuItem key={unidad.unidad_id} value={unidad.unidad_id}>
                  {unidad.unidad_titulo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedUnidad && (
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleDeleteUnidad}
            >
              Eliminar Unidad
            </Button>
          )}
        </Box>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No hay unidades disponibles para eliminar. Crea una unidad para esta acción.
        </Typography>
      )}
    </Container>
  );
};

export default DeleteUnidad;
