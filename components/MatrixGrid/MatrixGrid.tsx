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

export default function MatrixGrid({
  matrixId,
  selectedCategory,
}: {
  matrixId: string;
  selectedCategory: any | null;
}) {
  const [matrix, setMatrix] = useState<MatrixData | null>(null);
  const [cellColors, setCellColors] = useState<Record<number, string>>({});
  const [pending, setPending] = useState<Record<number, string>>({});

  /* ---------------- LOAD MATRIX DATA ---------------- */
  useEffect(() => {
    async function loadMatrix() {
      const res = await fetch(
        `http://localhost:5000/api/matrix-data/${matrixId}`,
        { credentials: "include" }
      );

      const json = await res.json();
      if (json.success) setMatrix(json.data);
    }

    if (matrixId) loadMatrix();
  }, [matrixId]);

  /* ---------------- LOAD CELL COLORS ---------------- */
  useEffect(() => {
    async function loadCells() {
      const res = await fetch(`http://localhost:5000/api/cell`, {
        credentials: "include",
      });

      const json = await res.json();

      if (json.success) {
        const map: Record<number, string> = {};
        json.data.forEach((c: any) => {
          if (c.colorHex) map[c.index] = c.colorHex;
        });
        setCellColors(map);
      }
    }

    if (matrixId) loadCells();
  }, [matrixId]);

  /* ---------------- APPLY CATEGORY COLOR ON CLICK ---------------- */
  function handleCellClick(index: number) {
    if (!selectedCategory) return;
    const color = selectedCategory.color;

    setPending((prev) => ({
      ...prev,
      [index]: color,
    }));
  }

  /* ---------------- SAVE BUTTON HANDLER ---------------- */
  async function saveChanges() {
    const changes = Object.keys(pending).map((index) => ({
      index: Number(index),
      colorHex: pending[index],
    }));

    const res = await fetch(`http://localhost:5000/api/cell/save`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        matrixId, // REQUIRED BY BACKEND
        cells: changes,
      }),
    });

    const json = await res.json();

    if (json.success) {
      setCellColors((prev) => ({ ...prev, ...pending }));
      setPending({});
    }
  }

  if (!matrix) {
    return <div className={styles.loading}>Loading matrix...</div>;
  }

  /* ---------------- GENERATE DATES ---------------- */
  const start = dayjs(matrix.startDate);
  const end = dayjs(matrix.endDate);

  const dates: dayjs.Dayjs[] = [];
  for (let d = start; d.isBefore(end) || d.isSame(end); d = d.add(1, "day")) {
    dates.push(d);
  }

  /* ---------------- GENERATE TIME SLOTS ---------------- */
  const startTime = dayjs(`2025-01-01T${matrix.startTime}`);
  const endTime = dayjs(`2025-01-01T${matrix.endTime}`);

  const times: string[] = [];
  let t = startTime;

  while (t.isBefore(endTime)) {
    const next = t.add(matrix.interval, "minute");
    times.push(`${t.format("h A")} - ${next.format("h A")}`);
    t = next;
  }

  return (
    <>
      {/* SAVE BUTTON */}
      {Object.keys(pending).length > 0 && (
        <button className={styles.saveBtn} onClick={saveChanges}>
          Save Changes
        </button>
      )}

      <div
        className={styles.matrixGrid}
        style={{ gridTemplateColumns: `120px repeat(${dates.length}, 1fr)` }}
      >
        {/* Empty top-left corner */}
        <div className={`${styles.cell} ${styles.header}`} />

        {/* Dates row */}
        {dates.map((d, i) => (
          <div key={i} className={`${styles.cell} ${styles.header}`}>
            {d.format("DD MMM")}
          </div>
        ))}

        {/* Time rows + cells */}
        {times.map((label, r) => (
          <>
            <div
              key={`time-${r}`}
              className={`${styles.cell} ${styles.timeHeader}`}
            >
              {label}
            </div>

            {dates.map((_, c) => {
              const index = r * dates.length + c;
              const color =
                pending[index] ?? cellColors[index] ?? "transparent";

              return (
                <div
                  key={`cell-${r}-${c}`}
                  className={styles.cell}
                  style={{ backgroundColor: color }}
                  onClick={() => handleCellClick(index)}
                />
              );
            })}
          </>
        ))}
      </div>
    </>
  );
}
