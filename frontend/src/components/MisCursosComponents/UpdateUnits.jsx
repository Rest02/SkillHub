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
} from "@mui/material";

const UpdateUnits = () => {
  const { courseId } = useParams(); // Obtiene el ID del curso desde los parámetros
  const { unidades, setCursoSeleccionado } = useContext(MisCursosContext);
  const [selectedUnidad, setSelectedUnidad] = useState("");

  // Cuando se monta el componente, asegura que el curso seleccionado se establece
  useEffect(() => {
    setCursoSeleccionado({ id: courseId });
  }, [courseId, setCursoSeleccionado]);

  const handleSelectChange = (event) => {
    setSelectedUnidad(event.target.value);
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
