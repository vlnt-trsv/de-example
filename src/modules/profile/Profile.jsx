import React, { useState } from "react";
import styles from "./Profile.module.css";
import Header from "../../components/Header/Header";
import Aside from "../../components/Aside/Aside";
import Main from "../../components/Main/Main";

const Profile = () => {
  const [user, setUser] = useState({
    role: "admin",
    name: "Валентин",
    surname: "Тарасов",
    patronymic: "Фёдорович",
    email: "valya-657@mail.ru",
    phone: "+79244661843",
    avatar:
      "https://i.pinimg.com/564x/ae/fb/5d/aefb5d00ecd73014232a49ed13d7c1f1.jpg",
  });
  localStorage.setItem("user", JSON.stringify(user));

  return (
    <div className={`${styles.profile} container`}>
      <Header className={styles.header} user={user} />
      <Aside className={styles.aside} user={user} />
      <Main className={styles.main} />
    </div>
  );
};

export default Profile;
