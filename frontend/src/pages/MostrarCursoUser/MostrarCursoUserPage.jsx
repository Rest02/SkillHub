import React from 'react';
import DescripcionCurso from '../../components/MostrarCursoUserComponents/DescripcionCurso.jsx';
import CommentsValorations from '../../components/MostrarCursoUserComponents/CommentsValorations.jsx';
import ProductActionCard from '../../components/MostrarCursoUserComponents/ProductActionCard.jsx';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

function MostrarCursoUserPage() {
  const { courseId } = useParams();

  const handleBuyNow = () => {
    console.log('Compra realizada');
    // Lógica para manejar la compra
  };

  const handleAddToCart = () => {
    console.log('Añadido al carrito');
    // Lógica para añadir al carrito
  };

  return (
    <div>
      {/* Contenedor principal con el mismo ancho que el navbar */}
      <Box
        sx={{
          width: '80%', // Igual al navbar
          margin: '0 auto', // Centrado
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Lado izquierdo con DescripcionCurso */}
          <Box
            sx={{
              width: '100%', // Ocupa el 100% del ancho
              padding: 2,
            }}
          >
            <DescripcionCurso />
          </Box>

          {/* CommentsValorations debajo de DescripcionCurso */}
          <Box
            sx={{
              padding: '20px',
              marginTop: '20px', // Espacio entre DescripcionCurso y CommentsValorations
            }}
          >
            <CommentsValorations />
          </Box>
        </div>
      </Box>
    </div>
  );
}

export default MostrarCursoUserPage;
