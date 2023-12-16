"use client";
import React from "react";
import styles from "./SiteNavbar.module.css";
import { AUTHENTICATED } from "@/constants";
import { useSession } from "next-auth/react";
import { Menu, Users } from "react-feather";
import { motion } from "framer-motion";
import { itemVariants, variants } from "./animate";
import Link from "next/link";

function SiteNavbar() {
  const [showMenu, setShowMenu] = React.useState(false);

  const { status } = useSession();
  return status === AUTHENTICATED ? (
    <motion.div
      className={styles.wrapper}
      animate={showMenu ? "open" : "closed"}
      onMouseEnter={() => {
        setShowMenu(true);
      }}
      onMouseLeave={() => {
        setShowMenu(false);
      }}
    >
      <Menu size={35} />
      <motion.nav className={styles.menu} initial={false} variants={variants}>
        <motion.ul>
          <Link href="/users">
            <Option setShowMenu={setShowMenu}>
              <Users size={30} className={styles.iconNav} />
              <h2 className={styles.textNav}>Administrar Usuarios</h2>
            </Option>
          </Link>
        </motion.ul>
      </motion.nav>
    </motion.div>
  ) : (
    <div className="w-[67px]" />
  );
}

function Option({
  children,
  setShowMenu,
}: {
  children: React.ReactNode;
  setShowMenu: any;
}) {
  return (
    <motion.li
      variants={itemVariants}
      className={styles.optionNav}
      onClick={() => {
        setShowMenu(false);
      }}
    >
      {children}
    </motion.li>
  );
}

export default SiteNavbar;
