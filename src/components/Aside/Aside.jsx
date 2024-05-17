import React from "react";
import styles from "./Aside.module.css";
import Avatar from "../Avatar/Avatar";
import Typography from "../Typography/Typography";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const Aside = ({ navigation, user, className }) => {
  return (
    <aside className={`${styles.aside} ${className}`} key={navigation?.to}>
      <Avatar img={user?.avatar} alt={user?.name} />
      <Typography tag="h3">
        {user?.name} {user?.surname}
      </Typography>
      {navigation?.map((nav) => {
        return (
          <Link to={nav.to} style={{ width: "100%" }}>
            <Button variant="outlined">{nav.text}</Button>
          </Link>
        );
      })}
    </aside>
  );
};

export default Aside;
