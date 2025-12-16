"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./MatrixDetailPage.module.sass";

import MatrixCategories from "@/components/MatrixCategories/MatrixCategories";
import MatrixGrid from "@/components/MatrixGrid/MatrixGrid";

export default function MatrixDetailPage() {
  const queryClient = useQueryClient();
  const matrix: any = queryClient.getQueryData(["selected-matrix"]);

  const [selectedCategory, setSelectedCategory] = useState<any>(null);

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

      <div className={styles.mainLayout}>
        {/* GRID */}
        <div className={styles.gridWrapper}>
          <MatrixGrid
            matrixId={matrix.id}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* CATEGORIES */}
        <div className={styles.categoryWrapper}>
          <MatrixCategories
            matrixId={matrix.id}
            selectedCategoryId={selectedCategory?.id || null}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>
    </div>
  );
}
