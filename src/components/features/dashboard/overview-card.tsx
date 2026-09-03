import { LucideIcon } from "lucide-react";

type OverviewCardProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  meta?: string;
  metaClassName?: string;
};

export const OverviewCard = ({
  icon: Icon,
  label,
  value,
  meta,
  metaClassName = "text-muted-foreground",
}: OverviewCardProps) => {
  return (
    <div className="border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div className="flex size-9 items-center justify-center bg-muted">
          <Icon className="size-4" />
        </div>

        {meta && <span className={`text-xs ${metaClassName}`}>{meta}</span>}
      </div>

      <p className="mt-5 text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 font-headline text-3xl font-semibold">{value}</p>
    </div>
  );
};
