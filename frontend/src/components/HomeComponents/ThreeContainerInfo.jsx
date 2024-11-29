import React from "react";
import { Box, Typography, Avatar, Container } from "@mui/material";

function ThreeContainerInfo() {
  return (
    <Container
      sx={{
        maxWidth: "100%", // Ancho máximo del contenedor
        margin: "auto", // Centrado horizontal
        padding: "20px", // Espaciado interno
      }}
    >
      {/* Contenedor de los tres bloques */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap", // Responsividad
        }}
      >
        {/* Primer contenedor */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            width: "28%", // Ajusta el ancho para que queden 3 en una fila
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <Avatar
              src="https://cdn-icons-png.flaticon.com/512/2293/2293883.png"
              alt="icon1"
              sx={{ width: 60, height: 60, marginRight: 1 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                transition: "color 0.3s",
                "&:hover": {
                  color: "#9B111E", // Cambia este color al que prefieras
                },
              }}
            >
              Aprende de Creadores
            </Typography>
          </Box>
          <Typography variant="body1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
            odio expedita aliquam dolor voluptates eveniet consequuntur at ipsa.
            Sit ea temporibus dolorem hic reprehenderit ullam iusto quis
            incidunt adipisci harum!
          </Typography>
        </Box>

        {/* Segundo contenedor */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            width: "28%",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <Avatar
              src="https://cdn-icons-png.flaticon.com/512/2377/2377746.png"
              alt="icon2"
              sx={{ width: 60, height: 60, marginRight: 1 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                transition: "color 0.3s",
                "&:hover": {
                  color: "#9B111E",
                },
              }}
            >
              Videos y Comentarios
            </Typography>
          </Box>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe,
            eveniet nesciunt! Nesciunt qui amet deserunt dolorum, odio ab nulla
            accusantium expedita, quisquam, neque unde delectus sequi veniam
            officia. Perspiciatis, autem.
          </Typography>
        </Box>

        {/* Tercer contenedor */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            width: "28%",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <Avatar
              src="https://cdn-icons-png.flaticon.com/512/5406/5406791.png"
              alt="icon3"
              sx={{ width: 60, height: 60, marginRight: 1 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                transition: "color 0.3s",
                "&:hover": {
                  color: "#9B111E",
                },
              }}
            >
              Certificaciones
            </Typography>
          </Box>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            natus, quasi laborum possimus enim laudantium porro iure, nobis
            perferendis maxime dolorum harum, architecto illum vel libero
            corrupti dolores reiciendis eaque?
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default ThreeContainerInfo;
