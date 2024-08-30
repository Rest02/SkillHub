import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthPageRegister from "./pages/AuthPageRegister.jsx";
import AuthPageLogin from './pages/AuthPageLogin.jsx'
import NotFound from "./pages/NotFound.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";


function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/register" element={<AuthPageRegister />} />
        <Route path="/login" element={<AuthPageLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
