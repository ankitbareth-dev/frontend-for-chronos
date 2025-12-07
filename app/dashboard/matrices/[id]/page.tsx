"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./MatrixDetailPage.module.sass";
import dayjs from "dayjs";

export default function MatrixDetailPage({ params }: any) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const matrix: any = queryClient.getQueryData(["selected-matrix"]);

  if (!matrix) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No matrix data found. Please open it from the list.
      </div>
    );
  }

  // Generate dates from startDate to endDate
  const start = dayjs(matrix.startDate);
  const end = dayjs(matrix.endDate);
  const dates = [];
  for (
    let d = start;
    d.isBefore(end) || d.isSame(end, "day");
    d = d.add(1, "day")
  ) {
    dates.push(d);
  }

  // Generate times based on interval
  const times = [];
  const startTime = dayjs(`2025-01-01T${matrix.startTime}:00`);
  const endTime = dayjs(`2025-01-01T${matrix.endTime}:00`);
  let currentTime = startTime;
  while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
    times.push(currentTime.format("HH:mm"));
    currentTime = currentTime.add(matrix.interval, "minute");
  }

  return (
    <div className={styles.page}>
      <button onClick={() => router.back()} className={styles.backButton}>
        <ArrowLeft size={18} /> Back
      </button>

      <div className={styles.card}>
        <h1 className={styles.cardTitle}>{matrix.name}</h1>

        <div className={styles.matrixGrid}>
          {/* Top-left empty cell */}
          <div className={`${styles.matrixCell} ${styles.header}`} />

          {/* Date headers */}
          {dates.map((date, idx) => (
            <div key={idx} className={`${styles.matrixCell} ${styles.header}`}>
              {date.format("DD MMM")}
            </div>
          ))}

          {/* Time rows */}
          {times
            .map((time, tIdx) => (
              <div
                key={`time-${tIdx}`}
                className={`${styles.matrixCell} ${styles.timeHeader}`}
              >
                {time}
              </div>
            ))
            .flatMap((timeCell, tIdx) => {
              return [
                timeCell,
                ...dates.map((date, dIdx) => (
                  <div
                    key={`cell-${tIdx}-${dIdx}`}
                    className={styles.matrixCell}
                  >
                    {/* You can render matrix.cells info here if available */}
                  </div>
                )),
              ];
            })}
        </div>
      </div>
    </div>
  );
}
