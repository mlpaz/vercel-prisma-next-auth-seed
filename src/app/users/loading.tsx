import Loader from "@/components/Loader";
import styles from "./user.module.css";

export default async function LoginLoading() {
  return (
    <div className={styles.wrapper}>
      <h1>Administrar Usuarios </h1>
      <div className="mt-12">
        <Loader />
      </div>
    </div>
  );
}
