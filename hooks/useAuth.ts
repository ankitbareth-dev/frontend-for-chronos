"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAuthActions } from "./useAuthActions";

/**
 * Runs on client pages that need the authenticated user.
 * Automatically syncs with the React Query auth check.
 */
export function useAuth() {
  // This triggers auth check once via React Query (already handled)
  useAuthActions().authCheckQuery;

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    isAuthenticated,
    user,
  };
}
