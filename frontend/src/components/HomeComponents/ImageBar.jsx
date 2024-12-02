import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import BackImage from "../../assets/img/BackImage.png";

function ImageBar() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "transparent",
          borderRadius: 2,
          padding: 3,
          width: "70%",
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        {/* Título principal */}
        <Typography
          variant="h4"
          sx={{
            marginBottom: 1,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            color: "#1D63FF",
          }}
        >
          Create and sell
        </Typography>

        {/* Subtítulo */}
        <Typography
          variant="h2"
          sx={{
            marginBottom: 2,
            fontFamily: "Lato, sans-serif",
            fontWeight: 400,
            color: "#1D63FF",
          }}
        >
          your own beautiful online courses
        </Typography>

        {/* Campo de búsqueda */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: 1, // Separación uniforme entre elementos
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search for courses..."
            fullWidth
            sx={{
              borderRadius: "20px",
              backgroundColor: "#F7F7F7",
              "& .MuiOutlinedInput-root": {
                height: "60px", // Altura uniforme
                "& fieldset": {
                  border: "1px solid #1D63FF",
                  borderRadius: "20px",
                },
                "&:hover fieldset": {
                  border: "1px solid #1D63FF",
                },
                "&.Mui-focused fieldset": {
                  border: "1px solid #1D63FF",
                },
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              height: "60px",
              minWidth: "150px", // Tamaño más manejable
              backgroundColor: "#1D63FF",
              color: "#FFFFFF",
              borderRadius: "30px",
              fontSize: "1rem",
              fontWeight: "bold",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#145BB2",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)",
              },
              "&:active": {
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Box
        component="img"
        src={BackImage}
        alt="Background"
        sx={{
          width: "50%",
          height: "auto",
          borderRadius: 2,
          flexGrow: 1,
          alignSelf: "center",
        }}
      />
    </Box>
  );
}

export default ImageBar;
