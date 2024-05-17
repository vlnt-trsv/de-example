import React, { useState } from "react";
import styles from "./Tooltip.module.css";

const Tooltip = ({ title, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={styles.tooltip}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && <div className={styles.title}>{title}</div>}
    </div>
  );
};

export default Tooltip;
