"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAuthActions } from "./useAuthActions";

export function useAuth() {
  const { authCheckQuery } = useAuthActions();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    authLoading: authCheckQuery.isLoading,
  };
}
