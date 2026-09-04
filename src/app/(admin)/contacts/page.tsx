"use client";

import Link from "next/link";

import { PageError } from "@/components/features/common/page-error";
import { PageHeader } from "@/components/features/common/page-header";
import { PageHeaderLoader } from "@/components/features/common/page-header-loader";
import { ContactsTable } from "@/components/tables/contacts-table";
import { useContacts } from "@/hooks/apis/useContacts";
import { Plus } from "lucide-react";

const ContactsPage = () => {
  const { data, isLoading, isError } = useContacts();

  const contacts = data?.data?.contacts ?? [];

  if (isLoading) {
    return <PageHeaderLoader title="Contacts" />;
  }

  if (isError) {
    return <PageError />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Contacts"
        subTitle="Manage and review contacts submitted through your website."
      >
        <Link
          href="/contacts/create"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> New Contact
        </Link>
      </PageHeader>

      <ContactsTable data={contacts} />
    </div>
  );
};

export default ContactsPage;
