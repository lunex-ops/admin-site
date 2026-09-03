"use client";

import { PageError } from "@/components/features/common/page-error";
import { PageHeader } from "@/components/features/common/page-header";
import { PageHeaderLoader } from "@/components/features/common/page-header-loader";
import { LeadOverview } from "@/components/features/dashboard/lead-overview";
import { OverviewCards } from "@/components/features/dashboard/overview-cards";
import { RecentContacts } from "@/components/features/dashboard/recent-contacts";
import { RecentLeads } from "@/components/features/dashboard/recent-leads";
import { useDashboard } from "@/hooks/apis/useDashboard";

const DashboardPage = () => {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return <PageHeaderLoader title="Workspace" pageName="Dashboard" />;
  }

  const dashboard = data?.data;
  const overview = dashboard?.overview;

  if (isError || !overview) {
    return <PageError />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Workspace"
        pageName="Dashboard"
        subTitle="Welcome back. Here's an overview of your operations."
      />

      <OverviewCards overview={overview} />

      <div className="grid gap-6 lg:grid-cols-3">
        <RecentContacts contacts={dashboard.recentContacts ?? []} />

        <LeadOverview overview={overview} />
      </div>

      <RecentLeads leads={dashboard.recentLeads ?? []} />
    </div>
  );
};

export default DashboardPage;
