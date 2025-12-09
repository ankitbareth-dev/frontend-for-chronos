"use client";

import { useQueryClient } from "@tanstack/react-query";
import styles from "./MatrixDetailPage.module.sass";

import MatrixCategories from "@/components/MatrixCategories/MatrixCategories";
import MatrixGrid from "@/components/MatrixGrid/MatrixGrid";

export default function MatrixDetailPage() {
  const queryClient = useQueryClient();
  const matrix: any = queryClient.getQueryData(["selected-matrix"]);

  if (!matrix) {
    return (
      <div className={styles.noData}>
        No matrix data found. Please open it from the list.
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* MATRIX NAME HEADER */}
      <div className={styles.headerCard}>
        <h1 className={styles.headerTitle}>{matrix.name}</h1>
      </div>

      {/* MAIN GRID LAYOUT */}
      <div className={styles.mainLayout}>
        <MatrixGrid matrixId={matrix.id} />
        <MatrixCategories matrixId={matrix.id} />
      </div>
    </div>
  );
}
