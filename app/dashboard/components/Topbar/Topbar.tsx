"use client";

import styles from "./Topbar.module.sass";
import { FiChevronDown, FiMoon, FiSun } from "react-icons/fi";
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
          )}{" "}
          {/* fallback icon so UI doesn't shift */}
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
