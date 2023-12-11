import Input from "@/components/Input";
import styles from "./login.module.css";
import Image from "next/image";

export default function Login() {
  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <Image
            src="/logo-TN.jpeg"
            width={150}
            height={150}
            alt="Logo"
            className="m-auto rounded-md"
          />
          <h2 className={styles.title}>Inicia sesión con tu cuenta</h2>
        </div>

        <div className={styles.formContainer}>
          <form className="space-y-6">
            <Input
              label="Correo Electronico"
              id="email"
              name="email"
              type="email"
              required
            />
            <Input
              label="Contraseña"
              id="password"
              name="password"
              type="password"
              required
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
