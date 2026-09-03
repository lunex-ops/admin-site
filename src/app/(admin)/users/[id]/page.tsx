"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  Pencil,
  Shield,
  Trash2,
  UserRound,
  XCircle,
} from "lucide-react";

import { useDeleteUser, useUser } from "@/hooks/apis/useUsers";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ConfirmationDialog from "@/components/common/confirmation-dialog";
import Image from "next/image";
import {
  formatDate,
  formatDateTime,
  formatValue,
  roleStyles,
} from "@/lib/helpers";

const UserDetailsPage = () => {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const { data, isLoading, isError } = useUser(id);

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const user = data?.data?.user;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-4 w-28 animate-pulse bg-muted" />

          <div className="mt-4 h-9 w-56 animate-pulse bg-muted" />

          <div className="mt-3 h-4 w-72 animate-pulse bg-muted" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-72 animate-pulse border border-border bg-muted/30 lg:col-span-2" />

          <div className="h-72 animate-pulse border border-border bg-muted/30" />

          <div className="h-64 animate-pulse border border-border bg-muted/30 lg:col-span-3" />
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center text-center">
        <UserRound className="size-8 text-muted-foreground/50" />

        <p className="mt-4 text-sm font-medium">Unable to load user</p>

        <p className="mt-1 text-xs text-muted-foreground">
          The user may no longer exist or could not be loaded.
        </p>

        <Link
          href="/users"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to Users
        </Link>
      </div>
    );
  }

  const displayName = user.name || user.username;

  const initials = displayName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleDelete = () => {
    deleteUser(user.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        router.push("/users");
      },
    });
  };

  return (
    <>
      <div className="space-y-8">
        <div>
          <Link
            href="/users"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Users
          </Link>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            {/* User Identity */}
            <div className="flex items-start gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center bg-muted text-lg font-semibold">
                {user.photo ? (
                  <Image
                    src={user.photo}
                    alt={displayName}
                    className="size-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-semibold tracking-tight">
                    {displayName}
                  </h1>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                      roleStyles[user.role] ?? "bg-muted text-muted-foreground"
                    }`}
                  >
                    {formatValue(user.role)}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Mail className="size-3.5" />
                    {user.email}
                  </span>

                  <span className="flex items-center gap-1.5">
                    {user.isActive ? (
                      <>
                        <CheckCircle2 className="size-3.5 text-green-600" />
                        Active
                      </>
                    ) : (
                      <>
                        <XCircle className="size-3.5 text-red-600" />
                        Inactive
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/users/${user.id}/edit`}
                className="inline-flex h-9 items-center justify-center gap-2 border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Pencil className="size-4" />
                Edit
              </Link>

              <Button
                variant="outline"
                className="text-destructive hover:text-destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="border border-border bg-card lg:col-span-2">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">User Information</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Primary account information for this user.
              </p>
            </div>

            <div className="grid gap-x-8 gap-y-6 p-5 sm:grid-cols-2">
              <DetailItem
                icon={<UserRound className="size-4" />}
                label="Name"
                value={user.name}
              />

              <DetailItem
                icon={<UserRound className="size-4" />}
                label="Username"
                value={user.username}
              />

              <DetailItem
                icon={<Mail className="size-4" />}
                label="Email"
                value={user.email}
              />

              <DetailItem
                icon={<Shield className="size-4" />}
                label="Role"
                value={formatValue(user.role)}
              />
            </div>
          </section>

          <section className="border border-border bg-card">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Account Status</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Current state of this user account.
              </p>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Status
                </p>

                <div className="mt-2 flex items-center gap-2">
                  {user.isActive ? (
                    <>
                      <span className="size-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium text-green-600">
                        Active
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="size-2 rounded-full bg-red-500" />
                      <span className="text-sm font-medium text-red-600">
                        Inactive
                      </span>
                    </>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Role
                </p>

                <div className="mt-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      roleStyles[user.role] ?? "bg-muted text-muted-foreground"
                    }`}
                  >
                    {formatValue(user.role)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="border border-border bg-card lg:col-span-3">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Account Activity</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Important dates and account activity information.
              </p>
            </div>

            <div className="grid gap-6 p-5 md:grid-cols-3">
              <DetailItem
                icon={<CalendarDays className="size-4" />}
                label="Created"
                value={formatDateTime(user.createdAt)}
              />

              <DetailItem
                icon={<Clock3 className="size-4" />}
                label="Last Updated"
                value={formatDateTime(user.updatedAt)}
              />

              <DetailItem
                icon={<Shield className="size-4" />}
                label="Password Changed"
                value={
                  user.passwordChangedAt
                    ? formatDateTime(user.passwordChangedAt)
                    : "Never changed"
                }
              />
            </div>
          </section>

          <section className="border border-border bg-card lg:col-span-2">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Account Details</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Additional account information.
              </p>
            </div>

            <div className="p-5">
              <div className="grid gap-6 sm:grid-cols-2">
                <DetailItem label="User ID" value={user.id} />

                <DetailItem label="Username" value={user.username} />
              </div>
            </div>
          </section>

          <section className="border border-border bg-card">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Security</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Security-related account information.
              </p>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Password
                </p>

                <p className="mt-2 text-sm font-medium">
                  {user.passwordChangedAt
                    ? "Password has been changed"
                    : "Password has not been changed"}
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Password Changed
                </p>

                <p className="mt-2 text-sm font-medium">
                  {formatDate(user.passwordChangedAt)}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete user?"
        message={`Are you sure you want to delete ${displayName}? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
};

interface DetailItemProps {
  label: string;
  value: string | null | undefined;
  icon?: React.ReactNode;
}

const DetailItem = ({ label, value, icon }: DetailItemProps) => {
  const displayValue = value || "—";

  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </p>

      <p className="break-all text-sm font-medium">{displayValue}</p>
    </div>
  );
};

export default UserDetailsPage;
