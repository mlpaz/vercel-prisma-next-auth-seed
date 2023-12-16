import React from "react";
import styles from "./user.module.css";
import { X } from "react-feather";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { IUser } from "@/db/model";

const CreateUserModal = ({
  setIsOpen,
  upsertUserHandler,
  modalUser,
}: {
  setIsOpen: any;
  upsertUserHandler: any;
  modalUser: IUser | null;
}) => {
  const title: string = modalUser ? "Editar Usuario" : "Agregar Usuario";

  function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { email } = Object.fromEntries(formData);
    let newUser = {};
    if (modalUser != null) {
      newUser = { id: modalUser.id, ...newUser };
    }
    newUser = { email, ...newUser };
    console.info(newUser);
    upsertUserHandler(newUser);
    setIsOpen(false);
  }

  return (
    <Modal setIsOpen={setIsOpen} title={title}>
      <form onSubmit={handleSubmit}>
        <div className={styles.modalContent}>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Correo Electronico"
            defaultValue={modalUser ? modalUser.email : ""}
          />
        </div>
        <div className={styles.modalActions}>
          <div className={styles.actionsContainer}>
            <Button type="submit">Confirmar</Button>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateUserModal;
