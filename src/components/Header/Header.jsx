import React from "react";
import styles from "./Header.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Header = ({ logo, className }) => {
  const user = localStorage.getItem("user");
  return (
    <header className={`${styles.header} ${className} container`}>
      <div className={styles.logo}>{logo || "LOGOTYPE"}</div>
      <div className={styles.action}>
        <Link to="/admin">
          <Button variant="text">Админ</Button>
        </Link>
        {!user ? (
          <Link to="/auth">
            <Button variant="text">Войти</Button>
          </Link>
        ) : (
          <Link to="/profile">
            <Button variant="text">Личный кабинет</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
