import React from "react";
import styles from "./Input.module.css";

function Input({ label, ...delegated }: any) {
  return (
    <div>
      {label && (
        <label htmlFor={delegated.name} className={styles.label}>
          {label}
        </label>
      )}

      <div className="mt-2">
        <input className={styles.input} {...delegated} />
      </div>
    </div>
  );
}

export default Input;
