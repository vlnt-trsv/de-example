import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewRequest.module.css";
import Typography from "../../../../components/Typography/Typography";
import Button from "../../../../components/Button/Button";

const NewRequest = () => {
  const [title, setTitle] = useState("");
  const [car, setCar] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = { id: Date.now(), title, car, date };
    const storedCards = JSON.parse(localStorage.getItem("cards")) || [];
    localStorage.setItem("cards", JSON.stringify([...storedCards, newCard]));
    navigate("/profile/allRequest");
  };

  return (
    <div className={styles.newRequest}>
      <Typography tag="h3">Новая заявка</Typography>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Автомобиль:
          <select value={car} onChange={(e) => setCar(e.target.value)} required>
            <option value="">Выберите автомобиль</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Audi">Audi</option>
          </select>
        </label>
        <label>
          Дата бронирования:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <div className={styles.button}>
          <Button type="submit" variant="outlined">
            Создать
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewRequest;
