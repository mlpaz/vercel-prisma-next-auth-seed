import styles from "./login.module.css";
import Image from "next/image";
import SingInButton from "@/components/SingInButton";
import Logo from "@/components/Logo";

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <div>
        <Logo width={150} height={150} className="m-auto rounded-md" />
        <h2 className={styles.title}>Inicia sesión con tu cuenta de Google</h2>
      </div>
      <div className={styles.formContainer}>
        <SingInButton />
      </div>
    </div>
  );
}
