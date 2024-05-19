import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllRequest.module.css";
import {
  AddRequestCard,
  RequestCard,
} from "../../../../components/RequestCard/RequestCard";
import Typography from "../../../../components/Typography/Typography";
import Tooltip from "../../../../components/Tooltip/Tooltip";
import { getRequests } from "../../../../api/api";

const AllRequest = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getRequests(); // Получаем заказы с сервера
        setCards(data); // Обновляем состояние
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  // TODO: Сделать useFilter для фильтрации заказов

  return (
    <>
      <Typography tag="h3">Все заявки</Typography>
      <div className={styles.add}>
        <AddRequestCard onAdd={() => navigate("/profile/newRequest")} />
      </div>
      <div className={styles.all}>
        {cards.map((card) => (
          <Tooltip key={card.id} title={card.car}>
            <RequestCard key={card.id} data={card} />
          </Tooltip>
        ))}
      </div>
    </>
  );
};

export default AllRequest;
