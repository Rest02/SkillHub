import React from "react";
import { Button } from "@mui/material";
import Welcome from "../../assets/img/Welcome.png"; // Asegúrate de que la ruta sea correcta

function WelcomeInformation() {
  return (
    <div className="container mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
      {/* Contenedor de la imagen y texto */}
      <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8">
        {/* Imagen */}
        <div className="flex-shrink-0 lg:w-1/2">
          <img
            src={Welcome} // Cambia la URL por la imagen que desees usar
            alt="Welcome"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Texto y botón */}
        <div className="lg:w-1/2">
          <h5 className="text-xl font-bold mb-2 text-blue-600">Bienvenido a nuestra plataforma</h5>
          <h4 className="text-2xl font-bold mb-2 text-black">SkillHub</h4>
          <p className="text-base mb-6 text-gray-700">
            Aquí encontrarás toda la información necesaria para comenzar. Estamos encantados de tenerte aquí y esperamos que disfrutes de la experiencia. En SkillHub, te ofrecemos los mejores recursos para aprender de los expertos y mejorar tus habilidades en diversas áreas, desde programación hasta marketing digital.
          </p>
          <Button
            variant="contained"
            className="bg-red-600 text-white rounded-full px-6 py-2 hover:bg-red-800 transition duration-300"
          >
            Más información
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeInformation;
