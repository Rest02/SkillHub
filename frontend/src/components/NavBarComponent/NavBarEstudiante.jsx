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
import {
  AccountCircle,
  ShoppingCart,
  Menu as MenuIcon,
} from "@mui/icons-material";
import logo from "../../assets/img/logo.png";
import logoSmall from "../../assets/img/logoSmall.png"; // Logo para pantallas pequeñas
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const NavBarEstudiante = () => {
  const { setToken } = useAuth();
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
  const goToAprendizaje = () => navigate("/aprendizaje");
  const goToCarrito = () => navigate("/cart");
  const goToHome = () => navigate("/");

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

  const handleCarritoClick = () => {
    navigate("/cart");
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
        {/* Menú de hamburguesa (aparece en pantallas pequeñas) */}
        <IconButton
          sx={{
            display: { xs: "block", md: "none" },
            color: "#000000",
            marginRight: "16px", // Separación adicional
          }}
          onClick={toggleDrawer}
        >
          <MenuIcon fontSize="large" /> {/* Cambié el tamaño aquí */}
        </IconButton>

        {/* Logo centrado */}
        <Box
          component="img"
          onClick={goToHome}
          src={logo}
          alt="SkillHub Logo"
          sx={{
            height: "80px", // Aumentando el tamaño del logo
            width: "auto",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: { xs: "none", md: "block" }, // Solo en pantallas grandes
            

          }}
        />

        {/* Ícono del carrito */}
        <IconButton
          sx={{
            display: { xs: "block", md: "none" },
            color: "#000000",
          }}
          onClick={handleCarritoClick}
        >
          <ShoppingCart fontSize="large" />
        </IconButton>

        {/* Opciones de navegación izquierda (en pantallas grandes) */}
        <Box
          sx={{
            display: "flex",
            gap: 4, // Aumentando el espacio entre los botones de navegación
            display: { xs: "none", md: "flex" },
          }}
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

        {/* Logo centrado con ícono del carrito en pantallas móviles */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" }, // Asegura que el logo pequeño se muestra solo en pantallas pequeñas
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
            alt="SkillHub Logo"
            sx={{
              height: "80px", // Aumentando el tamaño del logo en pantallas pequeñas
              width: "auto",
            }}
          />
        </Box>

        {/* Opciones de navegación derecha (en pantallas grandes) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4, // Aumentando el espacio entre los iconos
            display: { xs: "none", md: "flex" },
          }}
        >
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
            onClick={handleCarritoClick}
          >
            <ShoppingCart fontSize="large" />
          </IconButton>
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

        {/* Menú desplegable para configuración de cuenta */}
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
          <Button onClick={goToAprendizaje}>Aprendizaje</Button>
          <Button onClick={goToHome}>Home</Button>
          <Button onClick={handleCerrarSesion}>Cerrar Sesión</Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default NavBarEstudiante;
