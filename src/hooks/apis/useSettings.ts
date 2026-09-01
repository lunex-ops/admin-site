"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authenticatedApi } from "@/config/axiosConfig";

import type {
  SettingsResponse,
  UpdateSettingsInput,
} from "@/types/settings.types";

export const settingsKeys = {
  all: ["settings"] as const,
};

export const useSettings = () => {
  return useQuery<SettingsResponse>({
    queryKey: settingsKeys.all,
    queryFn: async () => {
      const { data } =
        await authenticatedApi.get<SettingsResponse>("/settings");

      return data;
    },
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation<SettingsResponse, Error, UpdateSettingsInput>({
    mutationFn: async (payload) => {
      const { data } = await authenticatedApi.patch<SettingsResponse>(
        "/settings",
        payload,
      );

      return data;
    },

    onSuccess: (response) => {
      queryClient.setQueryData(settingsKeys.all, response);
    },
  });
};
