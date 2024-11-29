import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import BackImage from '../../assets/img/BackImage.png'; // Asegúrate de que la ruta sea correcta

function ImageBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Apilar elementos verticalmente
        justifyContent: 'center', // Centrar verticalmente
        alignItems: 'center', // Centrar horizontalmente
        height: '100vh', // Ocupa toda la altura de la ventana
        padding: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'transparent',
          borderRadius: 2,
          padding: 3,
          width: '70%',
          textAlign: 'center',
          marginBottom: 2,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 1, fontFamily: 'Lato', fontWeight: 600 }}>
          Create and sell
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2, fontFamily: 'Lato', fontWeight: 400 }}>
          your own beautiful online courses
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            placeholder="Search for courses..."
            fullWidth
            sx={{
              marginRight: 1,
              borderRadius: '20px',
              backgroundColor: 'white',
              height: '60px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Sombra añadida
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none', // Eliminar el borde predeterminado
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              height: '60px',
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '20px',
              flexGrow: 1,
              '&:hover': {
                backgroundColor: '#333',
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
          width: '50%',
          height: 'auto',
          borderRadius: 2,
          flexGrow: 1,
          alignSelf: 'center',
        }}
      />
    </Box>
  );
}

export default ImageBar;
