import React from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";

const NavBarEstudiante = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#f7f3e9", padding: "10px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box component="h1">Estudiante</Box>
        <Box>
          <Button sx={{ color: "#8C6D62" }}>Inicio</Button>
          <Button sx={{ color: "#8C6D62" }}>Cursos</Button>
          <Button sx={{ color: "#8C6D62" }}>Perfil</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarEstudiante;
