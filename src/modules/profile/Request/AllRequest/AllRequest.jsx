import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllRequest.module.css";
import {
  AddRequestCard,
  RequestCard,
} from "../../../../components/RequestCard/RequestCard";
import Typography from "../../../../components/Typography/Typography";
import { getRequestsById } from "../../../../api/api";

const AllRequest = () => {
  const [cards, setCards] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getRequestsById(user.id); // Получаем заказы с сервера
        setCards(data); // Обновляем состояние
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <>
      <Typography tag="h3">Все заявки</Typography>
      <div className={styles.add}>
        <AddRequestCard onAdd={() => navigate("/profile/newRequest")} />
      </div>
      <div className={styles.all}>
        {cards.length !== 0 ? (
          cards.map((card) => <RequestCard key={card.id} data={card} />)
        ) : (
          <Typography tag="p">Нет броней</Typography>
        )}
      </div>
    </>
  );
};

export default AllRequest;
