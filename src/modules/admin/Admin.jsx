import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";
import Button from "../../components/Button/Button";

const Admin = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("cards")) || [];
    setCards(storedCards);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, status: newStatus } : card
    );
    setCards(updatedCards);

    // Обновляем данные в localStorage
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  return (
    <div className={styles.admin}>
      <Link to={"/profile/allRequest"}>
        <button>Вернуться</button>
      </Link>
      <h2>Администраторская панель</h2>
      <div className={styles.cards}>
        {cards.map((card) => (
          <div key={card.id} className={styles.card}>
            <h3>{card.car} - {card.date}</h3>
            <p>Статус: {card.status}</p>
            <div className={styles.buttons}>
              <Button
                variant="outlined"
                onClick={() => handleStatusChange(card.id, "Подтверждено")}
              >
                Подтверждено
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleStatusChange(card.id, "Отклонено")}
              >
                Отклонено
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
