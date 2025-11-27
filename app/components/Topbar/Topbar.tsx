"use client";

import styles from "./Topbar.module.sass";
import { RiTimerFlashLine } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";

export default function Topbar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <RiTimerFlashLine className={styles.logoIcon} />
        <h1 className={styles.logo}>Chronos</h1>
      </div>

      <div className={styles.right}>
        <div className={styles.user}>
          <img
            src="https://i.pravatar.cc/300"
            alt="user"
            className={styles.avatar}
          />
          <span className={styles.name}>Himanshu</span>
          <FiChevronDown className={styles.arrow} />
        </div>
      </div>
    </header>
  );
}
