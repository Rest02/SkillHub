import React, { useState } from "react";
import { Button, Typography, Box, Menu, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function MenuEditsCourse() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState(null);
  const navigate = useNavigate();
  const { courseId } = useParams(); // Asegúrate de obtener el courseId correctamente

  const handleOpenMenu = (event, type) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuType(null);
  };

  const handleCrearUnidad = () => {
    navigate(`/courses/${courseId}/units`);
    handleCloseMenu();
  };

  const handleCrearClase = () => {
    navigate(`/units/${courseId}/videos`);
    handleCloseMenu();
  };

  const handleEditarUnidad = () => {
    navigate(`/units/${courseId}/update`);
    handleCloseMenu();
  };

  const handleEditarClase = () => {
    navigate(`/clase/${courseId}/update`);
    handleCloseMenu();
  };

  const handleEliminarUnidad = () => {
    navigate(`/unidad/${courseId}/delete`);
    handleCloseMenu();
  };

  const handleEliminarClase = () => {
    navigate(`/clase/${courseId}/delete`); // Redirige a la ruta de eliminación de clase
    handleCloseMenu();
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
            backgroundColor: "#6A5ACD",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#3FA557",
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
            backgroundColor: "#4682B4",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#366589",
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
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#9B111E",
              color: "white",
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
            width: anchorEl ? anchorEl.offsetWidth : undefined,
            borderRadius: "12px",
          },
        }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mt: 1 }}
      >
        {menuType === "crear" && (
          <div>
            <MenuItem onClick={handleCrearUnidad}>Crear Unidad</MenuItem>
            <MenuItem onClick={handleCrearClase}>Crear Clase</MenuItem>
          </div>
        )}
        {menuType === "editar" && (
          <div>
            <MenuItem onClick={handleEditarUnidad}>Editar Unidad</MenuItem>
            <MenuItem onClick={handleEditarClase}>Editar Clase</MenuItem>
          </div>
        )}
        {menuType === "eliminar" && (
          <div>
            <MenuItem onClick={handleEliminarUnidad}>Eliminar Unidad</MenuItem>
            <MenuItem onClick={handleEliminarClase}>Eliminar Clase</MenuItem> {/* Aquí se redirige */}
          </div>
        )}
      </Menu>
    </Box>
  );
}

export default MenuEditsCourse;
