"use client";

import Topbar from "./components/Topbar/Topbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "../globals.sass";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="appRoot"
      style={{ minHeight: "100vh", background: "var(--bg-main)" }}
    >
      <Topbar />

      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          height: `calc(100vh - var(--topbar-height))`,
          overflow: "hidden",
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
            height: "100%",
            overflow: "auto",
            padding: "1.25rem",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
