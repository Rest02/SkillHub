import React, { useState } from "react";
import { AppBar, Toolbar, Box, TextField, IconButton, InputAdornment, Button, Menu, MenuItem } from "@mui/material";
import { AccountCircle, Search } from "@mui/icons-material";
import logo from "../../assets/img/logo.png"; // Importa el logo
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx"; // Ajusta la ruta según tu estructura

const NavBarInstructor = () => {
  const { setToken } = useAuth(); // Accede a setToken desde el contexto
  const navigate = useNavigate();

  // Estado para el menú
  const [anchorEl, setAnchorEl] = useState(null); // Almacena el elemento donde se abrirá el menú
  const open = Boolean(anchorEl);

  // Manejar apertura y cierre del menú
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Configura el elemento de anclaje
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Cierra el menú
  };

  // Funciones de navegación
  const goToMisCursos = () => navigate("/miscursos");
  const goToCursos = () => navigate("/cursos");
  const goToNosotros = () => navigate("/nosotros");
  const goToAprendizaje = () => navigate("/aprendizaje");
  const goToConfiguracionCuenta = () => {
    handleMenuClose(); // Cierra el menú antes de navegar
    navigate("/perfil");
  };
  const handleCerrarSesion = () => {
    localStorage.removeItem("token"); // Elimina el token del almacenamiento local
    setToken(null); // Limpia el estado del token
    navigate("/"); // Redirige al usuario a la página de inicio de sesión
    navigate(0);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff", // Azul marino para el fondo principal
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        height: "60px",
        justifyContent: "center",
        padding: "0 20px",
        border : "1px solid black"
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: "40px",
            width: "auto",
          }}
        />

        {/* Barra de búsqueda */}
        <Box sx={{ flexGrow: 1, mx: 3 }}>
          <TextField
            fullWidth
            placeholder="Busca tu futuro curso"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#FFFFFF" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: "#ffffff",
              borderRadius: "20px",
              border: "1px solid black",
              height: "40px",
              "& .MuiOutlinedInput-root": {
                height: "40px",
                "& fieldset": { border: "none" },
              },
            }}
          />
        </Box>

        {/* Botones de navegación */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="text"
            onClick={goToNosotros}
            sx={{
              color: "#000000",
              fontWeight: "bold",
              "&:hover": { color: "#9B111E" }, // Rojo rubí al pasar el ratón
            }}
          >
            Nosotros
          </Button>
          <Button
            variant="text"
            onClick={goToMisCursos}
            sx={{
              color: "#000000",
              fontWeight: "bold",
              "&:hover": { color: "#9B111E" },
            }}
          >
            Mis Cursos
          </Button>
          <Button
            variant="text"
            onClick={goToCursos}
            sx={{
              color: "#000000",
              fontWeight: "bold",
              "&:hover": { color: "#9B111E" },
            }}
          >
            Cursos
          </Button>
          <Button
            variant="text"
            onClick={goToAprendizaje}
            sx={{
              color: "#000000",
              fontWeight: "bold",
              "&:hover": { color: "#9B111E" },
            }}
          >
            Aprendizaje
          </Button>
        </Box>

        {/* Icono de perfil */}
        <IconButton
          sx={{
            color: "#000000",
            "&:hover": { color: "#9B111E" }, // Rojo rubí al pasar el ratón
          }}
          onClick={handleMenuOpen}
        >
          <AccountCircle fontSize="large" />
        </IconButton>

        {/* Menú desplegable */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={goToConfiguracionCuenta}>Configuración de cuenta</MenuItem>
          <MenuItem onClick={handleCerrarSesion}>Cerrar Sesión</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarInstructor;
