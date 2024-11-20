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
        backgroundColor: "#f7f3e9", // Color claro
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
          minHeight: "unset",
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
                  <Search sx={{ color: "#8C6D62" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: "#ffffff",
              borderRadius: "20px", // Bordes redondeados
              height: "40px",
              "& .MuiOutlinedInput-root": {
                height: "40px", // Ajusta la altura del input
                "& fieldset": {
                  border: "none", // Sin bordes visibles
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
        </Box>

        {/* Botones de navegación */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="text"
            sx={{
              color: "#8C6D62",
              fontWeight: "bold",
              "&:hover": { color: "#f7f3e9" },
              padding: "0 8px",
            }}
          >
            Nosotros
          </Button>
          <Button
            variant="text"
            sx={{
              color: "#8C6D62",
              fontWeight: "bold",
              "&:hover": { color: "#f7f3e9" },
              padding: "0 8px",
            }}
            onClick={goToMisCursos} // Redirige al hacer clic

          >
            Cursos

          </Button>
          <Button
            variant="text"
            sx={{
              color: "#8C6D62",
              fontWeight: "bold",
              "&:hover": { color: "#f7f3e9" },
              padding: "0 8px",
            }}
          >
            Aprendizaje
          </Button>
        </Box>

        {/* Perfil y botones de acción */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, paddingLeft: " 20px"}}>
          <Button
            variant="outlined"
            onClick = {goToLogin}
            sx={{
              color: "#8C6D62",
              borderColor: "#8C6D62",
              fontWeight: "bold",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#8C6D62",
                color: "#f7f3e9",
                borderColor: "#8C6D62",
              },
            }}
          >
            Iniciar Sesión
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#8C6D62",
              color: "#ffffff",
              fontWeight: "bold",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#f7f3e9",
                color: "#8C6D62",
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
