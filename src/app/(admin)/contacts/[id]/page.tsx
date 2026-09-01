"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, type ReactNode } from "react";

import {
  ArrowLeft,
  Building2,
  Check,
  CheckCircle2,
  ExternalLink,
  Globe,
  Mail,
  Pencil,
  Phone,
  Tag,
  UserRound,
  X,
} from "lucide-react";

import {
  useAcceptContact,
  useContact,
  useRejectContact,
} from "@/hooks/apis/useContacts";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import RejectionDialog from "@/components/common/rejection-dialog";
import ConfirmationDialog from "@/components/common/confirmation-dialog";

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

const formatValue = (value: string | null | undefined) => {
  if (!value) return "—";

  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const formatDateTime = (value: string) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

const statusStyles: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-600",
  CONVERTED: "bg-green-500/10 text-green-600",
  SPAM: "bg-red-500/10 text-red-600",
};

/* -------------------------------------------------------------------------- */
/*                              Contact Details                               */
/* -------------------------------------------------------------------------- */

const ContactDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useContact(id);

  const { mutate: acceptContact, isPending: isAccepting } = useAcceptContact();

  const { mutate: rejectContact, isPending: isRejecting } = useRejectContact();

  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const contact = data?.data?.contact;

  /* ------------------------------------------------------------------------ */
  /*                               Loading                                    */
  /* ------------------------------------------------------------------------ */

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-4 w-28 animate-pulse bg-muted" />
          <div className="mt-4 h-9 w-56 animate-pulse bg-muted" />
          <div className="mt-3 h-4 w-72 animate-pulse bg-muted" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-64 animate-pulse border border-border bg-muted/30 lg:col-span-2" />
          <div className="h-64 animate-pulse border border-border bg-muted/30" />
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                                  Error                                   */
  /* ------------------------------------------------------------------------ */

  if (isError || !contact) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center text-center">
        <UserRound className="size-8 text-muted-foreground/50" />

        <p className="mt-4 text-sm font-medium">Unable to load contact</p>

        <p className="mt-1 text-xs text-muted-foreground">
          The contact may no longer exist or could not be loaded.
        </p>

        <Link
          href="/contacts"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to Contacts
        </Link>
      </div>
    );
  }

  const initials = contact.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  /* ------------------------------------------------------------------------ */
  /*                              Action Handlers                             */
  /* ------------------------------------------------------------------------ */

  const handleAccept = () => {
    acceptContact(contact.id, {
      onSuccess: () => {
        setIsAcceptDialogOpen(false);
      },
    });
  };

  const handleReject = (rejectionReason: string) => {
    rejectContact(
      {
        id: contact.id,
        rejectionReason,
      },
      {
        onSuccess: () => {
          setIsRejectDialogOpen(false);
        },
      },
    );
  };

  /* ------------------------------------------------------------------------ */
  /*                                  Render                                  */
  /* ------------------------------------------------------------------------ */

  return (
    <>
      <div className="space-y-8">
        {/* Header */}

        <div>
          <Link
            href="/contacts"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Contacts
          </Link>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="flex items-start gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center bg-muted text-lg font-semibold">
                {initials}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-semibold tracking-tight">
                    {contact.name}
                  </h1>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                      statusStyles[contact.status] ??
                      "bg-muted text-muted-foreground"
                    }`}
                  >
                    {formatValue(contact.status)}
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
              {contact.status === "NEW" && (
                <>
                  <Button onClick={() => setIsAcceptDialogOpen(true)}>
                    <Check className="size-4" />
                    Accept
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setIsRejectDialogOpen(true)}
                  >
                    <X className="size-4" />
                    Reject
                  </Button>
                </>
              )}

              <Link
                href={`/contacts/${contact.id}/edit`}
                className="inline-flex h-9 items-center justify-center gap-2 border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Pencil className="size-4" />
                Edit
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Contact Information */}

          <section className="border border-border bg-card lg:col-span-2">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Contact Information</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Primary information submitted by the contact.
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

          {/* Status */}

          <section className="border border-border bg-card">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Contact Status</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Current state of this contact.
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
                      statusStyles[contact.status] ??
                      "bg-muted text-muted-foreground"
                    }`}
                  >
                    {formatValue(contact.status)}
                  </span>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Submitted
                </p>

                <p className="mt-2 text-sm font-medium">
                  {formatDate(contact.createdAt)}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDateTime(contact.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Last Updated
                </p>

                <p className="mt-2 text-sm font-medium">
                  {formatDate(contact.updatedAt)}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDateTime(contact.updatedAt)}
                </p>
              </div>
            </div>
          </section>

          {/* Project Overview */}

          <section className="border border-border bg-card lg:col-span-3">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Project Overview</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Information about the project requested by the contact.
              </p>
            </div>

            <div className="grid gap-6 p-5 md:grid-cols-3">
              <DetailItem
                label="Project Type"
                value={formatValue(contact.projectType)}
              />

              <DetailItem label="Budget" value={contact.budget} />

              <DetailItem label="Timeline" value={contact.timeline} />
            </div>
          </section>

          {/* Project Details */}

          <section className="border border-border bg-card lg:col-span-2">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Project Details</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                The project requirements provided by the contact.
              </p>
            </div>

            <div className="p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-foreground/90">
                {contact.projectDetails}
              </p>
            </div>
          </section>

          {/* Additional Information */}

          <section className="border border-border bg-card">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Additional Information</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Other information provided with the submission.
              </p>
            </div>

            <div className="space-y-5 p-5">
              <DetailItem label="Referral Source" value={contact.referral} />

              {contact.rejectionReason && (
                <>
                  <Separator />

                  <DetailItem
                    label="Rejection Reason"
                    value={contact.rejectionReason}
                  />
                </>
              )}

              {contact.rejectedAt && (
                <DetailItem
                  label="Rejected At"
                  value={formatDateTime(contact.rejectedAt)}
                />
              )}
            </div>
          </section>

          {/* Lead */}

          <section className="border border-border bg-card lg:col-span-3">
            <div className="border-b border-border p-5">
              <h2 className="font-medium">Lead</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Lead conversion information for this contact.
              </p>
            </div>

            <div className="p-5">
              {contact.lead ? (
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center bg-green-500/10 text-green-600">
                      <CheckCircle2 className="size-5" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">Converted to lead</p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        This contact has been successfully converted into a
                        lead.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Lead Status
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {formatValue(contact.lead.status)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Created</p>

                      <p className="mt-1 text-sm font-medium">
                        {formatDate(contact.lead.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center bg-muted">
                    <UserRound className="size-5 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">No lead created</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      This contact has not been converted into a lead yet.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Accept Dialog */}

      <ConfirmationDialog
        open={isAcceptDialogOpen}
        onOpenChange={setIsAcceptDialogOpen}
        title="Accept contact?"
        message={`Are you sure you want to accept ${contact.name}? This will convert the contact into a lead.`}
        confirmText="Accept"
        onConfirm={handleAccept}
        isLoading={isAccepting}
      />

      {/* Reject Dialog */}

      <RejectionDialog
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
        title="Reject contact?"
        message={`Provide a reason for rejecting ${contact.name}. This reason will be saved with the contact.`}
        confirmText="Reject"
        onConfirm={handleReject}
        isLoading={isRejecting}
      />
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                                Detail Item                                 */
/* -------------------------------------------------------------------------- */

interface DetailItemProps {
  label: string;
  value: string | null | undefined;
  href?: string;
  icon?: ReactNode;
  external?: boolean;
}

const DetailItem = ({
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

export default ContactDetailsPage;
