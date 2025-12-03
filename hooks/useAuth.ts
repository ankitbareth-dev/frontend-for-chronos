"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { checkAuth } from "../store/slices/authSlice";
import { useRouter } from "next/navigation";

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    // redirect based on auth state
    if (!loading) {
      if (isAuthenticated && window.location.pathname.startsWith("/auth")) {
        router.push("/dashboard");
      } else if (
        !isAuthenticated &&
        window.location.pathname.startsWith("/dashboard")
      ) {
        router.push("/auth");
      }
    }
  }, [isAuthenticated, loading, router]);
}
