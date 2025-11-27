"use client";

import { useState, useEffect } from "react";
import styles from "./Sidebar.module.sass";
import { LayoutDashboard, Folder, Layers, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ onCollapseChange }: any) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, [isCollapsed]);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
    { name: "Categories", href: "/dashboard/categories", icon: <Folder /> },
    { name: "Matrices", href: "/dashboard/matrices", icon: <Layers /> },
  ];

  return (
    <aside
      className={`${styles.sidebar} ${
        isCollapsed ? styles.collapsed : styles.expanded
      }`}
    >
      {/* BRAND */}
      <div className={styles.brandBox}>
        <div className={styles.brandIcon}>C</div>
      </div>

      <div className={styles.divider}></div>

      {/* NAV */}
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`${styles.navItem} ${active ? styles.active : ""}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              {!isCollapsed && (
                <span className={styles.label}>{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className={styles.divider}></div>

      {/* LOGOUT */}
      <div className={styles.bottom}>
        <button className={styles.logoutBtn}>
          <LogOut />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>

      {/* COLLAPSE HANDLE */}
      <button
        className={styles.collapseHandle}
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        {isCollapsed ? "›" : "‹"}
      </button>
    </aside>
  );
}
