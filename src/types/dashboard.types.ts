import type { ContactStatus, LeadStatus } from "./common.types";

export interface DashboardContactsOverview {
  total: number;
  new: number;
  spam: number;
}

export interface DashboardLeadsOverview {
  total: number;
  won: number;
  lost: number;
  unassigned: number;
  followUpsDue: number;
}

export interface DashboardPipelineOverview {
  estimatedValue: number;
}

export interface DashboardOverview {
  contacts: DashboardContactsOverview;
  leads: DashboardLeadsOverview;
  pipeline: DashboardPipelineOverview;
}

export interface RecentContact {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  status: ContactStatus;
  createdAt: string;
}

export interface RecentLeadContact {
  id: string;
  name: string;
  email: string;
  company: string;
}

export interface AssignedUser {
  id: string;
  name: string;
}

export interface RecentLead {
  id: string;
  status: LeadStatus;
  estimatedValue: number | null;
  nextFollowUpAt: string | null;
  createdAt: string;
  contact: RecentLeadContact;
  assignedTo: AssignedUser | null;
}

export interface DashboardResponse {
  status: "success";
  data: {
    overview: DashboardOverview;
    recentContacts: RecentContact[];
    recentLeads: RecentLead[];
  };
}
