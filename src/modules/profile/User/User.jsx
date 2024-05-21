import React from "react";
import Typography from "../../../components/Typography/Typography";

const User = () => {
  const data = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <>
      <Typography tag="h3">Персональные данные</Typography>
      <Typography>Id - {data?.id}</Typography>
      <Typography>Id Role - {data?.id_role}</Typography>
      <Typography>Login - {data?.login}</Typography>
      <Typography>Password - {data?.password}</Typography>
      <Typography>Full Name - {data?.full_name}</Typography>
      <Typography>Phone - {data?.phone}</Typography>
      <Typography>Email - {data?.email}</Typography>
    </>
  );
};

export default User;
