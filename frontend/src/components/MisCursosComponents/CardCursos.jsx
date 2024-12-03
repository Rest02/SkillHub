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
import { useNavigate } from "react-router-dom"; 

const MisCursosCard = () => {
  const { cursos, setCursoSeleccionado, deleteCurso } = useContext(MisCursosContext);
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
    ) 
    .slice(indiceInicio, Math.min(indiceFin, cursos.length));

  // Cambiar de página
  const handlePaginaChange = (event, value) => {
    if (value >= 1 && value <= totalPaginas) {
      setPaginaActual(value);
    }
  };

  // Redirige a la ruta del curso
  const handleViewCourse = (cursoID) => {
    setCursoSeleccionado(cursos.find(curso => curso.id === cursoID)); 
    navigate(`/cursos/${cursoID}/unitsandvideos`);
  };
  
  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este curso?")) {
      const result = await deleteCurso(courseId);
      alert(result?.success ? "Curso eliminado con éxito" : result?.message || "Hubo un error");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "left", color: "#000" }}>Mis Cursos</h1>

      {/* Barra de búsqueda y botón */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: "20px" }}>
        <TextField
          label="Buscar Curso"
          variant="outlined"
          fullWidth
          sx={{ marginRight: "10px", width: "70%", borderRadius: "20px" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          onClick={() => navigate("/createCourse")}
          variant="contained"
          sx={{ backgroundColor: "#000", color: "#fff", width: "30%", borderRadius: "20px" }}
        >
          Crear Nuevo Curso
        </Button>
      </Box>

      {/* Tarjetas de Cursos */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
        <Box
          sx={{
            width: "50%",
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          {cursosActuales.map((curso) => (
            <Card
              key={curso.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                padding: "20px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "20px",
                border: "1px solid #000",
                backgroundColor: "#f5f5f5",
                justifyContent: "center",
              }}
            >
              <CardMedia
                component="img"
                height="100"
                image={`http://localhost:4000/${curso.imagen_portada}`}
                alt="Imagen de portada del curso"
                sx={{
                  border: "1px solid #000",
                  borderRadius: "50%",
                  marginRight: "15px",
                  width: "150px",
                  height: "150px",
                }}
              />
              <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "60%" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000", marginBottom: "10px" }}>
                  {curso.titulo}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: "10px",
                    maxHeight: "3em",
                    overflowY: "auto",
                    textAlign: "justify",
                    color: "#000",
                  }}
                >
                  {curso.descripcion}
                </Typography>

                <Grid container spacing={2} justifyContent="flex-end">
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleViewCourse(curso.id)}
                      sx={{
                        backgroundColor: "#000",
                        color: "#fff",
                        borderRadius: "10px",
                        "&:hover": { backgroundColor: "#C0C0C0", color: "#9B111E" },
                      }}
                    >
                      Ver Curso
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleDeleteCourse(curso.id)}
                      sx={{
                        backgroundColor: "#000",
                        color: "#fff",
                        borderRadius: "10px",
                        "&:hover": { backgroundColor: "#C0C0C0", color: "#9B111E" },
                      }}
                    >
                      Eliminar
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Paginación */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Pagination
          count={totalPaginas}
          page={paginaActual}
          onChange={handlePaginaChange}
          color="standard"
          sx={{
            "& .Mui-selected": { backgroundColor: "#9B111E !important", color: "#fff !important" },
            "& .MuiPaginationItem-root:hover": { backgroundColor: "#C0C0C0", color: "#000" },
          }}
        />
      </Box>
    </div>
  );
};

export default MisCursosCard;
