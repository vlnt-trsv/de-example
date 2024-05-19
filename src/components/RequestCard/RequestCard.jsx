import React from "react";
import styles from "./RequestCard.module.css";
import Button from "../Button/Button";

const RequestCard = ({ data }) => {
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

  return (
    <div className={styles.request}>
      <div className={styles.info}>
        <p>Автомобиль: {textCar(data.id_car)}</p>
        <p>Дата бронирования: {data.booking_date}</p>
        <p>Статус: {textStatus(data.id_status)}</p>
      </div>
    </div>
  );
};

const AddRequestCard = ({ onAdd }) => {
  return (
    <div>
      <Button variant={"outlined"} onClick={onAdd}>
        Новая заявка
      </Button>
    </div>
  );
};

export { RequestCard, AddRequestCard };
