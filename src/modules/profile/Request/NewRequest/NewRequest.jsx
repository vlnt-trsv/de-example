import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewRequest.module.css";
import Typography from "../../../../components/Typography/Typography";
import Button from "../../../../components/Button/Button";
import { createRequest, getCars } from "../../../../api/api";

const NewRequest = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRequest = {
      id_user: user.id,
      id_car: selectedCar,
      booking_date: date,
    };

    try {
      navigate("/profile/allRequest");
      await createRequest(newRequest); // Отправляем данные на сервер
    } catch (error) {
      console.error("Error creating request:", error);
      // Обработка ошибок (например, вывод сообщения пользователю)
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      const data = await getCars();
      setCars(data);
    };

    fetchCars();
  }, []);

  return (
    <div className={styles.newRequest}>
      <Typography tag="h3">Новая заявка</Typography>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Автомобиль:
          <select
            value={selectedCar}
            onChange={(e) => setSelectedCar(e.target.value)}
            required
          >
            <option value="">Выберите автомобиль</option>
            {cars.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
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
