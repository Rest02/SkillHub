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
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const MisCursosCard = () => {
  const { cursos } = useContext(MisCursosContext);
  const [paginaActual, setPaginaActual] = useState(1);
  const cursosPorPagina = 3;
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    setPaginaActual(1); // Reinicia a la primera página si cambian los cursos
  }, [cursos]);

  // Calcular los cursos que se mostrarán en la página actual
  const totalPaginas = Math.ceil(cursos.length / cursosPorPagina);
  const indiceInicio = (paginaActual - 1) * cursosPorPagina;
  const indiceFin = indiceInicio + cursosPorPagina;
  const cursosActuales = cursos
    .filter((curso) =>
      curso.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    ) // Filtrar por búsqueda
    .slice(indiceInicio, Math.min(indiceFin, cursos.length));

  // Cambiar de página
  const handlePaginaChange = (event, value) => {
    if (value >= 1 && value <= totalPaginas) {
      setPaginaActual(value);
    }
  };


  const goToCreateCourse = () => {
    navigate("/createCourse"); // Redirige a crearCurso
  };



  return (
    <div>
      <h1 style={{ textAlign: "left", color: "#000000" }}>Mis Cursos</h1>
      {/* Barra de búsqueda y botón */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "49%", // Ajustamos al 50% del contenedor
          marginBottom: "20px", // Espacio entre la barra de búsqueda y las tarjetas
        }}
      >
        <TextField
          label="Buscar Curso"
          variant="outlined"
          fullWidth
          sx={{
            marginRight: "10px", // Espacio entre la barra de búsqueda y el botón
            width: "70%", // La barra de búsqueda ocupa el 70% del 50% total
            borderRadius: "20px", // Bordes completamente redondeados para la barra de búsqueda
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px", // Asegura que la entrada tenga bordes redondeados
              "& fieldset": {
                borderColor: "#000000", // Borde negro por defecto
              },
              "&:focus": {
                borderColor: "#000000", // Borde negro al hacer foco
                boxShadow: "none", // Elimina cualquier sombra al hacer foco
              },
            },
            "& .MuiInputLabel-root": {
              color: "#000000", // Color de la etiqueta
            },
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          onClick={goToCreateCourse} // Redirige al hacer clic
          variant="contained"
          sx={{
            backgroundColor: "#000000", // Color principal
            color: "#ffffff",
            width: "30%", // El botón ocupa el 30% del 50% total
            borderRadius: "20px", // Bordes redondeados en el botón
            "&:hover": {
              backgroundColor: "#C0C0C0", // Hover
              color: "black"
            },
          }}
        >
          Crear Nuevo Curso
        </Button>
      </Box>

      {/* Contenedor principal con estilo flex */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start", // Para alinearlo al lado izquierdo
          width: "100%",
          // border: "1px solid #C0C0C0", // Borde con color gris
        }}
      >
        {/* Contenedor para las tarjetas */}
        <Box
          sx={{
            width: "50%", // Ocupa el 50% del ancho
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)", // Una sola tarjeta por fila
            gap: "20px",
            marginBottom: "20px", // Espacio entre las cards y la paginación
          }}
        >
          {cursosActuales.map((curso, index) => (
            <Card
              key={curso.id || `${curso.titulo}-${index}`} // Asegura una clave única
              sx={{
                padding: "20px",
                justifyContent: "center",
                height: "250px",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "row",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                border: "1px solid #000000", // Borde gris
                backgroundColor: "#C0C0C0", // Fondo blanco
              }}
            >
              <CardMedia
                component="img"
                height="100"
                image={`http://localhost:4000/${curso.imagen_portada}`}
                alt="Imagen de portada del curso"
                sx={{
                  border: "1px solid #000000", // Borde rojo
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
                      color: "#000000", // Título en gris
                      border: "1px solid #000000", // Borde gris
                      borderRadius: "6px",
                      padding: "10px 15px",
                      backgroundColor: "#ffffff", // Fondo gris
                      textAlign: "left",
                    }}
                  >
                    {curso.titulo}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: 2,
                      border: "1px solid #000000", // Borde gris
                      borderRadius: "6px",
                      maxHeight: "3em",
                      overflowY: "auto",
                      padding: "10px 15px",
                      textAlign: "justify",
                      color: "#000000", // Texto negro
                      backgroundColor: "#ffffff", // Fondo gris claro
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
                            backgroundColor: "#000000", // Color principal
                            color: "#ffffff",
                            borderRadius: "10px",
                            border: "1px solid #000000", // Borde gris
                            "&:hover": {
                              backgroundColor: "#C0C0C0", // Hover
                              color: "#9B111E",
                              border: "1px solid #000000", // Borde gris
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
        </Box>

        {/* Contenedor rojo al lado derecho */}
        <Box
          sx={{
            width: "50%", // Ocupa el 50% del ancho
            backgroundColor: "#9B111E", // Rojo
            // height: "900px", // Asegura que ocupe todo el alto del contenedor
            padding: "20px", // Espaciado interno
          }}
        >
          <h2 style={{ color: "#FFFFFF" }}>Sección Roja</h2>
          <p style={{ color: "#FFFFFF" }}>
            Este es un espacio rojo para seccionar el contenido del lado
            izquierdo.
          </p>
        </Box>
      </Box>

      {/* Paginación dentro del contenedor de las cards */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px", // Espacio entre cards y paginación
          // border: "1px solid #C0C0C0",
          width: "49%",
        }}
      >
        <Pagination
          count={totalPaginas}
          page={paginaActual}
          onChange={handlePaginaChange}
          color="standard"
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#9B111E !important",
              color: "#ffffff !important",
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "#C0C0C0",
              color: "#000000",
            },
          }}
        />
      </Box>
    </div>
  );
};

export default MisCursosCard;
