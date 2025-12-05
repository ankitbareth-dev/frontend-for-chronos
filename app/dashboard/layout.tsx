"use client";

import Topbar from "@/components/Topbar/Topbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import "../globals.sass";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuth();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [openMenu, setOpenMenu] = useState(false);

  if (isMobile === null) return null;

  return (
    <div
      className="appRoot"
      style={{ minHeight: "100vh", background: "var(--bg-main)" }}
    >
      <Topbar onOpenMobileMenu={() => setOpenMenu(true)} />

      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          height: `calc(100vh - var(--topbar-height))`,
          overflow: "hidden",
        }}
      >
        {isMobile ? (
          <MobileMenu open={openMenu} onClose={() => setOpenMenu(false)} />
        ) : (
          <Sidebar />
        )}

        <main
          style={{
            flex: 1,
            height: "100%",
            overflow: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
