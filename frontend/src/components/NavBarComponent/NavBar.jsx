import React from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import logo from "../../assets/img/logo.png"; // Asegúrate de usar la ruta correcta
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const goToNosotros = () => navigate("/nosotros");
  const goToCursos = () => navigate("/cursos");
  const goToAprendizaje = () => navigate("/aprendizaje");
  const goToLogin = () => navigate("/login");
  const goToRegister = () => navigate("/register");

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
            onClick={goToAprendizaje}
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
            Aprendizaje
          </Button>
        </Box>

        {/* Logo centrado */}
        <Box
          component="img"
          src={logo}
          alt="SkillHub Logo"
          sx={{
            height: "80px",
            width: "auto",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        {/* Botones de acciones derecha */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button
            variant="outlined"
            onClick={goToLogin}
            sx={{
              color: "#000000",
              borderColor: "#000000",
              fontWeight: "bold",
              fontFamily: "Kanit, sans-serif",
              fontSize: "1rem",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#1D63FF",
                color: "#FFFFFF",
                borderColor: "#1D63FF",
              },
            }}
          >
            Iniciar Sesión
          </Button>
          <Button
            variant="contained"
            onClick={goToRegister}
            sx={{
              backgroundColor: "#1D63FF",
              color: "#FFFFFF",
              fontWeight: "bold",
              fontFamily: "Kanit, sans-serif",
              fontSize: "1rem",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#000000",
                color: "#FFFFFF",
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
