"use client";

import { PageError } from "@/components/features/common/page-error";
import { PageHeader } from "@/components/features/common/page-header";
import { PageHeaderLoader } from "@/components/features/common/page-header-loader";
import { LeadsTable } from "@/components/tables/leads-table";

import { useLeads } from "@/hooks/apis/useLeads";

const LeadsPage = () => {
  const { data, isLoading, isError } = useLeads();

  const leads = data?.data?.leads ?? [];

  if (isLoading) {
    return <PageHeaderLoader title="Workspace" pageName="Leads" />;
  }

  if (isError) {
    return <PageError />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Workspace"
        pageName="Leads"
        subTitle="Manage and track leads converted from your website contacts."
      />

      {!isLoading && !isError && <LeadsTable data={leads} />}
    </div>
  );
};

export default LeadsPage;
