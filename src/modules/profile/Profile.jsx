import React, { useState } from "react";
import styles from "./Profile.module.css";
import Header from "../../components/Header/Header";
import Aside from "../../components/Aside/Aside";
import Main from "../../components/Main/Main";

const Profile = () => {
  const navigation = [
    { to: "user", text: "Персональные данные" },
    { to: "request", text: "Создать новую заявку" },
  ];

  const [user, setUser] = useState({
    name: "Валентин",
    surname: "Тарасов",
    patronymic: "Фёдорович",
    email: "valya-657@mail.ru",
    phone: "Телефон пользователя",
    address: "Адрес пользователя",
    description: "Описание пользователя",
    avatar:
      "https://i.pinimg.com/564x/ae/fb/5d/aefb5d00ecd73014232a49ed13d7c1f1.jpg",
  });

  return (
    <div className={`${styles.profile} container`}>
      <Header className={styles.header} />
      <Aside className={styles.aside} user={user} navigation={navigation} />
      <Main className={styles.main} />
    </div>
  );
};

export default Profile;
