import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

function NotFound() {
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const handleHomeClick = () => {
    navigate('/'); // Redirige a la ruta HomePage
  };

  return (
    <div className="bg-gradient-to-r">
      <div className="w-9/12 m-auto py-40 flex items-center justify-center">
        <div className="shadow overflow-hidden sm:rounded-lg pb-8">
          <div className="text-center pt-8">
            <h1 className="text-9xl font-bold text-purple-400">404</h1>
            <h1 className="text-6xl font-medium py-8">¡Vaya! Página no encontrada</h1>
            <p className="text-2xl pb-8 px-12 font-medium">
              ¡Vaya! La página que buscas no existe. Es posible que haya sido movida o eliminada.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleHomeClick} // Añade el evento onClick para manejar la redirección
                className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6"
              >
                INICIO
              </button>
              <button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-semibold px-6 py-3 rounded-md">
                Contáctenos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
