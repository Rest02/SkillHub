import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png"; // Asegúrate de usar la ruta correcta

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const goToNosotros = () => navigate("/nosotros");
  const goToCursos = () => navigate("/cursos");
  const goToHome = () => navigate("/");
  const goToLogin = () => navigate("/login");
  const goToRegister = () => navigate("/register");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-transparent px-4 py-5 md:px-24 lg:px-8 font-sans">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo centrado */}
        <div className="relative flex-1 flex justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <img src={logo} alt="SkillHub Logo" className="h-16 w-auto" />
        </div>

        {/* Menú hamburguesa para pantallas pequeñas */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Opciones de navegación izquierda en pantallas grandes */}
        <div className="hidden lg:flex items-center space-x-6">
          <button
            onClick={goToNosotros}
            className="relative text-black font-bold text-sm lg:text-lg hover:text-blue-500 transition duration-300"
          >
            Nosotros
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 transition-all duration-300"></span>
          </button>
          <button
            onClick={goToCursos}
            className="relative text-black font-bold text-sm lg:text-lg hover:text-blue-500 transition duration-300"
          >
            Cursos
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 transition-all duration-300"></span>
          </button>
          <button
            onClick={goToHome}
            className="relative text-black font-bold text-sm lg:text-lg hover:text-blue-500 transition duration-300"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 transition-all duration-300"></span>
          </button>
        </div>

        {/* Botones de acciones derecha */}
        <div className="hidden lg:flex items-center space-x-6">
          <button
            onClick={goToLogin}
            className="text-black border border-black font-bold text-sm lg:text-lg px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={goToRegister}
            className="bg-blue-500 text-white font-bold text-sm lg:text-lg px-4 py-2 rounded-full hover:bg-black transition duration-300"
          >
            Registrarse
          </button>
        </div>

        {/* Menú desplegable para pantallas pequeñas */}
        <div className={`${isOpen ? "block" : "hidden"} lg:hidden`}>
          <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded-lg shadow-md">
            <button
              onClick={goToNosotros}
              className="relative text-black font-bold text-sm hover:text-blue-500 transition duration-300"
            >
              Nosotros
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 transition-all duration-300"></span>
            </button>
            <button
              onClick={goToCursos}
              className="relative text-black font-bold text-sm hover:text-blue-500 transition duration-300"
            >
              Cursos
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 transition-all duration-300"></span>
            </button>
            <button
              onClick={goToHome}
              className="relative text-black font-bold text-sm hover:text-blue-500 transition duration-300"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 transition-all duration-300"></span>
            </button>
            <button
              onClick={goToLogin}
              className="text-black border border-black font-bold text-sm px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition duration-300"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={goToRegister}
              className="bg-blue-500 text-white font-bold text-sm px-4 py-2 rounded-full hover:bg-black transition duration-300"
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
