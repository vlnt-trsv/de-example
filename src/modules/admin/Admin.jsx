import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";
import { AdminOrderCard } from "../../components/OrderCard/OrderCard";
import { getOrders, getUserById, updateOrder } from "../../api/api";
import useFilter from "../../hooks/useFilter";
import Filter from "../../components/Filter/Filter";
import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const { filteredData, filters, updateFilters } = useFilter(orders);

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOrders();
      setOrders(data.orders);
      setStatuses(data.statuses);
      setProducts(data.products);
    };
    fetchOrder();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, id_status: newStatus } : order
    );
    setOrders(updatedOrders);
    await updateOrder(id, newStatus);
  };

  return (
    <Section>
      <div className={styles.admin}>
        <div className={styles.info}>
          <Link to={"/profile/allOrder"}>
            <Button variant="text">Вернуться</Button>
          </Link>
          <h2>Администраторская панель</h2>
          <Filter
            filters={filters}
            order={orders}
            products={products}
            statuses={statuses}
            updateFilters={updateFilters}
          />
        </div>
        <div className={styles.cards}>
          {filteredData.map((order) => (
            <AdminOrderCard
              key={order.id}
              order={order}
              products={products}
              statuses={statuses}
              handleStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Admin;
