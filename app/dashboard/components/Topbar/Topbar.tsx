"use client";

import styles from "./Topbar.module.sass";
import { FiMoon, FiSun, FiMenu } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import ClockIcon from "./ClockIcon";

export default function Topbar({ onOpenMobileMenu }: any) {
  const { theme, setTheme } = useTheme();
  const mounted = useRef(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    mounted.current = true;
  }, []);

  return (
    <header className={styles.topbar}>
      {/* MOBILE HAMBURGER — only visible on small screens */}
      {isMobile && (
        <button
          className={styles.hamburger}
          onClick={onOpenMobileMenu}
          aria-label="Open Menu"
        >
          <FiMenu />
        </button>
      )}

      {/* CENTERED CLOCK + LOGO (mobile) / LEFT (desktop) */}
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
