"use client";

import styles from "./Topbar.module.sass";
import { RiTimerFlashLine } from "react-icons/ri";
import { FiChevronDown, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";

export default function Topbar() {
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  if (!theme) return null;

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <RiTimerFlashLine className={styles.logoIcon} />
        <h1 className={styles.logo}>Chronos</h1>
      </div>

      <div className={styles.right}>
        {/* THEME SWITCH BUTTON */}
        <button
          className={styles.themeToggle}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>

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
