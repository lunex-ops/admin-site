import { Mail } from "lucide-react";

import {
  formatCurrency,
  formatDateTime,
  formatValue,
  getInitials,
  leadStatusStyles,
} from "@/lib/helpers";
import { RecentLead } from "@/types/dashboard.types";

type RecentLeadRowProps = {
  lead: RecentLead;
};

export const RecentLeadRow = ({ lead }: RecentLeadRowProps) => {
  return (
    <div className="flex items-center gap-4 p-5 transition-colors hover:bg-muted/30">
      {/* Avatar */}
      <div className="flex size-10 shrink-0 items-center justify-center bg-muted font-medium">
        {getInitials(lead.contact.name)}
      </div>

      {/* Lead / Contact Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium">{lead.contact.name}</p>

          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              leadStatusStyles[lead.status] ?? "bg-muted text-muted-foreground"
            }`}
          >
            {formatValue(lead.status)}
          </span>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Mail className="size-3" />
            {lead.contact.email}
          </span>

          <span>{lead.contact.company}</span>
        </div>
      </div>

      {/* Lead Details */}
      <div className="hidden text-right sm:block">
        <p className="text-xs font-medium">
          {formatCurrency(lead.estimatedValue)}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {lead.assignedTo?.name ?? "Unassigned"}
        </p>
      </div>

      {/* Created Date */}
      <div className="hidden text-right md:block">
        <p className="text-xs text-muted-foreground">Created</p>

        <p className="mt-1 text-xs font-medium">
          {formatDateTime(lead.createdAt)}
        </p>
      </div>
    </div>
  );
};
