"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authenticatedApi } from "@/config/axiosConfig";

import type {
  DeleteSpamResponse,
  SpamResponse,
  SpamsResponse,
} from "@/types/spam.types";

export const spamKeys = {
  all: ["spams"] as const,
  lists: () => [...spamKeys.all, "list"] as const,
  list: () => [...spamKeys.lists()] as const,
  details: () => [...spamKeys.all, "detail"] as const,
  detail: (id: string) => [...spamKeys.details(), id] as const,
};

export const useSpams = () => {
  return useQuery<SpamsResponse>({
    queryKey: spamKeys.list(),
    queryFn: async () => {
      const { data } = await authenticatedApi.get<SpamsResponse>("/spams");

      return data;
    },
  });
};

export const useSpam = (id: string) => {
  return useQuery<SpamResponse>({
    queryKey: spamKeys.detail(id),
    queryFn: async () => {
      const { data } = await authenticatedApi.get<SpamResponse>(`/spams/${id}`);

      return data;
    },
    enabled: Boolean(id),
  });
};

export const useRestoreSpam = () => {
  const queryClient = useQueryClient();

  return useMutation<SpamResponse, Error, string>({
    mutationFn: async (id) => {
      const { data } = await authenticatedApi.post<SpamResponse>(
        `/spams/${id}/restore`,
      );

      return data;
    },

    onSuccess: (response, id) => {
      queryClient.setQueryData(spamKeys.detail(id), response);

      queryClient.invalidateQueries({
        queryKey: spamKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },
  });
};

export const useDeleteSpam = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteSpamResponse, Error, string>({
    mutationFn: async (id) => {
      const { data } = await authenticatedApi.delete<DeleteSpamResponse>(
        `/spams/${id}`,
      );

      return data;
    },

    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: spamKeys.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: spamKeys.all,
      });
    },
  });
};
