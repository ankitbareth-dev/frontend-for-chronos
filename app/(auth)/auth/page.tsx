"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Auth.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { login, signup } from "@/store/slices/authSlice";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "login") {
      dispatch(login({ email, password }));
    } else {
      dispatch(signup({ name, email, password }));
      setMode("login");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === "signup" && (
            <div className={styles.inputGroup}>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className={styles.actionBtn} disabled={loading}>
            {loading
              ? mode === "login"
                ? "Logging in..."
                : "Signing up..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </button>

          {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
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
