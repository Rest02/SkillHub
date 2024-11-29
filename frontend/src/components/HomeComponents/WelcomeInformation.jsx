import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import Welcome from "../../assets/img/Welcome.png"; // Asegúrate de que la ruta sea correcta

function WelcomeInformation() {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "800px",
        margin: "auto",
        marginTop: "50px",
      }}
    >
      {/* Imagen */}
      <Box
        component="img"
        src={Welcome} // Cambia la URL por la imagen que desees usar
        alt="Welcome"
        sx={{
          height: "100%",
          maxHeight: "500px", // Ajusta la altura máxima para que coincida con el texto
          borderRadius: "8px",
          objectFit: "cover",
        }}
      />

      {/* Texto y botón */}
      <Box sx={{ marginLeft: "20px", flex: 1 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          Bienvenido a nuestra plataforma
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          SkillHub
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px", color: "gray" }}>
          Aquí encontrarás toda la información necesaria para comenzar. Estamos
          encantados de tenerte aquí y esperamos que disfrutes de la
          experiencia. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quas asperiores explicabo expedita eligendi, amet molestiae dolores ex
          magni reiciendis a maxime recusandae aliquid eveniet iste voluptatem
          enim ut, ullam harum. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. A sequi ex sed magnam odit unde aut ipsam incidunt
          quisquam iste velit ipsa, excepturi doloribus eaque explicabo
          reiciendis. Porro, nobis ullam!
        </Typography>
        <Button
          variant="contained"
          sx={{
            border: "2px solid black",
            backgroundColor: "black",
            color: "white",
            borderRadius: "20px",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "#9B111E", // Cambia el color del fondo
              color: "black", // Cambia el color del texto
              border: "2px solid black", // Añade bordes negros
            },
          }}
        >
          Más información
        </Button>
      </Box>
    </Container>
  );
}

export default WelcomeInformation;
