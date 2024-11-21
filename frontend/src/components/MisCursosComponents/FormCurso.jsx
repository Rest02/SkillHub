import React, { useState, useContext } from "react";
import { MisCursosContext } from "../../context/MisCursosContext.jsx"; 
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Formik, Form } from "formik";  // Importamos Formik
import * as Yup from "yup";  // Importamos Yup
import { useNavigate } from "react-router-dom";  // Importamos useNavigate para la redirección

// Definir las validaciones con Yup
const validationSchema = Yup.object({
  titulo: Yup.string()
    .required("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres"),
  descripcion: Yup.string()
    .required("La descripción es obligatoria")
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  categoriaId: Yup.string().required("Selecciona una categoría"),
  precio: Yup.number()
    .required("El precio es obligatorio")
    .positive("El precio debe ser un número positivo")
    .integer("El precio debe ser un número entero"),
  modalidad: Yup.string().required("La modalidad es obligatoria"),
});

function FormCurso() {
  const { createCourse, categorias } = useContext(MisCursosContext);  
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();  // Usamos useNavigate para la redirección

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = (values) => {
    const courseData = {
      titulo: values.titulo,
      descripcion: values.descripcion,
      categoria_id: values.categoriaId,
      precio: values.precio,
      modalidad: values.modalidad,
    };

    createCourse(courseData, thumbnail);  
    navigate("/miscursos");  // Redirige a la sección de "Mis Cursos" después de crear el curso
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
      <Formik
        initialValues={{
          titulo: "",
          descripcion: "",
          categoriaId: "",
          precio: "",
          modalidad: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                backgroundColor: "#C0C0C0",
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ marginBottom: 3, color: "#000000" }}
                >
                  Crear un nuevo curso
                </Typography>

                <TextField
                  label="Título del curso"
                  variant="outlined"
                  name="titulo"
                  value={values.titulo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  required
                  sx={{ marginBottom: "20px" }}
                  error={touched.titulo && !!errors.titulo}
                  helperText={touched.titulo && errors.titulo}
                />

                <TextField
                  label="Descripción"
                  variant="outlined"
                  name="descripcion"
                  value={values.descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  multiline
                  rows={4}
                  required
                  sx={{ marginBottom: "20px" }}
                  error={touched.descripcion && !!errors.descripcion}
                  helperText={touched.descripcion && errors.descripcion}
                />

                <FormControl fullWidth required sx={{ marginBottom: "20px" }}>
                  <InputLabel id="categoria-select-label">Categoría</InputLabel>
                  <Select
                    labelId="categoria-select-label"
                    id="categoria-select"
                    name="categoriaId"
                    value={values.categoriaId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.categoriaId && !!errors.categoriaId}
                  >
                    {categorias.map((categoria) => (
                      <MenuItem key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.categoriaId && errors.categoriaId && (
                    <Typography color="error">{errors.categoriaId}</Typography>
                  )}
                </FormControl>

                <TextField
                  label="Precio"
                  variant="outlined"
                  name="precio"
                  value={values.precio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  required
                  sx={{ marginBottom: "20px" }}
                  error={touched.precio && !!errors.precio}
                  helperText={touched.precio && errors.precio}
                />

                <FormControl fullWidth required sx={{ marginBottom: "20px" }}>
                  <InputLabel id="modalidad-select-label">Modalidad</InputLabel>
                  <Select
                    labelId="modalidad-select-label"
                    id="modalidad-select"
                    name="modalidad"
                    value={values.modalidad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.modalidad && !!errors.modalidad}
                  >
                    <MenuItem value="continuo">Continuo</MenuItem>
                    <MenuItem value="completo">Completo</MenuItem>
                  </Select>
                  {touched.modalidad && errors.modalidad && (
                    <Typography color="error">{errors.modalidad}</Typography>
                  )}
                </FormControl>

                <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      width: "50%",
                      padding: 1.5,
                      borderColor: "#C0C0C0",
                      color: "#FFFFFF",
                      backgroundColor: "black",
                      "&:hover": {
                        color: "#FFFFFF",
                        backgroundColor: "#292929",
                      },
                    }}
                  >
                    Subir Imagen de Portada
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleThumbnailChange}
                    />
                  </Button>

                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      width: "50%",
                      padding: 1.5,
                      backgroundColor: "#9B111E",
                      "&:hover": {
                        backgroundColor: "#CA1628",
                      },
                    }}
                  >
                    Crear Curso
                  </Button>
                </Box>
              </Box>

              {thumbnail && (
                <Box
                  sx={{
                    width: "500px",
                    height: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 3,
                    backgroundColor: "black",
                  }}
                >
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt="Vista previa"
                    style={{
                      width: "500px",
                      height: "572px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default FormCurso;
