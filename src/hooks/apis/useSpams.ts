"use client";

import { authenticatedApi } from "@/config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Contact } from "./useContacts";

/* -------------------------------------------------------------------------- */
/*                                Responses                                   */
/* -------------------------------------------------------------------------- */

interface SpamsResponse {
  status: "success";
  results: number;
  data: {
    contacts: Contact[];
  };
}

interface SpamResponse {
  status: "success";
  data: {
    contact: Contact;
  };
}

interface DeleteSpamResponse {
  status: "success";
  message: string;
}

/* -------------------------------------------------------------------------- */
/*                                Get Spams                                   */
/* -------------------------------------------------------------------------- */

export const useSpams = () => {
  return useQuery({
    queryKey: ["spams"],
    queryFn: async (): Promise<SpamsResponse> => {
      const { data } = await authenticatedApi.get<SpamsResponse>("/spams");

      return data;
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                             Get Spam By ID                                 */
/* -------------------------------------------------------------------------- */

export const useSpam = (id: string) => {
  return useQuery({
    queryKey: ["spams", id],
    queryFn: async (): Promise<SpamResponse> => {
      const { data } = await authenticatedApi.get<SpamResponse>(`/spams/${id}`);

      return data;
    },
    enabled: Boolean(id),
  });
};

/* -------------------------------------------------------------------------- */
/*                              Restore Spam                                  */
/* -------------------------------------------------------------------------- */

export const useRestoreSpam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<SpamResponse> => {
      const { data } = await authenticatedApi.post<SpamResponse>(
        `/spams/${id}/restore`,
      );

      return data;
    },

    onSuccess: (response, id) => {
      queryClient.setQueryData(["spams", id], response);

      queryClient.invalidateQueries({
        queryKey: ["spams"],
      });

      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                              Delete Spam                                   */
/* -------------------------------------------------------------------------- */

export const useDeleteSpam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<DeleteSpamResponse> => {
      const { data } = await authenticatedApi.delete<DeleteSpamResponse>(
        `/spams/${id}`,
      );

      return data;
    },

    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: ["spams", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["spams"],
      });
    },
  });
};
