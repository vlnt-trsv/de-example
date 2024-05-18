import React from "react";
import styles from "./Header.module.css";
import Button from "../Button/Button";
import { Link, useLocation } from "react-router-dom";
import { ExitIcon } from "../../assets/icons/icons";
import { useAuth } from "../../hooks/useAuth";

const Header = ({ logo, className }) => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isProfilePath = location.pathname.startsWith("/profile");

  const { logout, isAuthenticated } = useAuth();

  return (
    <header className={`${styles.header} ${className} container`}>
      <div className={styles.logo}>
        <Link to={"/"}>{logo || "LOGOTYPE"}</Link>
      </div>
      <div className={styles.action}>
        {isProfilePath && isAuthenticated && user && user?.role === "admin" && (
          <Link to="/admin">
            <Button variant="text">Админ</Button>
          </Link>
        )}
        {location.pathname === "/profile"}
        {!isAuthenticated ? (
          <Link to="/auth">
            <Button variant="text">Войти</Button>
          </Link>
        ) : (
          !isProfilePath && (
            <Link to="/profile">
              <Button variant="text">Личный кабинет</Button>
            </Link>
          )
        )}
        {isAuthenticated && (
          <div onClick={logout}>
            <Button variant="text">
              <ExitIcon size={24} />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
