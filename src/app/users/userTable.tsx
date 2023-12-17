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
import { useContext, useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { useIsMount } from "@/hook/mount";
import CreateUserModal from "./upsertUserModal";
import { IUser } from "@/db/model";
import { Trash, Edit } from "react-feather";
import DeleteUserModal from "./deleteUserModal";
import { ToastContext } from "@/components/ToastProvider";
import { ERROR, SUCCESS } from "@/components/Toast";
import TablePagination, { IPage } from "@/components/TablePagination";

const TABLE_HEAD: IHeadConfig[] = [
  { name: "Correo Electronico", rowName: "email" },
  { name: "Acciones" },
];
const successMessage = (action: string): React.ReactNode => (
  <>
    <p className="text-center">Se a {action} el usuario con existo</p>
  </>
);

const errorMessage = (action: string): React.ReactNode => (
  <>
    <p className="text-center">
      Ocurrio un error al intentar {action} el usuario
    </p>
  </>
);

export default function UserTable({
  initUsers,
}: {
  initUsers: IDataTable<IUser>;
}) {
  const isMount = useIsMount();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IDataTable<IUser>>(initUsers);
  const [modalUser, setModalUser] = useState<IUser | null>(null);
  const [isUpsertOpen, setIsUpsertOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<IPage>({
    total: initUsers.count,
    offset: 0,
    limit: 5,
  });
  const { createToast }: any = useContext(ToastContext);

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
        <button
          className="none"
          onClick={() => {
            setModalUser(r);
            setIsDeleteOpen(true);
          }}
        >
          <Trash className="mx-2" />
        </button>
      </div>
    ),
  ];

  async function deleteUserHandler(user: IUser) {
    const actionMessage = "eliminar";
    const response = await fetch(`/api/users/delete/${user.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchData(page);
      createToast(successMessage(actionMessage), SUCCESS);
    } else {
      createToast(errorMessage(actionMessage), ERROR);
    }
  }

  async function upsertUserHandler(newUser: IUser) {
    const actionMessage = "crear/modiciar";
    const response = await fetch("/api/users/upsert", {
      method: "POST",
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      fetchData(page);
      createToast(successMessage(actionMessage), SUCCESS);
    } else {
      createToast(errorMessage(actionMessage), ERROR);
    }
  }

  async function fetchData(page: IPage) {
    setLoading(true);
    const params: string =
      "?" +
      new URLSearchParams({
        offset: `${page.offset}`,
        limit: `${page.limit}`,
        email: search,
      }).toString();

    const response = await fetch(`/api/users${params}`);
    const newUsers: IDataTable<IUser> = await response.json();

    setPage({ ...page, total: newUsers.count });
    setUsers(newUsers);
    setLoading(false);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!isMount) {
        setPage({ ...page, offset: 0 });
        fetchData(page);
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
      {isDeleteOpen && (
        <DeleteUserModal
          setIsOpen={setIsDeleteOpen}
          modalUser={modalUser}
          deleteUserHandler={deleteUserHandler}
        />
      )}
      <div className={styles.tableActionsWrapper}>
        <div className="w-[195px]" />
        <div className="flex w-[200px]">
          <Input
            value={search}
            onChange={(e: any) => {
              setSearch(e.target.value);
            }}
            placeholder={"Buscar Usuario ..."}
          />
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
        <>
          <Table headers={TABLE_HEAD} columns={columns} data={users} />
          <TablePagination
            page={page}
            setPage={setPage}
            fetchData={fetchData}
          />
        </>
      )}
    </>
  );
}
