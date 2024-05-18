import React from "react";
import styles from "./RequestCard.module.css";
import Button from "../Button/Button";

const RequestCard = ({ data }) => {
  return (
    <div className={styles.request}>
      <div className={styles.info}>
        <p>Автомобиль: {data.car}</p>
        <p>Дата бронирования: {data.date}</p>
        <p>Статус: {data.status}</p>
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
