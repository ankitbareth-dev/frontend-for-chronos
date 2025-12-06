"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Auth.module.sass";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { useAuthActions } from "@/hooks/useAuthActions";

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginMutation, signupMutation } = useAuthActions();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Redirect to dashboard when authenticated
  useEffect(() => {
    if (isAuthenticated) router.push("/dashboard");
  }, [isAuthenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "login") {
      loginMutation.mutate({ email, password });
    } else {
      signupMutation.mutate(
        { name, email, password },
        {
          onSuccess: () => setMode("login"),
        }
      );
    }
  };

  const loading = loginMutation.isPending || signupMutation.isPending;

  const error = loginMutation.error?.message || signupMutation.error?.message;

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
              type="email"
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
