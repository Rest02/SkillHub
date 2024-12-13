import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
} from "@mui/material";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import logo from "../../assets/img/logo.png"; // Logo para pantallas grandes
import logoSmall from "../../assets/img/logoSmall.png"; // Logo para pantallas pequeñas
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToNosotros = () => navigate("/nosotros");
  const goToCursos = () => navigate("/cursos");
  const goToHome = () => navigate("/");
  const goToLogin = () => navigate("/login");
  const goToRegister = () => navigate("/register");

  const handleCerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        padding: "20px 50px",
        fontFamily: "Kanit, sans-serif",
        width: "80%",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Menú de hamburguesa */}
        <IconButton
          sx={{
            display: { xs: "block", md: "none" },
            color: "#000000",
            marginRight: "16px",
          }}
          onClick={toggleDrawer}
        >
          <MenuIcon fontSize="large" /> {/* Icono agrandado */}
        </IconButton>

        {/* Logo centrado */}
        <Box
          component="img"
          onClick={goToHome}
          src={logo}
          alt="Logo"
          sx={{
            height: "80px",
            width: "auto",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: { xs: "none", md: "block" },
          }}
        />

        {/* Logo pequeño para pantallas móviles */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Box
            component="img"
            onClick={goToHome}
            src={logoSmall}
            alt="Logo pequeño"
            sx={{
              height: "80px",  // Aumento del tamaño del logo pequeño
              width: "auto",
            }}
          />
        </Box>

        {/* Opciones de navegación izquierda */}
        <Box
          sx={{ display: "flex", gap: 3, display: { xs: "none", md: "flex" } }}
        >
          <Button
            variant="text"
            onClick={goToNosotros}
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
            Nosotros
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
          <Button
            variant="text"
            onClick={goToHome}
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
            Home
          </Button>
        </Box>

        {/* Opciones de navegación derecha */}
        <Box
          sx={{ display: "flex", gap: 3, display: { xs: "none", md: "flex" } }}
        >
          <Button
            variant="text"
            onClick={goToLogin}
            sx={{
              color: "#000000",
              fontWeight: "bold",
              fontFamily: "Kanit, sans-serif",
              fontSize: "1rem",
              "&:hover": { color: "#1D63FF" },
            }}
          >
            Iniciar Sesión
          </Button>
          <Button
            variant="contained"
            onClick={goToRegister}
            sx={{
              backgroundColor: "#1D63FF",
              color: "#fff",
              fontWeight: "bold",
              fontFamily: "Kanit, sans-serif",
              fontSize: "1rem",
              "&:hover": { backgroundColor: "#0d4b99" },
            }}
          >
            Registrarse
          </Button>
        </Box>

        {/* Menú desplegable para configuración de cuenta */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleCerrarSesion}>Cerrar Sesión</MenuItem>
        </Menu>
      </Toolbar>

      {/* Drawer para el menú de hamburguesa */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Button onClick={goToNosotros}>Nosotros</Button>
          <Button onClick={goToCursos}>Cursos</Button>
          <Button onClick={goToHome}>Home</Button>
          <Button onClick={goToLogin}>Iniciar Sesión</Button>
          <Button onClick={goToRegister}>Registrarse</Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
