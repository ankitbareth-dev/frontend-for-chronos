"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import styles from "./dashboardLayout.module.sass";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }: any) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div
      className={`${styles.dashboardLayout} ${
        isCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded
      }`}
    >
      {/* MOBILE MENU BUTTON */}
      <button
        className={styles.mobileMenuBtn}
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu />
      </button>

      {/* OVERLAY */}
      {isMobileOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`${styles.sidebarWrapper} ${
          isMobileOpen ? styles.open : ""
        }`}
      >
        <Sidebar onCollapseChange={setIsCollapsed} />
      </div>

      {/* MAIN AREA */}
      <div className={styles.mainArea}>
        <Topbar />
        <div className={styles.contentArea}>{children}</div>
      </div>
    </div>
  );
}
