"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserMatricesApi, createMatrixApi } from "@/lib/api/matricesApi";

export function useMatricesActions() {
  const matricesQuery = useQuery({
    queryKey: ["user-metrics"],
    queryFn: getUserMatricesApi,
  });

  const createMatrixMutation = useMutation({
    mutationFn: createMatrixApi,
  });

  return { matricesQuery, createMatrixMutation };
}
