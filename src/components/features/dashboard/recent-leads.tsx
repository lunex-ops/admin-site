import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

import { RecentLeadRow } from "./recent-lead-row";
import { RecentLead } from "@/types/dashboard.types";

type RecentLeadsProps = {
  leads: RecentLead[];
};

export const RecentLeads = ({ leads }: RecentLeadsProps) => {
  return (
    <div className="border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h2 className="font-medium">Recent Leads</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Latest leads added to your pipeline
          </p>
        </div>

        <Link
          href="/leads"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      {/* Leads */}
      {leads.length > 0 ? (
        <div className="divide-y divide-border">
          {leads.map((lead) => (
            <RecentLeadRow key={lead.id} lead={lead} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-40 flex-col items-center justify-center p-5 text-center">
          <BriefcaseBusiness className="size-8 text-muted-foreground/50" />

          <p className="mt-3 text-sm font-medium">No leads yet</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Leads will appear here once they are added.
          </p>
        </div>
      )}
    </div>
  );
};
