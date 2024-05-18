import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllRequest.module.css";
import {
  AddRequestCard,
  RequestCard,
} from "../../../../components/RequestCard/RequestCard";
import Typography from "../../../../components/Typography/Typography";
import Tooltip from "../../../../components/Tooltip/Tooltip";

const AllRequest = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCards = localStorage.getItem("cards");
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  }, []);

  return (
    <>
      <Typography tag="h3">Все заявки</Typography>
      <div className={styles.add}>
        <AddRequestCard onAdd={() => navigate("/profile/newRequest")} />
      </div>
      <div className={styles.all}>
        {cards.map((card) => (
          <Tooltip title={card.car}>
            <RequestCard key={card.id} data={card} />
          </Tooltip>
        ))}
      </div>
    </>
  );
};

export default AllRequest;
