"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  // AUTH CHECK (runs on mount)
  // -------------------------
  const authCheckQuery = useQuery({
    queryKey: ["auth-user"],
    queryFn: authCheckApi,
    retry: false,
    staleTime: Infinity,
  });

  // Update Redux when data or error changes
  useEffect(() => {
    if (authCheckQuery.data) {
      dispatch(setUser(authCheckQuery.data));
    }
  }, [authCheckQuery.data, dispatch]);

  useEffect(() => {
    if (authCheckQuery.error) {
      dispatch(clearUser());
    }
  }, [authCheckQuery.error, dispatch]);

  // -------------------------
  // LOGIN
  // -------------------------
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (user: AuthUser) => {
      dispatch(setUser(user));
    },
  });

  // -------------------------
  // SIGNUP
  // -------------------------
  const signupMutation = useMutation({
    mutationFn: signupApi,
    onSuccess: (user: AuthUser) => {
      dispatch(setUser(user));
    },
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

  return { authCheckQuery, loginMutation, signupMutation, logoutMutation };
}
