"use client";

import styles from "./MatricesPage.module.sass";
import UserMatrices from "@/components/UserMatrices/UserMatrices";
import { useState } from "react";
import CreateMatrixModal from "@/components/CreateMatrixModal/CreateMatrixModal";

const MatricesPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Your Metrics</h1>
        <button className={styles.createBtn} onClick={() => setOpen(true)}>
          + Create Matrix
        </button>
      </div>

      <UserMatrices />

      {open && <CreateMatrixModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default MatricesPage;
