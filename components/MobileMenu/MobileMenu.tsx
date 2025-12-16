"use client";

import {
  FiX,
  FiGrid,
  FiLayers,
  FiList,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";
import styles from "./MobileMenu.module.sass";

const NAV = [
  { label: "Dashboard", href: "/dashboard", Icon: FiGrid },
  { label: "Matrices", href: "/dashboard/matrices", Icon: FiLayers },
  { label: "Profile", href: "/dashboard/profile", Icon: FiUser },
];

export default function MobileMenu({ open, onClose }: any) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={`${styles.overlay} ${open ? styles.open : ""}`}>
      <div className={styles.panel}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FiX size={22} />
        </button>

        <nav className={styles.nav}>
          {NAV.map(({ label, href, Icon }) => {
            const active = pathname === href;
            return (
              <button
                key={href}
                className={`${styles.item} ${active ? styles.active : ""}`}
                onClick={() => {
                  onClose();
                  router.push(href);
                }}
              >
                <Icon />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        <button
          className={styles.logout}
          onClick={() => {
            onClose();
            router.push("/");
          }}
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
