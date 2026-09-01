"use client";

import { authenticatedApi } from "@/config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type ContactStatus = "NEW" | "CONVERTED" | "SPAM";

export type ProjectType =
  | "WEBSITE"
  | "WEB_APPLICATION"
  | "SAAS_MVP"
  | "EXISTING_PRODUCT"
  | "ONGOING_DEVELOPMENT"
  | "NOT_SURE";

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL"
  | "WON"
  | "LOST";

/* -------------------------------------------------------------------------- */
/*                                  Lead Type                                 */
/* -------------------------------------------------------------------------- */

export interface ContactLead {
  id: string;
  contactId: string;

  status: LeadStatus;

  assignedToId: string | null;

  estimatedValue: number | string | null;

  lastContactedAt: string | null;
  nextFollowUpAt: string | null;

  notes: string | null;

  createdAt: string;
  updatedAt: string;
}

/* -------------------------------------------------------------------------- */
/*                                Contact Type                                */
/* -------------------------------------------------------------------------- */

export interface Contact {
  id: string;

  name: string;
  email: string;
  phone: string | null;

  company: string | null;
  website: string | null;
  industry: string | null;

  projectType: ProjectType;

  budget: string | null;
  timeline: string | null;
  projectDetails: string;

  referral: string | null;

  status: ContactStatus;

  rejectionReason: string | null;
  rejectedAt: string | null;

  createdAt: string;
  updatedAt: string;

  /**
   * A contact may or may not have been converted into a lead.
   */
  lead: ContactLead | null;
}

/* -------------------------------------------------------------------------- */
/*                              Create Contact                                */
/* -------------------------------------------------------------------------- */

export interface CreateContactInput {
  name: string;
  email: string;

  phone?: string;

  company?: string;
  website?: string;
  industry?: string;

  projectType?: ProjectType;

  budget?: string;
  timeline?: string;
  projectDetails: string;

  referral?: string;
}

/* -------------------------------------------------------------------------- */
/*                              Update Contact                                */
/* -------------------------------------------------------------------------- */

export interface UpdateContactInput {
  name?: string;
  email?: string;

  phone?: string | null;

  company?: string | null;
  website?: string | null;
  industry?: string | null;

  projectType?: ProjectType;

  budget?: string | null;
  timeline?: string | null;
  projectDetails?: string;

  referral?: string | null;

  status?: ContactStatus;
  rejectionReason?: string | null;
}

/* -------------------------------------------------------------------------- */
/*                                Responses                                   */
/* -------------------------------------------------------------------------- */

interface ContactsResponse {
  status: "success";
  results: number;
  data: {
    contacts: Contact[];
  };
}

interface ContactResponse {
  status: "success";
  data: {
    contact: Contact;
  };
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
/*                           Get Contact By ID                                */
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
/*                              Create Contact                                */
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
/*                              Update Contact                                */
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
/*                              Accept Contact                                */
/* -------------------------------------------------------------------------- */

export const useAcceptContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<ContactResponse> => {
      const { data } = await authenticatedApi.post<ContactResponse>(
        `/contacts/${id}/accept`,
      );

      return data;
    },

    onSuccess: (response, id) => {
      queryClient.setQueryData(["contacts", id], response);

      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                              Reject Contact                                */
/* -------------------------------------------------------------------------- */

export const useRejectContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      rejectionReason,
    }: {
      id: string;
      rejectionReason: string;
    }): Promise<ContactResponse> => {
      const { data } = await authenticatedApi.post<ContactResponse>(
        `/contacts/${id}/reject`,
        {
          rejectionReason,
        },
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
