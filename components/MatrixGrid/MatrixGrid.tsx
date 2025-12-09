"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./MatrixGrid.module.sass";

interface MatrixData {
  id: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  interval: number;
}

export default function MatrixGrid({ matrixId }: { matrixId: string }) {
  const [matrix, setMatrix] = useState<MatrixData | null>(null);

  // Fetch matrix data
  useEffect(() => {
    async function loadMatrix() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/matrix-data/${matrixId}`,
          { credentials: "include" }
        );

        const json = await res.json();
        if (json.success) {
          setMatrix(json.data);
        }
      } catch (err) {
        console.error("Failed to load matrix data", err);
      }
    }

    loadMatrix();
  }, [matrixId]);

  if (!matrix) return <div className={styles.loading}>Loading matrix...</div>;

  /** ------------------------------------
   * Generate Dates
   ------------------------------------ */
  const start = dayjs(matrix.startDate);
  const end = dayjs(matrix.endDate);

  const dates: dayjs.Dayjs[] = [];
  for (let d = start; d.isBefore(end) || d.isSame(end); d = d.add(1, "day")) {
    dates.push(d);
  }

  /** ------------------------------------
   * Generate Time Slots
   ------------------------------------ */
  const startTime = dayjs(`2025-01-01T${matrix.startTime}`);
  const endTime = dayjs(`2025-01-01T${matrix.endTime}`);

  const times: string[] = [];
  let t = startTime;

  while (t.isBefore(endTime) || t.isSame(endTime)) {
    const next = t.add(matrix.interval, "minute");
    times.push(`${t.format("h A")} - ${next.format("h A")}`);
    t = next;
  }

  return (
    <div
      className={styles.matrixGrid}
      style={{ gridTemplateColumns: `120px repeat(${dates.length}, 1fr)` }}
    >
      {/* Empty corner */}
      <div className={`${styles.cell} ${styles.header}`} />

      {/* Date Row */}
      {dates.map((d, i) => (
        <div key={i} className={`${styles.cell} ${styles.header}`}>
          {d.format("DD MMM")}
        </div>
      ))}

      {/* Time Left Column + Cells */}
      {times.map((timeLabel, rowIndex) => (
        <>
          {/* Time label */}
          <div
            key={`time-${rowIndex}`}
            className={`${styles.cell} ${styles.timeHeader}`}
          >
            {timeLabel}
          </div>

          {dates.map((_, colIndex) => {
            const index = rowIndex * dates.length + colIndex;
            return (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className={styles.cell}
              />
            );
          })}
        </>
      ))}
    </div>
  );
}
