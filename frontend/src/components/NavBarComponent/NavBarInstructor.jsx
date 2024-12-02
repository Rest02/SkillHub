import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import logo from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const NavBarInstructor = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToMisCursos = () => navigate("/miscursos");
  const goToCursos = () => navigate("/cursos");
  const goToNosotros = () => navigate("/nosotros");
  const goToAprendizaje = () => navigate("/aprendizaje");
  const goToConfiguracionCuenta = () => {
    handleMenuClose();
    navigate("/perfil");
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
    navigate(0);
  };

  return (
<AppBar
  position="static"
  sx={{
    backgroundColor: "transparent",
    boxShadow: "none",
    border: "none",
    padding: "20px 50px",
    fontFamily: "Kanit, sans-serif",
    width: "80%", // Hacemos que el navbar ocupe el 80% del ancho de la página
    margin: "0 auto", // Centramos el navbar horizontalmente
  }}
>
  <Toolbar
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    {/* Opciones de navegación izquierda */}
    <Box sx={{ display: "flex", gap: 3 }}>
      <Button
        variant="text"
        onClick={goToNosotros}
        sx={{
          position: "relative",
          color: "#000000",
          fontWeight: "bold",
          fontFamily: "Kanit, sans-serif",
          fontSize: "1rem", // Tamaño de texto ajustado
          "&:hover": { color: "#1D63FF" },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "0%",
            height: "2px",
            backgroundColor: "#1D63FF",
            transition: "width 0.3s ease-in-out",
          },
          "&:hover::after": {
            width: "100%",
          },
        }}
      >
        Nosotros
      </Button>
      <Button
        variant="text"
        onClick={goToMisCursos}
        sx={{
          position: "relative",
          color: "#000000",
          fontWeight: "bold",
          fontFamily: "Kanit, sans-serif",
          fontSize: "1rem",
          "&:hover": { color: "#1D63FF" },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "0%",
            height: "2px",
            backgroundColor: "#1D63FF",
            transition: "width 0.3s ease-in-out",
          },
          "&:hover::after": {
            width: "100%",
          },
        }}
      >
        Mis Cursos
      </Button>
      <Button
        variant="text"
        onClick={goToCursos}
        sx={{
          position: "relative",
          color: "#000000",
          fontWeight: "bold",
          fontFamily: "Kanit, sans-serif",
          fontSize: "1rem",
          "&:hover": { color: "#1D63FF" },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "0%",
            height: "2px",
            backgroundColor: "#1D63FF",
            transition: "width 0.3s ease-in-out",
          },
          "&:hover::after": {
            width: "100%",
          },
        }}
      >
        Cursos
      </Button>
    </Box>

    {/* Logo centrado */}
    <Box
      component="img"
      src={logo}
      alt="SkillHub Logo"
      sx={{
        height: "80px", // Tamaño del logo ajustado
        width: "auto",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    />

    {/* Opciones de navegación derecha */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
      <Button
        variant="text"
        onClick={goToAprendizaje}
        sx={{
          color: "#000000",
          fontWeight: "bold",
          fontFamily: "Kanit, sans-serif",
          fontSize: "1rem",
          "&:hover": { color: "#1D63FF" },
        }}
      >
        Aprendizaje
      </Button>
      <IconButton
        sx={{
          color: "#000000",
          "&:hover": { color: "#1D63FF" },
        }}
        onClick={handleMenuOpen}
      >
        <AccountCircle fontSize="large" />
      </IconButton>
    </Box>

    {/* Menú desplegable */}
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem onClick={goToConfiguracionCuenta}>
        Configuración de cuenta
      </MenuItem>
      <MenuItem onClick={handleCerrarSesion}>Cerrar Sesión</MenuItem>
    </Menu>
  </Toolbar>
</AppBar>

  );
};

export default NavBarInstructor;
