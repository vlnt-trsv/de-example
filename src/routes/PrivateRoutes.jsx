import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
 
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
