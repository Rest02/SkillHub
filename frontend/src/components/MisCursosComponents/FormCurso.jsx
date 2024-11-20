import React, { useState, useContext } from "react";
import { MisCursosContext } from "../../context/MisCursosContext.jsx"; // Importa el contexto
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function FormCurso() {
  const { createCourse } = useContext(MisCursosContext); // Accede a la función createCourse desde el contexto
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [precio, setPrecio] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      titulo,
      descripcion,
      categoria_id: categoriaId,
      precio,
      modalidad,
    };

    // Llamar a la función del contexto para crear el curso
    createCourse(courseData, thumbnail);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'row', // Alinea el formulario y la imagen horizontalmente
          gap: 3,
          backgroundColor: '#C0C0C0',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Formulario */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" align="center" sx={{ marginBottom: 3, color: '#000000' }}>
            Crear un nuevo curso
          </Typography>

          <TextField
            label="Título del curso"
            variant="outlined"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            fullWidth
            required
            sx={{
              marginBottom: '20px', // Agrega espacio entre los inputs
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#000000',  // Gris claro para el borde
                },
              },
              '& .MuiInputLabel-root': {
                color: '#000000', // Texto de etiqueta en negro
              },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9B111E',  // Rojo oscuro en hover
              },
            }}
          />

          <TextField
            label="Descripción"
            variant="outlined"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            fullWidth
            multiline
            rows={4}
            required
            sx={{
              marginBottom: '20px', // Agrega espacio entre los inputs
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#000000',  // Gris claro para el borde
                },
              },
              '& .MuiInputLabel-root': {
                color: '#000000', // Texto de etiqueta en negro
              },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9B111E',  // Rojo oscuro en hover
              },
            }}
          />

          <TextField
            label="ID de la categoría"
            variant="outlined"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            fullWidth
            required
            sx={{
              marginBottom: '20px', // Agrega espacio entre los inputs
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#000000',  // Gris claro para el borde
                },
              },
              '& .MuiInputLabel-root': {
                color: '#000000', // Texto de etiqueta en negro
              },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9B111E',  // Rojo oscuro en hover
              },
            }}
          />

          <TextField
            label="Precio"
            variant="outlined"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            fullWidth
            required
            sx={{
              marginBottom: '20px', // Agrega espacio entre los inputs
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#000000',  // Gris claro para el borde
                },
              },
              '& .MuiInputLabel-root': {
                color: '#000000', // Texto de etiqueta en negro
              },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9B111E',  // Rojo oscuro en hover
              },
            }}
          />

          <TextField
            label="Modalidad"
            variant="outlined"
            value={modalidad}
            onChange={(e) => setModalidad(e.target.value)}
            fullWidth
            required
            sx={{
              marginBottom: '20px', // Agrega espacio entre los inputs
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#000000',  // Gris claro para el borde
                },
              },
              '& .MuiInputLabel-root': {
                color: '#000000', // Texto de etiqueta en negro
              },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9B111E',  // Rojo oscuro en hover
              },
            }}
          />

          {/* Botones al lado */}
          <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
            <Button
              variant="outlined"
              component="label"
              sx={{
                width: "50%",
                padding: 1.5,
                borderColor: '#C0C0C0',
                color: '#FFFFFF',
                backgroundColor: "black",
                '&:hover': {
                  color: '#FFFFFF',
                  backgroundColor: '#292929',
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
                backgroundColor: '#9B111E',
                '&:hover': {
                  backgroundColor: '#CA1628',
                },
              }}
            >
              Crear Curso
            </Button>
          </Box>
        </Box>

        {/* Vista previa de la imagen seleccionada */}
        {thumbnail && (
          <Box
            sx={{
              width: '250px',
              height: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
              backgroundColor: 'white',
            }}
          >
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="Vista previa"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default FormCurso;
