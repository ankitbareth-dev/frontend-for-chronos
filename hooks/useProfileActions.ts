"use client";

import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import { updateProfileApi, UpdateProfilePayload } from "@/lib/api/profile";

export function useProfileActions() {
  const dispatch = useDispatch();

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfilePayload) => updateProfileApi(data),
    onSuccess: (user) => {
      dispatch(setUser(user));
    },
  });

  return { updateProfileMutation };
}
