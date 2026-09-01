"use client";

import { useQuery } from "@tanstack/react-query";

import { authenticatedApi } from "@/config/axiosConfig";

import type { DashboardResponse } from "@/types/dashboard.types";

export const dashboardKeys = {
  all: ["dashboards"] as const,
};

export const useDashboard = () => {
  return useQuery<DashboardResponse>({
    queryKey: dashboardKeys.all,
    queryFn: async () => {
      const { data } =
        await authenticatedApi.get<DashboardResponse>("/dashboards");

      return data;
    },
  });
};
