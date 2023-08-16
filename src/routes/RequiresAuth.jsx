import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequiresAuth = ({ children }) => {
  const location = useLocation();
  const { token } = useContext(AuthContext);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiresAuth;
