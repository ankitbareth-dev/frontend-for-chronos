"use client";

import styles from "./MatrixCategories.module.sass";
import { FiTag } from "react-icons/fi";

export default function MatrixCategories() {
  const categories = [
    { name: "Work", color: "#4F46E5" },
    { name: "Health", color: "#16A34A" },
    { name: "Learning", color: "#2563EB" },
    { name: "Personal", color: "#D97706" },
    { name: "Chores", color: "#DC2626" },
  ];

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Categories</h2>

      <div className={styles.list}>
        {categories.map((item, index) => (
          <div key={index} className={styles.category}>
            <div
              className={styles.colorDot}
              style={{ backgroundColor: item.color }}
            />
            <span>{item.name}</span>
            <FiTag className={styles.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}
