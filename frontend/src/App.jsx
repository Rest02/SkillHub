import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthPageRegister from "../src/pages/AuthPages/AuthPageRegister.jsx";
import AuthPageLogin from "../src/pages/AuthPages/AuthPageLogin.jsx";
import NotFound from "../src/pages/AuthPages/NotFound.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import AuthPageForgetPassword from "../src/pages/AuthPages/AuthPageForgetPassword.jsx";
import AuthPageVerifyCode from "../src/pages/AuthPages/AuthPageVerifyCode.jsx";
import AuthPageNewPassword from "../src/pages/AuthPages/AuthPageNewPassword.jsx";
import PerfilPage from "../src/pages/PerfilPages/PerfilPage.jsx";
import NavBar from "../src/components/NavBarComponent/NavBar.jsx";
import HomePage from "../src/pages/HomePage/HomePage.jsx";
import MisCursosPage from "../src/pages/MisCursosPage/MisCursosPage.jsx";
import { MisCursosProvider } from "./context/MisCursosContext"; // Asegúrate de importar el provider

function App() {
  return (
    <AuthContextProvider>
      <MisCursosProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<AuthPageRegister />} />
          <Route path="/login" element={<AuthPageLogin />} />
          <Route path="/forgetPassword" element={<AuthPageForgetPassword />} />
          <Route
            path="/verifyRecoveryCode/:token"
            element={<AuthPageVerifyCode />}
          />
          <Route
            path="/changePassword/:token"
            element={<AuthPageNewPassword />}
          />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/miscursos" element={<MisCursosPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MisCursosProvider>
    </AuthContextProvider>
  );
}

export default App;
