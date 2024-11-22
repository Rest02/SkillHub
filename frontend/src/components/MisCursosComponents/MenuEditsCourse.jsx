import React from 'react';
import { Button, Typography, Paper, Box } from '@mui/material';

function MenuEditsCourse() {
  return (
    <Box 
      sx={{ 
        maxWidth: 300, 
        margin: '0 auto', 
        padding: 2, 
        backgroundColor: 'white', 
        borderRadius: 2, 
        boxShadow: 3 
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Menú de opciones
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <Button 
          variant="contained" 
          color="primary"
          sx={{ padding: '10px 20px', textTransform: 'none' }}
        >
          Crear
        </Button>
        <Button 
          variant="contained" 
          color="warning" 
          sx={{ padding: '10px 20px', textTransform: 'none' }}
        >
          Editar
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          sx={{ padding: '10px 20px', textTransform: 'none' }}
        >
          Eliminar
        </Button>
      </Box>
    </Box>
  );
}

export default MenuEditsCourse;
