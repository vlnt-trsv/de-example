import React from "react";
import { Link, useLocation } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <Link to={"/profile"}>
        <button>Вернутся</button>
      </Link>
    </>
  );
};

export default Admin;
