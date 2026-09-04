import type { ContactStatus, LeadStatus, ProjectType } from "./common.types";

export interface LeadContact {
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
}

export interface LeadAssignedUser {
  id: string;
  username: string;
  name: string | null;
  email: string;
  photo: string | null;
}

export interface Lead {
  id: string;
  contactId: string;
  status: LeadStatus;
  assignedToId: string | null;
  estimatedValue: number | null;
  lastContactedAt: string | null;
  nextFollowUpAt: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;

  contact: LeadContact;
  assignedTo: LeadAssignedUser | null;
}

export interface UpdateLeadInput {
  status?: LeadStatus;
  assignedToId?: string | null;
  estimatedValue?: number | string | null;
  lastContactedAt?: string | Date | null;
  nextFollowUpAt?: string | Date | null;
  notes?: string | null;
}

export interface AssignLeadInput {
  assignedToId: string;
}

export interface LeadsResponse {
  status: "success";
  results: number;
  data: {
    leads: Lead[];
  };
}

export interface LeadResponse {
  status: "success";
  data: {
    lead: Lead;
  };
}

export interface LeadMutationResponse {
  status: "success";
  message?: string;
  data: {
    lead: Lead;
  };
}

export interface UpdateLeadMutationVariables {
  id: string;
  data: UpdateLeadInput;
}

export interface AssignLeadMutationVariables {
  id: string;
  data: AssignLeadInput;
}
