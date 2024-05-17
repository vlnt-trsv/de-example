import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <>
      <Link to={"auth"}>
        <button>Auth</button>
      </Link>

      <Link to={"admin"}>
        <button>Admin</button>
      </Link>

      <Link to={"profile"}>
        <button>Profile</button>
      </Link>
    </>
  );
};

export default Main;
