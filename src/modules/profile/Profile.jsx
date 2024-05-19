import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import Header from "../../components/Header/Header";
import Aside from "../../components/Aside/Aside";
import Main from "../../components/Main/Main";

const Profile = () => {
  return (
    <div className={`${styles.profile} container`}>
      <Header className={styles.header} />
      <Aside className={styles.aside} />
      <Main className={styles.main} />
    </div>
  );
};

export default Profile;
