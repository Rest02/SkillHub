import React, { useContext, useState, useEffect } from "react";
import { MisCursosContext } from "../../context/MisCursosContext.jsx";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Grid,
  Pagination,
  Box,
} from "@mui/material";

const MisCursosCard = () => {
  const { cursos } = useContext(MisCursosContext);
  const [paginaActual, setPaginaActual] = useState(1);
  const cursosPorPagina = 3;

  useEffect(() => {
    setPaginaActual(1); // Reinicia a la primera página si cambian los cursos
  }, [cursos]);

  // Calcular los cursos que se mostrarán en la página actual
  const totalPaginas = Math.ceil(cursos.length / cursosPorPagina);
  const indiceInicio = (paginaActual - 1) * cursosPorPagina;
  const indiceFin = indiceInicio + cursosPorPagina;
  const cursosActuales = cursos.slice(
    indiceInicio,
    Math.min(indiceFin, cursos.length)
  );

  // Cambiar de página
  const handlePaginaChange = (event, value) => {
    if (value >= 1 && value <= totalPaginas) {
      setPaginaActual(value);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "left", color: "#836953" }}>Mis Cursos</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {cursosActuales.map((curso, index) => (
          <Card
            key={curso.id || `${curso.titulo}-${index}`} // Asegura una clave única
            sx={{
              padding: "20px",
              justifyContent: "center",
              width: 800,
              height: 250,
              borderRadius: "20px",
              display: "flex",
              flexDirection: "row",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              border: "1px solid #d2b48c",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="100"
              image={`http://localhost:4000/${curso.imagen_portada}`}
              alt="Imagen de portada del curso"
              sx={{
                border: "2px solid #836953",
                borderRadius: "50%",
                marginRight: "15px",
                width: "250px",
                height: "250px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />

            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "60%",
                paddingTop: "25px",
              }}
            >
              <div style={{ width: "100%" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#836953",
                    border: "1px solid #d2b48c",
                    borderRadius: "6px",
                    padding: "10px 15px",
                    backgroundColor: "#f5deb3",
                    textAlign: "left",
                  }}
                >
                  {curso.titulo}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: 2,
                    border: "1px solid #d2b48c",
                    borderRadius: "6px",
                    maxHeight: "3em",
                    overflowY: "auto",
                    padding: "10px 15px",
                    textAlign: "justify",
                    color: "#4f3d21",
                    backgroundColor: "#ffebcd",
                  }}
                >
                  {curso.descripcion}
                </Typography>
              </div>

              <div style={{ marginTop: "15px", width: "100%" }}>
                <Grid container spacing={2} justifyContent="center">
                  {[
                    "Crear Unidad",
                    "Subir Videos",
                    "Eliminar",
                    "Comentarios",
                    "Portadas",
                    "Editar",
                  ].map((text) => (
                    <Grid item xs={4} key={text}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          backgroundColor: "#836953",
                          color: "#ffffff",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "#a57c65",
                          },
                        }}
                      >
                        {text}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginación */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          count={totalPaginas}
          page={paginaActual}
          onChange={handlePaginaChange}
          color="standard"
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#836953 !important",
              color: "#ffffff !important",
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "#a57c65",
              color: "#ffffff",
            },
          }}
        />
      </Box>
    </div>
  );
};

export default MisCursosCard;
