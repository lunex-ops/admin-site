"use client";

import { authenticatedApi } from "@/config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface Settings {
  id: string;
  agencyName: string | null;
  agencyEmail: string | null;
  agencyPhone: string | null;
  websiteUrl: string | null;
  timezone: string;
  currency: string;
}

/* -------------------------------------------------------------------------- */
/*                              Update Settings                               */
/* -------------------------------------------------------------------------- */

export interface UpdateSettingsInput {
  agencyName?: string | null;
  agencyEmail?: string | null;
  agencyPhone?: string | null;
  websiteUrl?: string | null;
  timezone?: string;
  currency?: string;
}

/* -------------------------------------------------------------------------- */
/*                                Responses                                   */
/* -------------------------------------------------------------------------- */

export interface SettingsResponse {
  status: "success";
  data: {
    settings: Settings;
  };
}

/* -------------------------------------------------------------------------- */
/*                              Get Settings                                  */
/* -------------------------------------------------------------------------- */

export const useSettings = () => {
  return useQuery<SettingsResponse>({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data } =
        await authenticatedApi.get<SettingsResponse>("/settings");

      return data;
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                             Update Settings                                */
/* -------------------------------------------------------------------------- */

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: UpdateSettingsInput,
    ): Promise<SettingsResponse> => {
      const { data } = await authenticatedApi.patch<SettingsResponse>(
        "/settings",
        payload,
      );

      return data;
    },

    onSuccess: (response) => {
      queryClient.setQueryData(["settings"], response);

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });
};
