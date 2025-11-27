"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Sidebar.module.sass";

import { LayoutDashboard, Folder, Layers, LogOut, Menu, X } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // mobile drawer
  const [isCollapsed, setIsCollapsed] = useState(false); // desktop collapse
  const pathname = usePathname();
  const sidebarRef = useRef(null);

  // Close sidebar on outside click (mobile only)
  useEffect(() => {
    function handleClick(e: any) {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
    { name: "Categories", href: "/dashboard/categories", icon: <Folder /> },
    { name: "Matrices", href: "/dashboard/matrices", icon: <Layers /> },
  ];

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button className={styles.mobileMenuBtn} onClick={() => setIsOpen(true)}>
        <Menu />
      </button>

      {/* OVERLAY (mobile only) */}
      {isOpen && <div className={styles.overlay}></div>}

      {/* SIDEBAR */}
      <aside
        ref={sidebarRef}
        className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""} ${
          isOpen ? styles.open : ""
        }`}
      >
        {/* HEADER */}
        <div className={styles.top}>
          {!isCollapsed && <h2 className={styles.logo}>Chronos</h2>}

          <button
            className={styles.collapseBtn}
            onClick={() => setIsCollapsed((p) => !p)}
          >
            {isCollapsed ? "→" : "←"}
          </button>

          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

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

        {/* LOGOUT */}
        <div className={styles.bottom}>
          <button className={styles.logoutBtn}>
            <LogOut />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
