"use client";
import { useAuth } from "@/hooks/useAuth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuth(); // auto-check auth and redirect if needed

  return <div>{children}</div>;
}
