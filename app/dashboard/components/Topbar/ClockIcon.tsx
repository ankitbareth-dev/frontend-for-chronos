"use client";

import styles from "./Topbar.module.sass";

export default function ClockIcon() {
  return (
    <div className={styles.clockWrap}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
      >
        {/* Circle */}
        <circle cx="50" cy="50" r="40" />

        {/* Hour hand */}
        <line x1="50" y1="50" x2="50" y2="30" className={styles.hourHand} />

        {/* Minute hand */}
        <line x1="50" y1="50" x2="70" y2="50" className={styles.minuteHand} />

        {/* Second hand */}
        <line x1="50" y1="50" x2="50" y2="20" className={styles.secondHand} />
      </svg>
    </div>
  );
}
