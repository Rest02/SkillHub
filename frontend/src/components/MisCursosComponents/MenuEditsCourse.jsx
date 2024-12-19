import React, { useState } from "react";
import { Button, Box, Menu, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function MenuEditsCourse() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState(null);
  const navigate = useNavigate();
  const { courseId } = useParams();

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
    navigate(`/clase/${courseId}/delete`);
    handleCloseMenu();
  };

  return (
    <Box className="max-w-screen-xl transition-all mx-auto my-10">
      <Box className="flex justify-around mb-4">
        {/* Botón Crear */}
        <Button
          sx={{
            color: 'white',
            fontWeight: 'bold',
            width: "300px",
            height: '3rem',
            borderRadius: '9999px',
            backgroundColor: '#14b8a6',
            '&:hover': {
              backgroundColor: '#0d9488',
            },
            boxShadow: 4,
            transition: 'transform 0.2s',
            '&:active': {
              transform: 'scale(0.95)',
            },
            border: '1px solid black',
            
          }}
          onClick={(e) => handleOpenMenu(e, "crear")}
        >
          Crear 🧩
        </Button>

        {/* Botón Editar */}
        <Button
          sx={{
            color: 'white',
            fontWeight: 'bold',
            width: "300px",
            height: '3rem',
            borderRadius: '9999px',
            backgroundColor: '#6366f1',
            '&:hover': {
              backgroundColor: '#4f46e5',
            },
            border: '1px solid black',
            boxShadow: 4,

          }}
          onClick={(e) => handleOpenMenu(e, "editar")}
        >
          Editar ✏️
        </Button>

        {/* Botón Eliminar */}
        <Button
          sx={{
            color: 'white',
            fontWeight: 'bold',
            width: "300px",
            height: '3rem',
            borderRadius: '9999px',
            backgroundColor: '#f43f5e',
            '&:hover': {
              backgroundColor: '#e11d48',
            },
            boxShadow: 4,
            transition: 'transform 0.2s',
            '&:active': {
              transform: 'scale(0.95)',
            },
            border: '1px solid black'
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
            width: "300px", // Asegura que el menú tenga el mismo ancho que los botones
            border: "1px solid black", // Borde negro en el menú
            borderRadius: 2,
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            padding: 1,
            backgroundColor: "white",
            color: "black",
            marginTop: 2, // Espacio entre el botón y el menú
          },
        }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
            <MenuItem onClick={handleEliminarClase}>Eliminar Clase</MenuItem>
          </div>
        )}
      </Menu>
    </Box>
  );
}

export default MenuEditsCourse;
