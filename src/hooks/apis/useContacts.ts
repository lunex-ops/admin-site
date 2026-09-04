"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authenticatedApi } from "@/config/axiosConfig";
import {
  ContactResponse,
  ContactsResponse,
  CreateContactInput,
  UpdateContactMutationVariables,
} from "@/types/contact.types";
import { leadKeys } from "./useLeads";
import { spamKeys } from "./useSpams";

export const contactKeys = {
  all: ["contacts"] as const,
  lists: () => [...contactKeys.all, "list"] as const,
  list: () => [...contactKeys.lists()] as const,
  details: () => [...contactKeys.all, "detail"] as const,
  detail: (id: string) => [...contactKeys.details(), id] as const,
};

export const useContacts = () => {
  return useQuery<ContactsResponse>({
    queryKey: contactKeys.list(),
    queryFn: async () => {
      const { data } =
        await authenticatedApi.get<ContactsResponse>("/contacts");

      return data;
    },
  });
};

export const useContact = (id: string) => {
  return useQuery<ContactResponse>({
    queryKey: contactKeys.detail(id),
    queryFn: async () => {
      const { data } = await authenticatedApi.get<ContactResponse>(
        `/contacts/${id}`,
      );

      return data;
    },
    enabled: Boolean(id),
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation<ContactResponse, Error, CreateContactInput>({
    mutationFn: async (payload) => {
      const { data } = await authenticatedApi.post<ContactResponse>(
        "/contacts",
        payload,
      );

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: contactKeys.all,
      });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation<ContactResponse, Error, UpdateContactMutationVariables>({
    mutationFn: async ({ id, payload }) => {
      const { data } = await authenticatedApi.patch<ContactResponse>(
        `/contacts/${id}`,
        payload,
      );

      return data;
    },

    onSuccess: (response, variables) => {
      queryClient.setQueryData(contactKeys.detail(variables.id), response);

      queryClient.invalidateQueries({
        queryKey: contactKeys.all,
      });
    },
  });
};

export const useAcceptContact = () => {
  const queryClient = useQueryClient();

  return useMutation<ContactResponse, Error, string>({
    mutationFn: async (id) => {
      const { data } = await authenticatedApi.post<ContactResponse>(
        `/contacts/${id}/accept`,
      );

      return data;
    },

    onSuccess: (response, id) => {
      queryClient.setQueryData(contactKeys.detail(id), response);

      queryClient.invalidateQueries({
        queryKey: contactKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: leadKeys.all,
      });
    },
  });
};

export const useRejectContact = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ContactResponse,
    Error,
    {
      id: string;
      rejectionReason: string;
    }
  >({
    mutationFn: async ({ id, rejectionReason }) => {
      const { data } = await authenticatedApi.post<ContactResponse>(
        `/contacts/${id}/reject`,
        {
          rejectionReason,
        },
      );

      return data;
    },

    onSuccess: (response, variables) => {
      queryClient.setQueryData(contactKeys.detail(variables.id), response);

      queryClient.invalidateQueries({
        queryKey: contactKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: spamKeys.all,
      });
    },
  });
};
