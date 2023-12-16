"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";

import styles from "./UserNavbar.module.css";
import { AUTHENTICATED } from "@/constants";

function UserNavbar() {
  const { data, status } = useSession();
  return status === AUTHENTICATED ? (
    <div className={styles.wrapper}>
      <div className={styles.userInfo}>
        <div>{data?.user?.name}</div>
        <div>{data?.user?.email}</div>
      </div>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>
          <img
            className={styles.userImage}
            src={data?.user?.image || ""}
            width={50}
            height={50}
            alt="Google User Picture"
          />
        </button>
        <div className={styles.dropdownContent}>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-[300px]" />
  );
}

export default UserNavbar;
