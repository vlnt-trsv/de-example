import React from "react";
import styles from "./OrderCard.module.css";
import Button from "../Button/Button";

const OrderCard = ({ order, products, statuses }) => {
  const product = products.find((product) => product.id === order.id_product);
  const status = statuses.find((status) => status.id === order.id_status);

  return (
    <div className={styles.order}>
      <div className={styles.info}>
        <p>Товар: {product ? product.name : "Неизвестный продукт"}</p>
        <p>Адрес: {order.address}</p>
        <p>Количество: {order.count}</p>
        <p>Статус: {status ? status.name : "Неизвестный статус"}</p>
      </div>
    </div>
  );
};

const AddOrderCard = ({ onAdd }) => {
  return (
    <div>
      <Button variant={"outlined"} onClick={onAdd}>
        Новая заявка
      </Button>
    </div>
  );
};

const AdminOrderCard = ({ order, products, statuses, handleStatusChange }) => {
  const status = statuses.find((status) => status.id === order.id_status);
  const product = products.find((product) => product.id === order.id_product);

  return (
    <div className={styles.card}>
      <h3>{product ? product.name : "Неизвестный продукт"}</h3>
      <div className={styles.info}>
        <p>Адрес: {order.count}</p>
        <p>Количество: {order.count}</p>
        <p>Статус: {status ? status.name : "Неизвестный статус"}</p>
      </div>
      <div className={styles.buttons}>
        <Button
          variant="outlined"
          onClick={() => handleStatusChange(order.id, 2)}
        >
          Подтверждено
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleStatusChange(order.id, 3)}
        >
          Отклонено
        </Button>
      </div>
    </div>
  );
};

export { OrderCard, AddOrderCard, AdminOrderCard };
