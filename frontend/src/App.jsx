import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthPageRegister from "../src/pages/AuthPages/AuthPageRegister.jsx";
import AuthPageLogin from "../src/pages/AuthPages/AuthPageLogin.jsx";
import NotFound from "../src/pages/AuthPages/NotFound.jsx";
import { AuthContextProvider, useAuth } from "./context/AuthContext.jsx";
import AuthPageForgetPassword from "../src/pages/AuthPages/AuthPageForgetPassword.jsx";
import AuthPageVerifyCode from "../src/pages/AuthPages/AuthPageVerifyCode.jsx";
import AuthPageNewPassword from "../src/pages/AuthPages/AuthPageNewPassword.jsx";
import PerfilPage from "../src/pages/PerfilPages/PerfilPage.jsx";
import HomePage from "../src/pages/HomePage/HomePage.jsx";
import MisCursosPage from "../src/pages/MisCursosPage/MisCursosPage.jsx";
import { MisCursosProvider } from "./context/MisCursosContext";
import PrivateRoute from "../src/components/PrivateRoute.jsx";
import NavBarInstructor from "../src/components/NavBarComponent/NavBarInstructor.jsx";
import NavBarEstudiante from "../src/components/NavBarComponent/NavBarEstudiante.jsx";
import NavBar from "./components/NavBarComponent/NavBar.jsx";
import FormCurso from "../src/components/MisCursosComponents/FormCurso.jsx";
import VerEditarCursoPage from "../src/pages/MisCursosPage/VerEditarCursoPage.jsx";
import CreateUnidadForm from "../src/components/MisCursosComponents/CreateUnidadForm.jsx";
import CreateClaseVideo from "../src/components/MisCursosComponents/CreateClaseVideo.jsx";
import { SnackbarProvider } from "notistack";
import UpdateUnits from "../src/components/MisCursosComponents/UpdateUnits.jsx";
import UpdateClase from "../src/components/MisCursosComponents/UpdateClase.jsx";
import DeleteUnidad from "../src/components/MisCursosComponents/DeleteUnidad.jsx";
import DeleteClase from "../src/components/MisCursosComponents/DeleteClase.jsx";
import CursosPage from '../src/pages/CursosPage/CursosPage.jsx'
import { ShowCourseProvider } from '../src/context/ShowCourseContext.jsx'; // Importa el proveedor
import MostrarCursoUserPage from '../src/pages/MostrarCursoUser/MostrarCursoUserPage.jsx'

const AppContent = () => {
  const { userRole } = useAuth(); // Ahora está dentro del contexto

  const renderNavBar = () => {
    if (userRole === "instructor") {
      return <NavBarInstructor />;
    } else if (userRole === "estudiante") {
      return <NavBarEstudiante />;
    } else if (userRole == null) {
      return <NavBar />;
    }
    return null;
  };

  return (
    <>
      {renderNavBar()}
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
        <Route path="/createCourse" element={<FormCurso />} />

        <Route
          path="/miscursos"
          element={
            <PrivateRoute
              element={<MisCursosPage />}
              allowedRoles={["instructor"]}
            />
          }
        />
        <Route
          path="/cursos/:courseId/unitsandvideos"
          element={<VerEditarCursoPage />}
        />
        <Route path="/courses/:courseId/units" element={<CreateUnidadForm />} />
        <Route path="/units/:courseId/videos" element={<CreateClaseVideo />} />

        <Route path="/units/:courseId/update" element={<UpdateUnits />} />

        <Route path="/clase/:courseId/update" element={<UpdateClase />} />

        <Route path="/unidad/:courseId/delete" element={<DeleteUnidad />} />
        <Route path="/clase/:courseId/delete" element={<DeleteClase />} />


        <Route path="/cursos" element={<CursosPage />} />

        <Route path="/showcourseuser/:courseId/details" element={<MostrarCursoUserPage />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthContextProvider>
        <MisCursosProvider>
          <ShowCourseProvider>  {/* Usa el proveedor aquí */}
            <AppContent /> {/* Mueve el contenido principal aquí */}
          </ShowCourseProvider>
        </MisCursosProvider>
      </AuthContextProvider>
    </SnackbarProvider>
  );
}

export default App;
