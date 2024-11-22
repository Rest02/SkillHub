import React, { useState } from "react";
import { Button, Typography, Box, Menu, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";  // Importar useNavigate


function MenuEditsCourse() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState(null);
  const navigate = useNavigate();  // Crear una instancia de useNavigate
  const { courseId } = useParams();  // Acceder al courseId de los parámetros de la URL

  const handleOpenMenu = (event, type) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuType(null);
  };

  // Función para redirigir a la creación de unidad
  const handleCrearUnidad = () => {
    // Aquí se asume que tienes un courseId disponible
    navigate(`/courses/${courseId}/units`);  // Redirige a la ruta de creación de unidad
    handleCloseMenu();  // Cerrar el menú después de hacer clic
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "0 auto",
        padding: 2,
        backgroundColor: "#C0C0C0",
        borderRadius: 2,
        boxShadow: 3,
        border: "1px solid black",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Menú de opciones
      </Typography>
      <Box display="flex" justifyContent="center" gap={2}>
        {/* Crear */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            border: "1px solid black",
            width: "200px",
            borderRadius: "20px",
            backgroundColor: "#6A5ACD", // Verde para "Crear"
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#3FA557", // Hover más oscuro
              color: "#FFFFFF",
            },
          }}
          onClick={(e) => handleOpenMenu(e, "crear")}
        >
          Crear 🧩
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            border: "1px solid black",
            width: "200px",
            borderRadius: "20px",
            backgroundColor: "#4682B4", // Azul para "Editar"
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#366589", // Hover más oscuro
              color: "#FFFFFF",
            },
          }}
          onClick={(e) => handleOpenMenu(e, "editar")}
        >
          Editar ✏️
        </Button>
        {/* Eliminar */}
        <Button
          variant="contained"
          color="error"
          sx={{
            textTransform: "none",
            border: "1px solid black",
            width: "200px",
            borderRadius: "20px",
            backgroundColor: "black", // Color principal negro
            color: "white", // Texto blanco
            "&:hover": {
              backgroundColor: "#9B111E", // Fondo rojo al pasar el mouse
              color: "white", // Texto blanco en hover
            },
          }}
          onClick={(e) => handleOpenMenu(e, "eliminar")}
        >
          Eliminar 🗑️
        </Button>
      </Box>

      {/* Menú desplegable */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            width: anchorEl ? anchorEl.offsetWidth : undefined, // Ajusta el ancho al del botón
            borderRadius: "12px", // Opcional: coincide con el estilo del botón
          },
        }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          mt: 1, // Espacio entre el botón y el menú
        }}
      >
        {menuType === "crear" && (
          <div> {/* Cambié el fragmento por un div */}
            <MenuItem onClick={handleCrearUnidad}>Crear Unidad</MenuItem>  {/* Redirigir a crear unidad */}
            <MenuItem onClick={handleCloseMenu}>Crear Clase</MenuItem>
          </div>
        )}
        {menuType === "editar" && (
          <div> {/* Cambié el fragmento por un div */}
            <MenuItem onClick={handleCloseMenu}>Editar Unidad</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Editar Clase</MenuItem>
          </div>
        )}
        {menuType === "eliminar" && (
          <div> {/* Cambié el fragmento por un div */}
            <MenuItem onClick={handleCloseMenu}>Eliminar Unidad</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Eliminar Clase</MenuItem>
          </div>
        )}
      </Menu>
    </Box>
  );
}

export default MenuEditsCourse;
