import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ element, allowedRoles }) => {
  const { userRole, token } = useAuth();

  // console.log("Token:", token);
  // console.log("User Role:", userRole);

  // Si no hay token o el rol del usuario no está permitido, redirige al login
  if (token === null || userRole === null) {
    // Mientras no se tenga el token o el rol, no redirigimos, solo retornamos null
    return null;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  // Si todo está correcto, muestra el elemento
  return element;
};

export default PrivateRoute;
