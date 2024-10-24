// PerfilPage.jsx
import React from 'react';
import { PerfilProvider } from '../../context/PerfilContext.jsx';
import Perfil from '../../components/PerfilComponents/Perfil.jsx';

const PerfilPage = () => {
  return (
    <PerfilProvider>
      <Perfil />
    </PerfilProvider>
  );
};

export default PerfilPage;
