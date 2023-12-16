import styles from "./Button.module.css";
import React from "react";
function Button({ children, ...delegated }: any) {
  return (
    <button className={styles.button} {...delegated}>
      {children}
    </button>
  );
}

export default Button;
