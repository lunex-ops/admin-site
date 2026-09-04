"use client";

import { PageError } from "@/components/features/common/page-error";
import { PageHeader } from "@/components/features/common/page-header";
import { PageHeaderLoader } from "@/components/features/common/page-header-loader";
import { UsersTable } from "@/components/tables/users-table";

import { useUsers } from "@/hooks/apis/useUsers";

const UsersPage = () => {
  const { data, isLoading, isError } = useUsers();

  const users = data?.data?.users ?? [];

  if (isLoading) {
    return <PageHeaderLoader title="Users" />;
  }

  if (isError) {
    return <PageError />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Users"
        subTitle="Manage users and their access to your workspace."
      />

      <UsersTable data={users} />
    </div>
  );
};

export default UsersPage;
