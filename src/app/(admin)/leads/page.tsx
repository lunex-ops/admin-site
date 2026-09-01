"use client";

import { LeadsTable } from "@/components/tables/leads-table";

import { useLeads } from "@/hooks/apis/useLeads";

const LeadsPage = () => {
  const { data, isLoading, isError } = useLeads();

  const leads = data?.data?.leads ?? [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Workspace
        </p>

        <h1 className="text-3xl font-semibold tracking-tight">Leads</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage and track leads converted from your website contacts.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          <div className="h-14 animate-pulse border border-border bg-muted/30" />

          <div className="border border-border bg-card">
            <div className="divide-y divide-border">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-16 animate-pulse bg-muted/20" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="flex min-h-48 flex-col items-center justify-center border border-border bg-card p-6 text-center">
          <p className="text-sm font-medium">Unable to load leads</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Please try refreshing the page.
          </p>
        </div>
      )}

      {/* Leads */}
      {!isLoading && !isError && <LeadsTable data={leads} />}
    </div>
  );
};

export default LeadsPage;
