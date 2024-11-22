import React from "react";
import { AppBar, Toolbar, Box, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { AccountCircle, Search } from "@mui/icons-material";
import logo from "../../assets/img/logo.png"; // Importa el logo
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const NavBar = () => {
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  // Funciones para redireccionar
  const goToMisCursos = () => {
    navigate("/miscursos"); // Redirige a /misCursos
  };

  const goToLogin = () => {
    navigate("/login"); // Redirige a /misCursos
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#C0C0C0", // Mismo color de fondo que el navbar del instructor
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        height: "60px", // Altura de la barra
        justifyContent: "center",
        padding: "0 20px",
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
            height: "40px", // Altura fija para el logo
            width: "auto", // Mantiene proporciones
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
            Cursos
          </Button>
          <Button
            variant="text"
            sx={{
              color: "#000000",
              fontWeight: "bold",
              "&:hover": { color: "#9B111E" },
            }}
          >
            Aprendizaje
          </Button>
        </Box>

        {/* Perfil y botones de acción */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, paddingLeft: " 20px" }}>
          <Button
            variant="outlined"
            onClick={goToLogin}
            sx={{
              color: "#000000",
              borderColor: "#000000",
              fontWeight: "bold",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#9B111E",
                color: "#FFFFFF",
                borderColor: "#9B111E",
              },
            }}
          >
            Iniciar Sesión
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#9B111E", // Rojo rubí
              color: "#ffffff",
              fontWeight: "bold",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#C0C0C0", // Gris claro al pasar el ratón
                color: "#000000",
              },
            }}
          >
            Registrarse
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
