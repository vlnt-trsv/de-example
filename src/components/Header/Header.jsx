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

  const { handleLogout, isAuthenticated } = useAuth();

  return (
    <header className={`${styles.header} ${className} container`}>
      <div className={styles.logo}>
        <Link to={"/"}>{logo || "LOGOTYPE"}</Link>
      </div>
      <div className={styles.action}>
        {isProfilePath && isAuthenticated && user && user?.id_role === 2 && (
          <Link to="/admin">
            <Button variant="text">Админ</Button>
          </Link>
        )}
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
          <div onClick={handleLogout}>
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
