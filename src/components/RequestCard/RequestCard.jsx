import React from "react";
import styles from "./RequestCard.module.css";
import Button from "../Button/Button";

const RequestCard = ({ data }) => {
  return (
    <div className={styles.request}>
      <div className={styles.info}>{data.title}</div>
      <div className={styles.info}>{data.car}</div>
      <div className={styles.info}>{data.date}</div>
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
