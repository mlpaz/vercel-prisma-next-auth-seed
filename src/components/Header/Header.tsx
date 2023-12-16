import React from "react";
import styles from "./Header.module.css";
import Logo from "../Logo";
import UserNavbar from "../UserNavbar";
import SiteNavbar from "../SiteNavbar";

function Header() {
  return (
    <header className={styles.wrapper}>
      <SiteNavbar />
      <div className="h-[67px] flex ">
        <h1 className="m-auto text-center ml-[233px]">
          Tapiceria Nautica Buenos Aires
        </h1>
      </div>
      <UserNavbar />
    </header>
  );
}

export default Header;
