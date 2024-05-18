import React from "react";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import Section from "../../components/Section/Section";
import Typography from "../../components/Typography/Typography";

const img =
  "https://images.unsplash.com/photo-1715756612502-a67ed97280df?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Home = () => {
  return (
    <div className={styles.main}>
      <Header />
      <Section banner={true} img={img}>
        <div>
          <Typography tag="h1">Сервис бронирования авто</Typography>
          <Typography tag="h4">
            Поможет вам быстрее добраться туда или туда
          </Typography>
        </div>
      </Section>
      <Section>Новости</Section>
      <Section>Вопросы</Section>
    </div>
  );
};

export default Home;
