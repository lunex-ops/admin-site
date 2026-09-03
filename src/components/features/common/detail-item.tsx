import { type ReactNode } from "react";

import { ExternalLink } from "lucide-react";

interface DetailItemProps {
  label: string;
  value: string | null | undefined;
  href?: string;
  icon?: ReactNode;
  external?: boolean;
}

export const DetailItem = ({
  label,
  value,
  href,
  icon,
  external = false,
}: DetailItemProps) => {
  const displayValue = value || "—";

  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </p>

      {href && value ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:underline"
        >
          {displayValue}

          {external && <ExternalLink className="size-3.5" />}
        </a>
      ) : (
        <p className="text-sm font-medium">{displayValue}</p>
      )}
    </div>
  );
};
