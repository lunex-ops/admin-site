import { Mail } from "lucide-react";

import { formatDate, formatValue, leadStatusStyles } from "@/lib/helpers";

type Contact = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: string;
  projectType: string;
  createdAt: string;
};

type RecentContactRowProps = {
  contact: Contact;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export const RecentContactRow = ({ contact }: RecentContactRowProps) => {
  return (
    <div className="flex items-center gap-4 p-5 transition-colors hover:bg-muted/30">
      <div className="flex size-10 shrink-0 items-center justify-center bg-muted font-medium">
        {getInitials(contact.name)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium">{contact.name}</p>

          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              leadStatusStyles[contact.status] ??
              "bg-muted text-muted-foreground"
            }`}
          >
            {formatValue(contact.status)}
          </span>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Mail className="size-3" />
            {contact.email}
          </span>

          <span>{contact.company}</span>
        </div>
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-xs font-medium">
          {formatValue(contact.projectType)}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {formatDate(contact.createdAt)}
        </p>
      </div>
    </div>
  );
};
