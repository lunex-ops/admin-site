"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import {
  ArrowLeft,
  Building2,
  Calendar,
  Globe,
  Mail,
  Pencil,
  Phone,
  Tag,
  Trash2,
  UserRound,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";

import {
  useAssignLead,
  useDeleteLead,
  useLead,
  useUnassignLead,
} from "@/hooks/apis/useLeads";
import { useUsers } from "@/hooks/apis/useUsers";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ConfirmationDialog from "@/components/common/confirmation-dialog";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatValue,
  getInitials,
  leadStatusStyles,
} from "@/lib/helpers";
import ButtonBack from "@/components/common/buttons/button-back";
import { DetailItem } from "@/components/features/common/detail-item";
import AssignLeadDialog from "@/components/features/leads/assign-lead-dialog";
import { PageLoader } from "@/components/common/loader/page-loader";

const LeadDetailsPage = () => {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const { data, isLoading, isError } = useLead(id);

  const assignLead = useAssignLead();
  const unassignLead = useUnassignLead();
  const deleteLead = useDeleteLead();

  const { data: usersData, isLoading: isUsersLoading } = useUsers();

  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isUnassignDialogOpen, setIsUnassignDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const lead = data?.data?.lead;

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !lead) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center text-center">
        <UserRound className="size-8 text-muted-foreground/50" />

        <p className="mt-4 text-sm font-medium">Unable to load lead</p>

        <p className="mt-1 text-xs text-muted-foreground">
          The lead may no longer exist or could not be loaded.
        </p>

        <Link
          href="/leads"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to Leads
        </Link>
      </div>
    );
  }

  const contact = lead.contact;
  const users = usersData?.data?.users ?? [];

  const handleAssign = (userId: string) => {
    assignLead.mutate(
      {
        id: lead.id,
        data: {
          assignedToId: userId,
        },
      },
      {
        onSuccess: () => {
          setIsAssignDialogOpen(false);
        },
      },
    );
  };

  const handleUnassign = () => {
    unassignLead.mutate(lead.id, {
      onSuccess: () => {
        setIsUnassignDialogOpen(false);
      },
    });
  };

  const handleDelete = () => {
    deleteLead.mutate(lead.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        router.push("/leads");
      },
    });
  };

  return (
    <>
      <div className="space-y-8">
        <div>
          <ButtonBack link="/leads" />

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="flex items-start gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center bg-muted text-lg font-semibold">
                {getInitials(contact.name)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-semibold tracking-tight">
                    {contact.name}
                  </h1>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                      leadStatusStyles[lead.status] ??
                      "bg-muted text-muted-foreground"
                    }`}
                  >
                    {formatValue(lead.status)}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  {contact.company && (
                    <span className="flex items-center gap-1.5">
                      <Building2 className="size-3.5" />
                      {contact.company}
                    </span>
                  )}

                  {contact.industry && (
                    <span className="flex items-center gap-1.5">
                      <Tag className="size-3.5" />
                      {contact.industry}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {lead.assignedTo ? (
                <Button
                  variant="outline"
                  onClick={() => setIsUnassignDialogOpen(true)}
                  disabled={
                    unassignLead.isPending ||
                    assignLead.isPending ||
                    deleteLead.isPending
                  }
                >
                  <UserRoundX className="size-4" />
                  Unassign
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setIsAssignDialogOpen(true)}
                  disabled={
                    assignLead.isPending ||
                    unassignLead.isPending ||
                    deleteLead.isPending
                  }
                >
                  <UserRoundCheck className="size-4" />
                  Assign
                </Button>
              )}

              <Link
                href={`/leads/${lead.id}/edit`}
                className="inline-flex h-9 items-center justify-center gap-2 border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Pencil className="size-4" />
                Edit
              </Link>

              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(true)}
                disabled={
                  deleteLead.isPending ||
                  assignLead.isPending ||
                  unassignLead.isPending
                }
                className="text-destructive hover:text-destructive"
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
              <h2 className="font-medium">Contact Information</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Contact information associated with this lead.
              </p>
            </div>

            <div className="grid gap-x-8 gap-y-6 p-5 sm:grid-cols-2">
              <DetailItem
                icon={<UserRound className="size-4" />}
                label="Name"
                value={contact.name}
              />

              <DetailItem
                icon={<Building2 className="size-4" />}
                label="Company"
                value={contact.company}
              />

              <DetailItem
                icon={<Mail className="size-4" />}
                label="Email"
                value={contact.email}
                href={`mailto:${contact.email}`}
              />

              <DetailItem
                icon={<Phone className="size-4" />}
                label="Phone"
                value={contact.phone}
                href={contact.phone ? `tel:${contact.phone}` : undefined}
              />

              <DetailItem
                icon={<Globe className="size-4" />}
                label="Website"
                value={contact.website}
                href={contact.website ?? undefined}
                external
              />

              <DetailItem
                icon={<Tag className="size-4" />}
                label="Industry"
                value={contact.industry}
              />
            </div>
          </section>

          <section className="border border-border bg-card">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Lead Status</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Current state of this lead.
              </p>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Status
                </p>

                <div className="mt-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      leadStatusStyles[lead.status] ??
                      "bg-muted text-muted-foreground"
                    }`}
                  >
                    {formatValue(lead.status)}
                  </span>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Created
                </p>

                <p className="mt-2 text-sm font-medium">
                  {formatDate(lead.createdAt)}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDateTime(lead.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Last Updated
                </p>

                <p className="mt-2 text-sm font-medium">
                  {formatDate(lead.updatedAt)}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDateTime(lead.updatedAt)}
                </p>
              </div>
            </div>
          </section>

          <section className="border border-border bg-card lg:col-span-3">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Project Overview</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Information about the project associated with this lead.
              </p>
            </div>

            <div className="grid gap-6 p-5 md:grid-cols-4">
              <DetailItem
                label="Project Type"
                value={formatValue(contact.projectType)}
              />

              <DetailItem label="Budget" value={contact.budget} />

              <DetailItem label="Timeline" value={contact.timeline} />

              <DetailItem
                label="Estimated Value"
                value={formatCurrency(lead.estimatedValue)}
              />
            </div>
          </section>

          <section className="border border-border bg-card lg:col-span-2">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Lead Activity</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Track the latest contact and follow-up information.
              </p>
            </div>

            <div className="grid gap-6 p-5 sm:grid-cols-2">
              <DetailItem
                icon={<Calendar className="size-4" />}
                label="Last Contacted"
                value={formatDateTime(lead.lastContactedAt)}
              />

              <DetailItem
                icon={<Calendar className="size-4" />}
                label="Next Follow-up"
                value={formatDateTime(lead.nextFollowUpAt)}
              />
            </div>
          </section>

          <section className="border border-border bg-card">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Assignment</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                User currently responsible for this lead.
              </p>
            </div>

            <div className="p-5">
              {lead.assignedTo ? (
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center bg-muted">
                    <UserRound className="size-5 text-muted-foreground" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {lead.assignedTo.name || lead.assignedTo.username}
                    </p>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {lead.assignedTo.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center bg-muted">
                    <UserRoundX className="size-5 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Unassigned</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      No user is currently assigned to this lead.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="border border-border bg-card lg:col-span-2">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Project Details</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                The project requirements provided by the contact.
              </p>
            </div>

            <div className="p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-foreground/90">
                {contact.projectDetails || "—"}
              </p>
            </div>
          </section>

          <section className="border border-border bg-card">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Notes</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Internal notes for this lead.
              </p>
            </div>

            <div className="p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-foreground/90">
                {lead.notes || "No notes have been added."}
              </p>
            </div>
          </section>

          <section className="border border-border bg-card lg:col-span-3">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Additional Information</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Other information associated with this lead.
              </p>
            </div>

            <div className="grid gap-6 p-5 sm:grid-cols-3">
              <DetailItem label="Referral Source" value={contact.referral} />

              <DetailItem
                label="Contact Created"
                value={formatDateTime(contact.createdAt)}
              />

              <DetailItem
                label="Contact Updated"
                value={formatDateTime(contact.updatedAt)}
              />
            </div>
          </section>
        </div>
      </div>

      <AssignLeadDialog
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        users={users}
        onAssign={handleAssign}
        isLoading={assignLead.isPending || isUsersLoading}
      />

      <ConfirmationDialog
        open={isUnassignDialogOpen}
        onOpenChange={setIsUnassignDialogOpen}
        title="Unassign lead?"
        message={`Are you sure you want to unassign ${contact.name}? The lead will no longer be assigned to ${
          lead.assignedTo?.name ||
          lead.assignedTo?.username ||
          "the current user"
        }.`}
        confirmText="Unassign"
        onConfirm={handleUnassign}
        isLoading={unassignLead.isPending}
      />

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete lead?"
        message={`Are you sure you want to permanently delete the lead for ${contact.name}? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        isLoading={deleteLead.isPending}
      />
    </>
  );
};

export default LeadDetailsPage;
