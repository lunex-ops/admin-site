"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authenticatedApi } from "@/config/axiosConfig";

import type {
  AssignLeadMutationVariables,
  LeadMutationResponse,
  LeadResponse,
  LeadsResponse,
  UpdateLeadMutationVariables,
} from "@/types/lead.types";

export const leadKeys = {
  all: ["leads"] as const,
  lists: () => [...leadKeys.all, "list"] as const,
  list: () => [...leadKeys.lists()] as const,
  details: () => [...leadKeys.all, "detail"] as const,
  detail: (id: string) => [...leadKeys.details(), id] as const,
};

export const useLeads = () => {
  return useQuery<LeadsResponse>({
    queryKey: leadKeys.list(),
    queryFn: async () => {
      const { data } = await authenticatedApi.get<LeadsResponse>("/leads");

      return data;
    },
  });
};

export const useLead = (id: string) => {
  return useQuery<LeadResponse>({
    queryKey: leadKeys.detail(id),
    queryFn: async () => {
      const { data } = await authenticatedApi.get<LeadResponse>(`/leads/${id}`);

      return data;
    },
    enabled: Boolean(id),
  });
};

export const useUpdateLead = () => {
  const queryClient = useQueryClient();

  return useMutation<LeadMutationResponse, Error, UpdateLeadMutationVariables>({
    mutationFn: async ({ id, data }) => {
      const { data: response } =
        await authenticatedApi.patch<LeadMutationResponse>(
          `/leads/${id}`,
          data,
        );

      return response;
    },

    onSuccess: (response, variables) => {
      queryClient.setQueryData(leadKeys.detail(variables.id), {
        status: response.status,
        data: {
          lead: response.data.lead,
        },
      } satisfies LeadResponse);

      queryClient.invalidateQueries({
        queryKey: leadKeys.lists(),
      });
    },
  });
};

export const useAssignLead = () => {
  const queryClient = useQueryClient();

  return useMutation<LeadMutationResponse, Error, AssignLeadMutationVariables>({
    mutationFn: async ({ id, data }) => {
      const { data: response } =
        await authenticatedApi.patch<LeadMutationResponse>(
          `/leads/${id}/assign`,
          data,
        );

      return response;
    },

    onSuccess: (response, variables) => {
      queryClient.setQueryData(leadKeys.detail(variables.id), {
        status: response.status,
        data: {
          lead: response.data.lead,
        },
      } satisfies LeadResponse);

      queryClient.invalidateQueries({
        queryKey: leadKeys.lists(),
      });
    },
  });
};

export const useUnassignLead = () => {
  const queryClient = useQueryClient();

  return useMutation<LeadMutationResponse, Error, string>({
    mutationFn: async (id) => {
      const { data: response } =
        await authenticatedApi.patch<LeadMutationResponse>(
          `/leads/${id}/unassign`,
        );

      return response;
    },

    onSuccess: (response, id) => {
      queryClient.setQueryData(leadKeys.detail(id), {
        status: response.status,
        data: {
          lead: response.data.lead,
        },
      } satisfies LeadResponse);

      queryClient.invalidateQueries({
        queryKey: leadKeys.lists(),
      });
    },
  });
};

export const useDeleteLead = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await authenticatedApi.delete(`/leads/${id}`);
    },

    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: leadKeys.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: leadKeys.lists(),
      });
    },
  });
};
