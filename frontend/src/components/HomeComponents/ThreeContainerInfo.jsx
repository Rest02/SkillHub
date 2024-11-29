import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

function ThreeContainerInfo() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
      {/* Primer contenedor */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          width: '30%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Avatar
            src="https://cdn-icons-png.flaticon.com/512/2293/2293883.png"
            alt="icon1"
            sx={{ width: 60, height: 60, marginRight: 1 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Aprende de Creadores
          </Typography>
        </Box>
        <Typography variant="body1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum odio expedita aliquam dolor voluptates eveniet consequuntur at ipsa. Sit ea temporibus dolorem hic reprehenderit ullam iusto quis incidunt adipisci harum!
        </Typography>
      </Box>

      {/* Segundo contenedor */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          width: '30%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Avatar
            src="  https://cdn-icons-png.flaticon.com/512/2377/2377746.png "
            alt="icon2"
            sx={{ width: 60, height: 60, marginRight: 1 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Videos Y comentarios
          </Typography>
        </Box>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, eveniet nesciunt!
          Nesciunt qui amet deserunt dolorum, odio ab nulla accusantium expedita, quisquam, neque
          unde delectus sequi veniam officia. Perspiciatis, autem.
        </Typography>
      </Box>

      {/* Tercer contenedor */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          width: '30%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Avatar
            src="https://cdn-icons-png.flaticon.com/512/5406/5406791.png"
            alt="icon3"
            sx={{ width: 60, height: 60, marginRight: 1 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Certificaciones 
          </Typography>
        </Box>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus natus, quasi laborum
          possimus enim laudantium porro iure, nobis perferendis maxime dolorum harum, architecto
          illum vel libero corrupti dolores reiciendis eaque?
        </Typography>
      </Box>
    </Box>
  );
}

export default ThreeContainerInfo;
