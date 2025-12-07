"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useMatricesActions } from "@/hooks/useMatricesActions";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./UserMatrices.module.sass";

const UserMatrices = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);
  const { matricesQuery } = useMatricesActions();

  if (!user) return <div className={styles.message}>Loading user...</div>;

  if (matricesQuery.isLoading)
    return <div className={styles.message}>Loading metrics...</div>;

  if (matricesQuery.isError)
    return (
      <div className={styles.error}>
        Failed to load metrics: {(matricesQuery.error as Error).message}
      </div>
    );

  const matrices = matricesQuery.data;

  if (!matrices || matrices.length === 0) {
    return <div className={styles.noData}>No metrics found</div>;
  }

  return (
    <div className={styles.metricsList}>
      {matrices.map((item: any) => (
        <div
          key={item.id}
          className={styles.metricCard}
          onClick={() => {
            queryClient.setQueryData(["selected-matrix"], item);
            router.push(`/dashboard/matrices/${item.id}`);
          }}
        >
          <h3 className={styles.metricTitle}>{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default UserMatrices;
