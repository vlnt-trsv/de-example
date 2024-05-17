import React from "react";
import styles from "./Section.module.css";
import clsx from "clsx";

const Section = ({ banner = false, img, padding = true, justifyContent = true, gap = true, children }) => {
  return (
    <div
      className={clsx(
        styles.section,
        { [styles.padding]: padding },
        { [styles.justifyContent]: justifyContent },
        { [styles.gap]: gap },
        "container"
      )}
    >
      {children}
      {banner && (
        <div className={clsx({ [styles.banner]: banner })}>
          <img className={styles.img} src={img} alt={"image"} />
        </div>
      )}
    </div>
  );
};

export default Section;
