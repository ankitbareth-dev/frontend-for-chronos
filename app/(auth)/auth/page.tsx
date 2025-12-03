"use client";

import { useState } from "react";
import styles from "./Auth.module.sass";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>

        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
          {mode === "signup" && (
            <div className={styles.inputGroup}>
              <label>Name</label>
              <input type="text" placeholder="Enter your name" required />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          <button className={styles.actionBtn}>
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className={styles.switchText}>
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setMode("signup")}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setMode("login")}>Login</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
