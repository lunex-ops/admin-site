"use client";

import { ContactsTable } from "@/components/contacts/contacts-table";
import { useContacts } from "@/hooks/apis/useContacts";

const ContactsPage = () => {
  const { data, isLoading, isError } = useContacts();

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Workspace
        </p>

        <h1 className="text-3xl font-semibold">Contacts</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage your contacts.
        </p>
      </div>

      {isLoading && (
        <div className="border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Loading contacts...</p>
        </div>
      )}

      {isError && (
        <div className="border border-danger/30 bg-card p-6">
          <p className="text-sm text-danger">Failed to load contacts.</p>
        </div>
      )}

      {!isLoading && !isError && (
        <ContactsTable data={data?.data?.contacts ?? []} />
      )}
    </div>
  );
};

export default ContactsPage;
