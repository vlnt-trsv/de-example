import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";
import Button from "../../components/Button/Button";
import { getOrders, updateOrder } from "../../api/api";
import useFilter from "../../hooks/useFilter";

const Admin = () => {
  const [order, setOrder] = useState([]);
  const { filteredData, filters, updateFilters, clearFilters } =
    useFilter(order);
  console.log(filteredData);
  console.log(filters);

  const textStatus = (id) => {
    switch (id) {
      case 1:
        return "Новое";
      case 3:
        return "Отменено";
      case 4:
        return "Подтверждено";
      default:
        return "Статус неизвестен";
    }
  };
  const textCar = (id) => {
    switch (id) {
      case 1:
        return "BMW";
      case 2:
        return "Hyundai";
      default:
        return "Марка неизвестна";
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOrders();
      setOrder(data);
    };
    fetchOrder();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, id_status: newStatus } : card
    );
    setOrder(updatedCards);
    await updateOrder(id, newStatus);
  };

  return (
    <div className={styles.admin}>
      <Link to={"/profile/allRequest"}>
        <button>Вернуться</button>
      </Link>
      <h2>Администраторская панель</h2>
      <div className={styles.filters}>
        <select
          value={filters.status}
          onChange={(e) => updateFilters({ status: e.target.value })}
        >
          <option value="">Выберите статус</option>
          <option value="1">Новое</option>
          <option value="3">Отменено</option>
          <option value="4">Подтверждено</option>
        </select>
        <select
          value={filters.car}
          onChange={(e) => updateFilters({ car: e.target.value })}
        >
          <option value="">Выберите марку</option>
          <option value="1">BMW</option>
          <option value="2">Hyundai</option>
        </select>
        <button onClick={clearFilters}>Сбросить фильтры</button>
      </div>
      <div className={styles.cards}>
        {filteredData.map((card) => (
          <div key={card.id} className={styles.card}>
            <h3>
              {textCar(card.id_car)} - {card.booking_date}
            </h3>
            <p>Статус: {textStatus(card.id_status)}</p>
            <div className={styles.buttons}>
              <Button
                variant="outlined"
                onClick={() => handleStatusChange(card.id, 4)}
              >
                Подтверждено
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleStatusChange(card.id, 3)}
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
