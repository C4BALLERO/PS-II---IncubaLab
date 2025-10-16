import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // No logueado → al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si requiere un rol específico y el usuario no lo cumple → al profile
  if (role && user.Id_Rol !== role) {
    return <Navigate to="/profile" replace />;
  }

  // Si pasa validaciones → renderiza el componente hijo
  return children;
};

export default PrivateRoute;
