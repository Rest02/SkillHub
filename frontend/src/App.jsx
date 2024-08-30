import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
