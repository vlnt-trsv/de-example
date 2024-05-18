import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";
import Login from "./login/Login";
import Registration from "./registration/Registration";
import Typography from "../../components/Typography/Typography";

const Auth = () => {
  const [authState, setAuthState] = useState("login");

  return (
    <div className={styles.auth}>
      {authState === "login" ? (
        <>
          <Login styles={styles} />
          <Typography>
            Нет аккаунта?{" "}
            <Link onClick={() => setAuthState("registration")}>
              Зарегистрироваться
            </Link>
          </Typography>
        </>
      ) : (
        <>
          <Registration styles={styles} />
          <Typography>
            Есть аккаунт?{" "}
            <Link onClick={() => setAuthState("login")}>Войти</Link>
          </Typography>
        </>
      )}
    </div>
  );
};

export default Auth;
