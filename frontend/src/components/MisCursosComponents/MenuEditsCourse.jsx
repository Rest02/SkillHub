import React, { useState } from "react";
import { Button, Typography, Box, Menu, MenuItem } from "@mui/material";
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
    <Box
    sx={{
      maxWidth: 600,
      margin: "0 auto",
      padding: 2,  // Reducido padding
      backgroundColor: "#1f2937",
      borderRadius: 2,
      boxShadow: 6,
      border: "1px solid black",
      transition: "all 0.3s ease",
      ":hover": {
        boxShadow: 10,
      },
    }}
  >
    <Typography
      variant="h5"
      align="center"
      gutterBottom
      sx={{ fontWeight: 'bold', color: "#fefefefe", paddingBottom: "15px" }} // Menor separación
    >
      Menú de opciones
    </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        {/* Crear */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            border: "1px solid #6A5ACD",
            width: "240px",
            borderRadius: "25px",
            backgroundColor: "#6A5ACD",
            color: "#FFFFFF",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#3FA557",
              color: "#FFFFFF",
            },
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s, box-shadow 0.3s",
          }}
          onClick={(e) => handleOpenMenu(e, "crear")}
        >
          Crear 🧩
        </Button>

        <Button
          variant="contained"
          color="secondary"
          sx={{
            textTransform: "none",
            border: "1px solid #4682B4",
            width: "240px",
            borderRadius: "25px",
            backgroundColor: "#4682B4",
            color: "#FFFFFF",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#366589",
              color: "#FFFFFF",
            },
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s, box-shadow 0.3s",
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
            border: "1px solid #9B111E",
            width: "240px",
            borderRadius: "25px",
            backgroundColor: "#9B111E",
            color: "white",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#B12E38",
              color: "white",
            },
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s, box-shadow 0.3s",
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
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            padding: "10px",
          },
        }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mt: 2 }}
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
