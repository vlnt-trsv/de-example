import React from "react";
import styles from "./Main.module.css";
import { Outlet, useLocation } from "react-router-dom";

const Main = ({ className }) => {
  const location = useLocation();
  return (
    <div className={`${styles.main} ${className}`}>
      {location.pathname === "/profile" ? "Добро пожаловать!" : <Outlet />}
    </div>
  );
};

export default Main;
