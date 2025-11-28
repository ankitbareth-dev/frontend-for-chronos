"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";

export default function DashboardLayout({ children }: any) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* TOPBAR ALWAYS ON TOP */}
      <Topbar />

      <div className="layoutWrapper">
        {/* SIDEBAR BELOW TOPBAR */}
        <Sidebar onCollapseChange={setIsCollapsed} />

        <main
          className="mainArea"
          style={{
            marginLeft: isCollapsed ? "80px" : "250px",
            // subtract topbar height
            marginTop: "64px",
            transition: "margin-left 0.3s ease",
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}
