import type { ContactStatus, LeadStatus, ProjectType } from "./common.types";

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
  lead: ContactLead | null;
}

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

export interface ContactsResponse {
  status: "success";
  results: number;
  data: {
    contacts: Contact[];
  };
}

export interface ContactResponse {
  status: "success";
  data: {
    contact: Contact;
  };
}

export interface UpdateContactMutationVariables {
  id: string;
  payload: UpdateContactInput;
}
