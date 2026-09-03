import { ArrowUpRight, ContactRound } from "lucide-react";
import Link from "next/link";

import { RecentContactRow } from "./recent-contact-row";

type Contact = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: string;
  projectType: string;
  createdAt: string;
};

type RecentContactsProps = {
  contacts: Contact[];
};

export const RecentContacts = ({ contacts }: RecentContactsProps) => {
  return (
    <div className="border border-border bg-card lg:col-span-2">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h2 className="font-medium">Recent Contacts</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Latest contacts added to your workspace
          </p>
        </div>

        <Link
          href="/contacts"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      {contacts.length > 0 ? (
        <div className="divide-y divide-border">
          {contacts.map((contact) => (
            <RecentContactRow key={contact.id} contact={contact} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-48 flex-col items-center justify-center p-5 text-center">
          <ContactRound className="size-8 text-muted-foreground/50" />

          <p className="mt-3 text-sm font-medium">No contacts yet</p>

          <p className="mt-1 text-xs text-muted-foreground">
            New contacts will appear here.
          </p>
        </div>
      )}
    </div>
  );
};
