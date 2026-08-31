"use client";

import { authenticatedApi } from "@/config/axiosConfig";
import { useQuery } from "@tanstack/react-query";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

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

export type ContactStatus = "NEW" | string;

export interface RecentContact {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  status: ContactStatus;
  createdAt: string;
}

export interface RecentLead {
  id: string;
  name: string;
  email: string;
  company: string;
  status: string;
  createdAt: string;
}

export interface DashboardResponse {
  status: "success";
  data: {
    overview: DashboardOverview;
    recentContacts: RecentContact[];
    recentLeads: RecentLead[];
  };
}

/* -------------------------------------------------------------------------- */
/*                              Get Dashboard                                 */
/* -------------------------------------------------------------------------- */

export const useDashboards = () => {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboards"],
    queryFn: async () => {
      const { data } =
        await authenticatedApi.get<DashboardResponse>("/dashboards");

      return data;
    },
  });
};
