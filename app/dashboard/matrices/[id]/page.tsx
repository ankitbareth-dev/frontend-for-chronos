"use client";

import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import styles from "./MatrixDetailPage.module.sass";

import MatrixCategories from "@/components/MatrixCategories/MatrixCategories";

export default function MatrixDetailPage() {
  const queryClient = useQueryClient();
  const matrix: any = queryClient.getQueryData(["selected-matrix"]);

  if (!matrix) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No matrix data found. Please open it from the list.
      </div>
    );
  }

  /** ------------------------------------
   *  1) Generate Dates
   -------------------------------------*/
  const start = dayjs(matrix.startDate);
  const end = dayjs(matrix.endDate);

  const dates: dayjs.Dayjs[] = [];
  for (let d = start; d.isBefore(end) || d.isSame(end); d = d.add(1, "day")) {
    dates.push(d);
  }

  /** ------------------------------------
   *  2) Generate Time Slots
   -------------------------------------*/
  const startTime = dayjs(`2025-01-01T${matrix.startTime}`);
  const endTime = dayjs(`2025-01-01T${matrix.endTime}`);

  const times: string[] = [];
  let t = startTime;

  while (t.isSame(endTime) || t.isBefore(endTime)) {
    times.push(t.format("h A"));
    t = t.add(matrix.interval, "minute");
  }

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        {/* MATRIX CARD */}
        <div className={styles.card}>
          <h1 className={styles.cardTitle}>{matrix.name}</h1>

          <div
            className={styles.matrixGrid}
            style={{
              gridTemplateColumns: `120px repeat(${dates.length}, 1fr)`,
            }}
          >
            {/* Empty Corner */}
            <div className={`${styles.matrixCell} ${styles.header}`} />

            {/* Dates */}
            {dates.map((date, i) => (
              <div key={i} className={`${styles.matrixCell} ${styles.header}`}>
                {date.format("DD MMM")}
              </div>
            ))}

            {/* Time Rows */}
            {times.map((time, rowIndex) => (
              <>
                <div
                  key={`time-${rowIndex}`}
                  className={`${styles.matrixCell} ${styles.timeHeader}`}
                >
                  {time}
                </div>

                {dates.map((_, colIndex) => (
                  <div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={styles.matrixCell}
                  />
                ))}
              </>
            ))}
          </div>
        </div>

        {/* CATEGORIES SIDEBAR */}
        <MatrixCategories />
      </div>
    </div>
  );
}
