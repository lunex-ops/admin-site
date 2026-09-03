import { Clock3, ContactRound, UserRoundPlus, IndianRupee } from "lucide-react";

import { formatCurrency } from "@/lib/helpers";

import { OverviewCard } from "./overview-card";

type Overview = {
  contacts: {
    total: number;
    new: number;
  };
  leads: {
    total: number;
    unassigned: number;
    followUpsDue: number;
  };
  pipeline: {
    estimatedValue: number;
  };
};

type OverviewCardsProps = {
  overview: Overview;
};

export const OverviewCards = ({ overview }: OverviewCardsProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <OverviewCard
        icon={ContactRound}
        label="Total Contacts"
        value={overview.contacts.total}
        meta={`${overview.contacts.new} new`}
      />

      <OverviewCard
        icon={UserRoundPlus}
        label="Total Leads"
        value={overview.leads.total}
        meta={`${overview.leads.unassigned} unassigned`}
      />

      <OverviewCard
        icon={Clock3}
        label="Follow-ups Due"
        value={overview.leads.followUpsDue}
        meta={overview.leads.followUpsDue > 0 ? "Due" : undefined}
        metaClassName="text-orange-600"
      />

      <OverviewCard
        icon={IndianRupee}
        label="Pipeline Value"
        value={formatCurrency(overview.pipeline.estimatedValue)}
        meta="Estimated"
      />
    </div>
  );
};
