"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./MatrixDetailPage.module.sass";

import MatrixCategories from "@/components/MatrixCategories/MatrixCategories";
import MatrixGrid from "@/components/MatrixGrid/MatrixGrid";

export default function MatrixDetailPage() {
  const queryClient = useQueryClient();
  const matrix: any = queryClient.getQueryData(["selected-matrix"]);

  // -------------------------------------------
  // 🔼 LIFTED STATE: selected category
  // -------------------------------------------
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (!matrix) {
    return (
      <div className={styles.noData}>
        No matrix selected. Please open it from the list.
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* MATRIX NAME HEADER */}
      <div className={styles.headerCard}>
        <h1 className={styles.headerTitle}>{matrix.name}</h1>
      </div>

      {/* GRID + CATEGORIES */}
      <div className={styles.mainLayout}>
        <div className={styles.gridWrapper}>
          <MatrixGrid
            matrixId={matrix.id}
            selectedCategory={selectedCategory} // 👈 pass state
          />
        </div>

        <div className={styles.categoryWrapper}>
          <MatrixCategories
            matrixId={matrix.id}
            selectedCategory={selectedCategory} // 👈 current selected
            onSelectCategory={setSelectedCategory} // 👈 pass setter
          />
        </div>
      </div>
    </div>
  );
}
