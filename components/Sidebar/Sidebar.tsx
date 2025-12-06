"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiGrid,
  FiLayers,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
} from "react-icons/fi";
import styles from "./Sidebar.module.sass";
import { useAuthActions } from "@/hooks/useAuthActions";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const NAV = [
  { label: "Dashboard", href: "/dashboard", Icon: FiGrid },
  { label: "Matrices", href: "/dashboard/matrices", Icon: FiLayers },
  { label: "Profile", href: "/dashboard/profile", Icon: FiUser },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { logoutMutation } = useAuthActions();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) setCollapsed(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  const firstLetter = user?.name?.[0].toUpperCase() || "?";
  const fullName = user?.name || "User";

  return (
    <aside
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}
      aria-expanded={!collapsed}
    >
      <div className={styles.inner}>
        <div className={styles.brandWrap}>
          <div className={styles.brand}>{firstLetter}</div>
          {!collapsed && <div className={styles.brandLabel}>{fullName}</div>}
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
          onClick={() => logoutMutation.mutate()}
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
