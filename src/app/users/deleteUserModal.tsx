import React from "react";
import styles from "./user.module.css";
import { X } from "react-feather";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { IUser } from "@/db/model";

const DeleteUserModal = ({
  setIsOpen,
  deleteUserHandler,
  modalUser,
}: {
  setIsOpen: any;
  deleteUserHandler: any;
  modalUser: IUser | null;
}) => {
  const title: string = `Estas seguro de querer borrar al usuario ${modalUser?.email} ?`;

  function handleConfirm() {
    deleteUserHandler(modalUser);
    setIsOpen(false);
  }

  return (
    <Modal setIsOpen={setIsOpen} title={title}>
      <div className={styles.modalActions}>
        <div className={styles.actionsContainer}>
          <Button onClick={() => handleConfirm()}>Confirmar</Button>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
