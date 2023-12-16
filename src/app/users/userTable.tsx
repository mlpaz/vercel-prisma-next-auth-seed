"use client";
import Button from "@/components/Button/Button";
import Input from "@/components/Input";
import Table from "@/components/Table";
import {
  ColumnLambda,
  IDataTable,
  IHeadConfig,
} from "@/components/Table/interface";
import styles from "./user.module.css";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { useIsMount } from "@/hook/mount";
import CreateUserModal from "./upsertUserModal";
import { IUser } from "@/db/model";
import { Trash, Edit } from "react-feather";

const TABLE_HEAD: IHeadConfig[] = [
  { name: "Correo Electronico", rowName: "email" },
  { name: "Acciones" },
];

export default function UserTable({ initUsers }: { initUsers: IDataTable }) {
  const isMount = useIsMount();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IDataTable>(initUsers);
  const [modalUser, setModalUser] = useState<IUser | null>(null);
  const [isUpsertOpen, setIsUpsertOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const columns: ColumnLambda[] = [
    (r) => <p>{r.email}</p>,
    (r) => (
      <div className="flex">
        <button
          className="none"
          onClick={() => {
            setModalUser(r);
            setIsUpsertOpen(true);
          }}
        >
          <Edit className="mx-2" />
        </button>
        <button className="none">
          <Trash className="mx-2" />
        </button>
      </div>
    ),
  ];

  function upsertUserHandler(newUser: IUser) {
    fetch("/api/users/upsert", {
      method: "POST",
      body: JSON.stringify(newUser),
    });
  }

  async function findUser() {
    setLoading(true);
    const response = await fetch(`/api/users?email=${search}`);
    const newUsers = await response.json();
    setLoading(false);
    setUsers(newUsers);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!isMount) {
        findUser();
      }
    }, 800);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <>
      {isUpsertOpen && (
        <CreateUserModal
          setIsOpen={setIsUpsertOpen}
          upsertUserHandler={upsertUserHandler}
          modalUser={modalUser}
        />
      )}
      <div className={styles.tableActionsWrapper}>
        <div className="w-[55%] ">
          <div className="flex justify-end">
            <Input
              value={search}
              onChange={(e: any) => {
                setSearch(e.target.value);
              }}
              placeholder={"Buscar Usuario ..."}
            />
          </div>
        </div>
        <div className="self-end mr-8">
          <Button
            onClick={() => {
              setModalUser(null);
              setIsUpsertOpen(true);
            }}
          >
            <p className="m-auto">Crear Nuevo Usuario </p>
          </Button>
        </div>
      </div>

      {loading && (
        <div className="mt-6">
          <Loader />
        </div>
      )}
      {!loading && (
        <Table headers={TABLE_HEAD} columns={columns} data={users} />
      )}
    </>
  );
}
