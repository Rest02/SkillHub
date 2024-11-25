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
  const { cursos, setCursoSeleccionado } = useContext(MisCursosContext);
  const [paginaActual, setPaginaActual] = useState(1);
  const cursosPorPagina = 3;
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setPaginaActual(1); // Reinicia a la primera página si cambian los cursos
  }, [cursos]);

  // Calcular los cursos que se mostrarán en la página actual
  const totalPaginas = Math.ceil(cursos.length / cursosPorPagina);
  const indiceInicio = (paginaActual - 1) * cursosPorPagina;
  const indiceFin = indiceInicio + cursosPorPagina;

  // Filtrar y mostrar los cursos
  const cursosActuales = cursos
    .filter((curso) =>
      curso.titulo && curso.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    ) // Filtrar por búsqueda, solo si curso.titulo está definido
    .slice(indiceInicio, Math.min(indiceFin, cursos.length));

  // Cambiar de página
  const handlePaginaChange = (event, value) => {
    if (value >= 1 && value <= totalPaginas) {
      setPaginaActual(value);
    }
  };

  // Redirige a la ruta del curso
  const handleViewCourse = (cursoID) => {
    console.log("ID del curso al hacer clic:", cursoID);  // Verifica que el ID es el esperado
    setCursoSeleccionado(cursos.find(curso => curso.id === cursoID)); // Cambiar el curso seleccionado
    navigate(`/cursos/${cursoID}/unitsandvideos`); // Navegar a la página del curso
  };
  
  

  return (
    <div>
      <h1 style={{ textAlign: "left", color: "#000000" }}>Mis Cursos</h1>
      {/* Barra de búsqueda y botón */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "49%",
          marginBottom: "20px",
        }}
      >
        <TextField
          label="Buscar Curso"
          variant="outlined"
          fullWidth
          sx={{
            marginRight: "10px",
            width: "70%",
            borderRadius: "20px",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          onClick={() => navigate("/createCourse")}
          variant="contained"
          sx={{
            backgroundColor: "#000000",
            color: "#ffffff",
            width: "30%",
            borderRadius: "20px",
          }}
        >
          Crear Nuevo Curso
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          {cursosActuales.map((curso, index) => (
            <Card
              key={curso.id || `${curso.titulo}-${index}`}
              sx={{
                padding: "20px",
                justifyContent: "center",
                height: "250px",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "row",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                border: "1px solid #000000",
                backgroundColor: "#C0C0C0",
              }}
            >
              <CardMedia
                component="img"
                height="100"
                image={`http://localhost:4000/${curso.imagen_portada}`}
                alt="Imagen de portada del curso"
                sx={{
                  border: "1px solid #000000",
                  borderRadius: "50%",
                  marginRight: "15px",
                  width: "250px",
                  height: "250px",
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
                      color: "#000000",
                      borderRadius: "6px",
                      padding: "10px 15px",
                      backgroundColor: "#ffffff",
                      textAlign: "left",
                    }}
                  >
                    {curso.titulo}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: 2,
                      maxHeight: "3em",
                      overflowY: "auto",
                      padding: "10px 15px",
                      textAlign: "justify",
                      color: "#000000",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    {curso.descripcion}
                  </Typography>
                </div>
                <div style={{ marginTop: "15px", width: "100%" }}>
                  <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleViewCourse(curso.id)}
                        sx={{
                          backgroundColor: "#000000",
                          color: "#ffffff",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "#C0C0C0",
                            color: "#9B111E",
                          },
                        }}
                      >
                        Ver Curso
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          backgroundColor: "#000000",
                          color: "#ffffff",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "#C0C0C0",
                            color: "#9B111E",
                          },
                        }}
                      >
                        Eliminar
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
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
