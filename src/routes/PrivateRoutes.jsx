import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  // Проверка роли для маршрутов админа
  const adminRoutes = ["/admin"];
  const isAdminRoute = adminRoutes.includes(window.location.pathname);
  if (isAdminRoute && user.id_role !== 2) {
    alert("Вы не администратор!");
    return <Navigate to="/" />;
  }

  return <Outlet />;  
};

export default PrivateRoutes;
