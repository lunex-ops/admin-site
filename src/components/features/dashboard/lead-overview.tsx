import {
  CircleAlert,
  CircleCheck,
  Clock3,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";

type Overview = {
  contacts: {
    total: number;
    new: number;
    spam: number;
  };
  leads: {
    total: number;
    won: number;
    lost: number;
    unassigned: number;
    followUpsDue: number;
  };
};

type LeadOverviewProps = {
  overview: Overview;
};

const stats = [
  {
    key: "total",
    label: "Total Leads",
    icon: UsersRound,
    className: "bg-muted",
  },
  {
    key: "won",
    label: "Won",
    icon: CircleCheck,
    className: "bg-green-500/10 text-green-600",
  },
  {
    key: "lost",
    label: "Lost",
    icon: CircleAlert,
    className: "bg-red-500/10 text-red-600",
  },
  {
    key: "unassigned",
    label: "Unassigned",
    icon: UserRoundPlus,
    className: "bg-yellow-500/10 text-yellow-600",
  },
  {
    key: "followUpsDue",
    label: "Follow-ups Due",
    icon: Clock3,
    className: "bg-orange-500/10 text-orange-600",
  },
] as const;

export const LeadOverview = ({ overview }: LeadOverviewProps) => {
  return (
    <div className="border border-border bg-card">
      <div className="border-b border-border p-5">
        <h2 className="font-medium">Lead Overview</h2>

        <p className="mt-1 text-xs text-muted-foreground">
          Current lead pipeline status
        </p>
      </div>

      <div className="space-y-1 p-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const value = overview.leads[stat.key];

          return (
            <div
              key={stat.key}
              className="flex items-center justify-between p-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-8 items-center justify-center ${stat.className}`}
                >
                  <Icon className="size-4" />
                </div>

                <span className="text-sm">{stat.label}</span>
              </div>

              <span className="font-medium">{value}</span>
            </div>
          );
        })}
      </div>

      <div className="mx-5 border-t border-border py-5">
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Contact Status
        </p>

        <div className="space-y-3">
          <ContactStat label="Total" value={overview.contacts.total} />

          <ContactStat
            label="New"
            value={overview.contacts.new}
            valueClassName="text-blue-600"
          />

          <ContactStat
            label="Spam"
            value={overview.contacts.spam}
            valueClassName="text-red-600"
          />
        </div>
      </div>
    </div>
  );
};

type ContactStatProps = {
  label: string;
  value: number;
  valueClassName?: string;
};

const ContactStat = ({
  label,
  value,
  valueClassName = "text-foreground",
}: ContactStatProps) => {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>

      <span className={`font-medium ${valueClassName}`}>{value}</span>
    </div>
  );
};
