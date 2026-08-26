"use client";

import { authenticatedApi } from "@/config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  website: string | null;
  projectType: string;
  budget: string | null;
  timeline: string | null;
  projectDetails: string | null;
  referral: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactInput {
  name: string;
  company: string;
  email: string;
  website?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  projectDetails?: string;
  referral?: string;
}

export type UpdateContactInput = CreateContactInput;

interface ContactsResponse {
  status: "success";
  results: number;
  data: Contact[];
}

interface ContactResponse {
  status: "success";
  data: Contact;
}

interface DeleteContactResponse {
  status: "success";
  message: string;
}

/* -------------------------------------------------------------------------- */
/*                              Get Contacts                                  */
/* -------------------------------------------------------------------------- */

export const useContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async (): Promise<ContactsResponse> => {
      const { data } =
        await authenticatedApi.get<ContactsResponse>("/contacts");

      return data;
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                            Get Contact By ID                                */
/* -------------------------------------------------------------------------- */

export const useContact = (id: string) => {
  return useQuery({
    queryKey: ["contacts", id],
    queryFn: async (): Promise<ContactResponse> => {
      const { data } = await authenticatedApi.get<ContactResponse>(
        `/contacts/${id}`,
      );

      return data;
    },
    enabled: Boolean(id),
  });
};

/* -------------------------------------------------------------------------- */
/*                             Create Contact                                 */
/* -------------------------------------------------------------------------- */

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: CreateContactInput,
    ): Promise<ContactResponse> => {
      const { data } = await authenticatedApi.post<ContactResponse>(
        "/contacts",
        payload,
      );

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                             Update Contact                                 */
/* -------------------------------------------------------------------------- */

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateContactInput;
    }): Promise<ContactResponse> => {
      const { data } = await authenticatedApi.patch<ContactResponse>(
        `/contacts/${id}`,
        payload,
      );

      return data;
    },

    onSuccess: (response, variables) => {
      queryClient.setQueryData(["contacts", variables.id], response);

      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                             Delete Contact                                 */
/* -------------------------------------------------------------------------- */

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<DeleteContactResponse> => {
      const { data } = await authenticatedApi.delete<DeleteContactResponse>(
        `/contacts/${id}`,
      );

      return data;
    },

    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: ["contacts", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },
  });
};
