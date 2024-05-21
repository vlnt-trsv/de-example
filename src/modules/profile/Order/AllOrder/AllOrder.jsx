import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllOrder.module.css";
import {
  AddOrderCard,
  OrderCard,
} from "../../../../components/OrderCard/OrderCard";
import Typography from "../../../../components/Typography/Typography";
import { getOrdersById } from "../../../../api/api";

const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrdersById(user.id);
      setOrders(data.order);
      setProducts(data.product);
      setStatus(data.status);
    };

    fetchOrders();
  }, []);

  return (
    <div className={styles.all}>
      <Typography tag="h3">Все заявки</Typography>
      <div className={styles.cards}>
        {orders.length !== 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              products={products}
              statuses={status}
            />
          ))
        ) : (
          <Typography tag="p">Нет заказов</Typography>
        )}
      </div>
      <div className={styles.add}>
        <AddOrderCard onAdd={() => navigate("/profile/newOrder")} />
      </div>
    </div>
  );
};

export default AllOrder;
