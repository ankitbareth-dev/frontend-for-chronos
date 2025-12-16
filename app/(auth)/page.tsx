"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./Auth.module.sass";

declare global {
  interface Window {
    google: any;
  }
}

export default function AuthPage() {
  const router = useRouter();
  const googleBtnRef = useRef<HTMLDivElement>(null);

  // ✅ MUST be Web Application OAuth Client ID
  const GOOGLE_CLIENT_ID =
    "558595622068-oibtpvf2mtvu0o34hdl8fkgls8hkd7jd.apps.googleusercontent.com";

  useEffect(() => {
    // Prevent loading script multiple times
    if (document.getElementById("google-sdk")) return;

    const script = document.createElement("script");
    script.id = "google-sdk";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (!window.google || !googleBtnRef.current) {
        console.error("Google SDK not available");
        return;
      }

      // ✅ Initialize Google Identity Services
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          try {
            const res = await fetch("http://localhost:5000/api/auth/google", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                idToken: response.credential,
              }),
            });

            const data = await res.json();
            if (!res.ok) {
              throw new Error(data.message || "Google login failed");
            }

            router.push("/dashboard");
          } catch (err: any) {
            alert(err.message);
          }
        },
      });

      // ✅ Render OFFICIAL Google button
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        width: 320,
      });
    };

    document.body.appendChild(script);
  }, [router]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome to Chronos</h1>
        <p className={styles.subtitle}>
          Sign in securely with your Google account
        </p>

        {/* ✅ Google renders button here */}
        <div ref={googleBtnRef} />
      </div>
    </div>
  );
}
