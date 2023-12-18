import React from "react";
import styles from "./Header.module.css";
import Logo from "../Logo";
import UserNavbar from "../UserNavbar";
import SiteNavbar from "../SiteNavbar";
import Link from "next/link";

function Header() {
  return (
    <header className={styles.wrapper}>
      <SiteNavbar />
      <div className="h-[67px] flex ">
        <Link href="/" className="m-auto  ">
          <h1 className="m-auto text-center ml-[233px]">
            Tapiceria Nautica Buenos Aires
          </h1>
        </Link>
      </div>
      <UserNavbar />
    </header>
  );
}

export default Header;
