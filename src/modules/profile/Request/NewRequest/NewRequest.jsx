import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewRequest.module.css";
import Typography from "../../../../components/Typography/Typography";
import Button from "../../../../components/Button/Button";
import { createRequest } from "../../../../api/api";

const NewRequest = () => {
  const [car, setCar] = useState("");
  const [date, setDate] = useState("");
  const [status] = useState("Новое"); // Новое, подтверждено, отклонено
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRequest = { car, date, status };

    try {
      await createRequest(newRequest); // Отправляем данные на сервер
      navigate("/profile/allRequest");
    } catch (error) {
      console.error("Error creating request:", error);
      // Обработка ошибок (например, вывод сообщения пользователю)
    }
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
        <Button type="submit" variant="outlined">
          Создать
        </Button>
      </form>
    </div>
  );
};

export default NewRequest;
