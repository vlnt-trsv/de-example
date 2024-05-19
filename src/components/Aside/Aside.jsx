import React from "react";
import styles from "./Aside.module.css";
import Avatar from "../Avatar/Avatar";
import Typography from "../Typography/Typography";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";

const Aside = ({ className }) => {
  const navigation = [
    { to: "user", text: "Персональные данные" },
    { to: "allRequest", text: "Все заявки" },
  ];

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const avatar =
    "https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <aside className={`${styles.aside} ${className}`}>
      <Avatar img={user?.avatar || avatar} alt={user?.full_name} />
      <Typography tag="h3">{user?.full_name}</Typography>
      {navigation?.map((nav) => {
        return (
          <NavLink key={nav.to} to={nav.to} style={{ width: "100%" }}>
            <Button variant="outlined">{nav.text}</Button>
          </NavLink>
        );
      })}
    </aside>
  );
};

export default Aside;
