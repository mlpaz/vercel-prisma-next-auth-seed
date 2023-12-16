import React from "react";
import styles from "./Modal.module.css";
import { X } from "react-feather";
import Button from "@/components/Button";
import Input from "@/components/Input";

const Modal = ({
  setIsOpen,
  title,
  children,
}: {
  setIsOpen: any;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{title}</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
