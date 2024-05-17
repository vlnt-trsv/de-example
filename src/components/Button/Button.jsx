import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import styles from "./Button.module.css";

const Button = React.forwardRef(
  ({ children, variant = "contained", className, loading, ...props }, ref) => (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        { [styles.loading]: loading },
        className
      )}
      type="button"
      {...props}
      ref={ref}
    >
      <span>{children}</span>
    </button>
  )
);

Button.propTypes = {
  loading: PropTypes.bool,
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  children: PropTypes.node.isRequired,
};

export default Button;
