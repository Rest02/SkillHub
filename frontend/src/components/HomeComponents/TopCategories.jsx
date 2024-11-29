import React from "react";
import { Box, Typography, Container } from "@mui/material";

function TopCategories() {
  const categories = [
    {
      name: "Desarrollo Web",
      courses: 12,
      color: "#FFD700", // Dorado
      icon: "https://cdn-icons-png.flaticon.com/512/3003/3003433.png",
    },
    {
      name: "Diseño Gráfico",
      courses: 9,
      color: "#87CEFA", // Azul cielo
      icon: "https://cdn-icons-png.flaticon.com/512/1673/1673569.png",
    },
    {
      name: "Marketing Digital",
      courses: 15,
      color: "#FFA07A", // Salmón
      icon: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    },
    {
      name: "Inteligencia Artificial",
      courses: 7,
      color: "#90EE90", // Verde claro
      icon: "https://cdn-icons-png.flaticon.com/512/2942/2942179.png",
    },
  ];

  return (
    <Container
      sx={{
        marginTop: "40px",
        maxWidth: "1200px", // Ajusta el ancho máximo del contenedor
      }}
    >
      {/* Título y descripción */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: 1,
            fontFamily: "Lato",
            textAlign: "left", // Alineado a la izquierda
          }}
        >
          Top Categorías
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "18px",
            color: "gray",
            textAlign: "justify", // Justificación del texto descriptivo
          }}
        >
          Explora nuestras categorías más populares y encuentra cursos que se
          adapten a tus intereses y metas profesionales. Aprende algo nuevo hoy
          en las áreas más demandadas del mercado. Cada categoría está diseñada
          para brindarte la mejor experiencia de aprendizaje.
        </Typography>
      </Box>

      {/* Contenedor de categorías */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2, // Espaciado entre las tarjetas
          flexWrap: "wrap", // Responsividad
        }}
      >
        {categories.map((category, index) => (
          <Box
            key={index}
            sx={{
              flex: "1 1 20%", // Tamaño adaptable
              maxWidth: "220px",
              height: "200px",
              backgroundColor: category.color,
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 2,
              position: "relative",
              transform: index % 2 === 0 ? "translateY(-10px)" : "translateY(10px)", // Efecto de alturas alternas
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(0)",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            {/* Título de la categoría */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "black",
                textAlign: "left", // Alineado a la izquierda
                marginBottom: 1,
              }}
            >
              {category.name}
            </Typography>

            {/* Número de cursos */}
            <Typography
              variant="body2"
              sx={{
                color: "black",
                textAlign: "left", // Alineado a la izquierda
              }}
            >
              {category.courses} cursos
            </Typography>

            {/* Icono */}
            <Box
              component="img"
              src={category.icon}
              alt={category.name}
              sx={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                width: "50px",
                height: "50px",
              }}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default TopCategories;
