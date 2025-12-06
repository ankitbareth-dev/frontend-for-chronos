"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/store/slices/authSlice";

import {
  loginApi,
  signupApi,
  logoutApi,
  authCheckApi,
  type AuthUser,
} from "@/lib/api/auth";

export function useAuthActions() {
  const dispatch = useDispatch();

  // -------------------------
  // AUTH CHECK (auto on mount)
  // -------------------------
  const authCheckQuery = useQuery<AuthUser>({
    queryKey: ["auth-user"],
    queryFn: authCheckApi,
    retry: false,
    staleTime: Infinity,
    onSuccess: (user) => {
      dispatch(setUser(user));
    },
    onError: () => {
      dispatch(clearUser());
    },
  });

  // -------------------------
  // LOGIN
  // -------------------------
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      dispatch(setUser(user));
    },
  });

  // -------------------------
  // SIGNUP
  // -------------------------
  const signupMutation = useMutation({
    mutationFn: signupApi,
  });

  // -------------------------
  // LOGOUT
  // -------------------------
  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      dispatch(clearUser());
    },
  });

  return {
    authCheckQuery,
    loginMutation,
    signupMutation,
    logoutMutation,
  };
}
