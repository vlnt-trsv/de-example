import React from "react";
import Typography from "../../../components/Typography/Typography";

const User = () => {
  const data = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <>
      <Typography tag="h3">Персональные данные</Typography>
      <Typography>{data?.role}</Typography>
      <Typography>{data?.name}</Typography>
      <Typography>{data?.surname}</Typography>
      <Typography>{data?.patronymic}</Typography>
      <Typography>{data?.email}</Typography>
      <Typography>{data?.phone}</Typography>
    </>
  );
};

export default User;
