import React from "react";
import styles from "./Avatar.module.css";

const Avatar = ({ img, alt }) => {
  return (
    <div className={styles.avatar}>
      <img src={img} alt={alt} className={styles.img} />
    </div>
  );
};

export default Avatar;
