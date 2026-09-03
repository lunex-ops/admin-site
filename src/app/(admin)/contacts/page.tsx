"use client";

import { PageError } from "@/components/features/common/page-error";
import { PageHeader } from "@/components/features/common/page-header";
import { PageHeaderLoader } from "@/components/features/common/page-header-loader";
import { ContactsTable } from "@/components/tables/contacts-table";
import { useContacts } from "@/hooks/apis/useContacts";

const ContactsPage = () => {
  const { data, isLoading, isError } = useContacts();

  const contacts = data?.data?.contacts ?? [];

  if (!isLoading) {
    return <PageHeaderLoader title="Workspace" pageName="Contacts" />;
  }

  if (isError) {
    return <PageError />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Workspace"
        pageName="Contacts"
        subTitle=" Manage and review contacts submitted through your website."
      />

      {!isLoading && !isError && <ContactsTable data={contacts} />}
    </div>
  );
};

export default ContactsPage;
