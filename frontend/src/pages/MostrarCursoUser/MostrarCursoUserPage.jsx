import React from 'react';
import DescripcionCurso from '../../components/MostrarCursoUserComponents/DescripcionCurso.jsx';
import CommentsValorations from '../../components/MostrarCursoUserComponents/CommentsValorations.jsx';
import ProductActionCard from '../../components/MostrarCursoUserComponents/ProductActionCard.jsx';
import { Box } from '@mui/material';
import {useParams} from 'react-router-dom'

function MostrarCursoUserPage() {
  const {courseId} = useParams()
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
        <div style={{ display: 'flex', height: '70vh' }}>
          {/* Lado izquierdo con DescripcionCurso */}
          <Box
            sx={{
              width: '100%', // Ocupa la mitad del ancho
              height: '100%', // Asegura que ocupe todo el alto de la página
              padding: 2,
              overflowY: 'auto', // Añade scroll si el contenido es largo
              border : "1px solid black"
            }}
          >
            <DescripcionCurso />
          </Box>

          
        </div>

        {/* CommentsValorations a lo largo */}
        <Box
          sx={{
            height: '30vh',
            overflowY: 'auto',
            padding: '20px',
            border : "1px solid black"

          }}
        >
          <CommentsValorations />
        </Box>
      </Box>
    </div>
  );
}

export default MostrarCursoUserPage;
