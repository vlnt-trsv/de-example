import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import styles from "./Input.module.css";

const Input = React.forwardRef(
  ({ label, className, error, id: externalId, ...props }, ref) => {
    const internalId = React.useRef(null);
    const id = externalId || internalId.current?.id || "";

    return (
      <div className={clsx(styles.container, { [styles.error]: !!error })}>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          className={clsx(styles.input, className)}
          {...props}
          autoComplete="off"
          id={id}
          ref={ref || internalId}
        />
        {error && <p>{error}</p>}
      </div>
    );
  }
);

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
};

export default Input;
