"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiGrid,
  FiLayers,
  FiList,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import styles from "./Sidebar.module.sass";

const NAV = [
  { label: "Dashboard", href: "/dashboard/", Icon: FiGrid },
  { label: "Matrices", href: "/dashboard/matrices", Icon: FiLayers },
  { label: "Categories", href: "/dashboard/categories", Icon: FiList },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) setCollapsed(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  return (
    <aside
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}
      aria-expanded={!collapsed}
    >
      <div className={styles.inner}>
        <div className={styles.brandWrap}>
          <div className={styles.brand}>C</div>
          {!collapsed && <div className={styles.brandLabel}>Chronos</div>}
        </div>

        <div className={styles.sep} />

        <nav className={styles.nav} role="navigation" aria-label="Main">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <button
                key={item.href}
                className={`${styles.navItem} ${active ? styles.active : ""}`}
                onClick={() => router.push(item.href)}
                aria-current={active ? "page" : undefined}
              >
                <item.Icon className={styles.icon} />
                {!collapsed && (
                  <span className={styles.label}>{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className={styles.flexGrow} />

        <div className={styles.sep} />

        <button
          className={styles.logout}
          onClick={() => {
            router.push("/");
          }}
        >
          <FiLogOut className={styles.icon} />
          {!collapsed && <span className={styles.label}>Logout</span>}
        </button>
      </div>

      <button
        className={styles.collapseToggle}
        onClick={() => setCollapsed((s) => !s)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>
    </aside>
  );
}
