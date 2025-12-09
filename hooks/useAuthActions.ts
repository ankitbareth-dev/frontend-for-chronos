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

  const authCheckQuery = useQuery({
    queryKey: ["auth-user"],
    queryFn: authCheckApi,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

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

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (user: AuthUser) => {
      dispatch(setUser(user));
    },
  });

  const signupMutation = useMutation({
    mutationFn: signupApi,
    onSuccess: (user: AuthUser) => {
      dispatch(setUser(user));
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      dispatch(clearUser());
    },
  });

  return { authCheckQuery, loginMutation, signupMutation, logoutMutation };
}
