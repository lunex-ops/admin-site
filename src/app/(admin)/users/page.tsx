"use client";

import { UsersTable } from "@/components/tables/users-table";

import { useUsers } from "@/hooks/apis/useUsers";

const UsersPage = () => {
  const { data, isLoading, isError } = useUsers();

  const users = data?.data?.users ?? [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Workspace
        </p>

        <h1 className="text-3xl font-semibold tracking-tight">Users</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage users and their access to your workspace.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          <div className="h-14 animate-pulse border border-border bg-muted/30" />

          <div className="border border-border bg-card">
            <div className="divide-y divide-border">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-16 animate-pulse bg-muted/20" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="flex min-h-48 flex-col items-center justify-center border border-border bg-card p-6 text-center">
          <p className="text-sm font-medium">Unable to load users</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Please try refreshing the page.
          </p>
        </div>
      )}

      {/* Users */}
      {!isLoading && !isError && <UsersTable data={users} />}
    </div>
  );
};

export default UsersPage;
