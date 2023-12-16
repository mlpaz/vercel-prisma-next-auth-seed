import { getUsers } from "@/db/user/user";
import styles from "./user.module.css";
import UserTable from "./userTable";
import { IDataTable } from "@/components/Table/interface";
import { IUser } from "@/db/model";

export const dynamic = "force-dynamic";

export default async function Login() {
  const initUsers: IUser[] = await getUsers();
  const initResult: IDataTable = {
    results: initUsers,
    count: initUsers.length,
  };
  return (
    <div className={styles.wrapper}>
      <h1>Administrar Usuarios </h1>
      <UserTable initUsers={initResult} />
    </div>
  );
}
