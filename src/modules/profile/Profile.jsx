import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Profile.module.css";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import Avatar from "../../components/Avatar/Avatar";

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
    <div className={styles.profile}>
      <header className={styles.header}>
        <Link to={"/"}>
          <button>Вернутся</button>
        </Link>
      </header>
      <div className={styles.content}>
        <aside className={styles.aside} key={navigation?.to}>
          <Avatar img={user?.avatar} alt={user?.name} />
          <Typography tag="h3">
            {user?.name} {user?.surname}
          </Typography>
          {navigation?.map((nav) => {
            return (
              <Link
                to={nav.to}
                style={{ width: "100%", textDecoration: "none" }}
              >
                <Button variant="outlined">{nav.text}</Button>
              </Link>
            );
          })}
        </aside>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Profile;
