"use client";

import styles from "./Topbar.module.sass";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import ClockIcon from "./ClockIcon";

export default function Topbar() {
  const { theme, setTheme } = useTheme();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <ClockIcon />
        <h1 className={styles.logo}>Chronos</h1>
      </div>

      <div className={styles.right}>
        <button
          className={styles.themeToggle}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {mounted.current ? (
            theme === "light" ? (
              <FiMoon />
            ) : (
              <FiSun />
            )
          ) : (
            <FiMoon />
          )}
        </button>
      </div>
    </header>
  );
}
