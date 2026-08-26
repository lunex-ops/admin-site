"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ExternalLink,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import { useContact } from "@/hooks/apis/useContacts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ContactDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useContact(id);

  const contact = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Workspace
          </p>

          <h1 className="text-3xl font-semibold">Contact</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Loading contact information...
          </p>
        </div>

        <div className="border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isError || !contact) {
    return (
      <div className="space-y-8">
        <div>
          <Link
            href="/contacts"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Contacts
          </Link>

          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Workspace
          </p>

          <h1 className="text-3xl font-semibold">Contact Not Found</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The contact you are looking for could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/contacts"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Contacts
        </Link>

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Contact
            </p>

            <h1 className="text-3xl font-semibold">{contact.name}</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              {contact.company}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button>
              <Check className="size-4" />
              Accept
            </Button>

            <Button variant="outline">
              <X className="size-4" />
              Reject
            </Button>

            <Link
              href={`/contacts/${contact.id}/edit`}
              className="inline-flex h-9 items-center justify-center gap-2 border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Pencil className="size-4" />
              Edit
            </Link>

            <Button variant="destructive">
              <Trash2 className="size-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <DetailItem label="Name" value={contact.name} />

            <DetailItem label="Company" value={contact.company} />

            <DetailItem
              label="Email"
              value={contact.email}
              href={`mailto:${contact.email}`}
            />

            <DetailItem
              label="Website"
              value={contact.website}
              href={contact.website ?? undefined}
            />
          </div>
        </CardContent>
      </Card>

      {/* Project Information */}
      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <DetailItem label="Project Type" value={contact.projectType} />

            <DetailItem label="Budget" value={contact.budget} />

            <DetailItem label="Timeline" value={contact.timeline} />
          </div>

          <Separator />

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Project Details
            </p>

            <p className="text-sm leading-6">
              {contact.projectDetails || "No project details provided."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>

        <CardContent>
          <DetailItem label="Referral" value={contact.referral} />
        </CardContent>
      </Card>

      {/* Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <DetailItem label="Created" value={formatDate(contact.createdAt)} />

            <DetailItem
              label="Last Updated"
              value={formatDate(contact.updatedAt)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface DetailItemProps {
  label: string;
  value: string | null | undefined;
  href?: string;
}

const DetailItem = ({ label, value, href }: DetailItemProps) => {
  const displayValue = value || "—";

  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </p>

      {href && value ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {displayValue}

          {href.startsWith("http") && <ExternalLink className="size-3.5" />}
        </a>
      ) : (
        <p className="text-sm font-medium">{displayValue}</p>
      )}
    </div>
  );
};

const formatDate = (value: string) => {
  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export default ContactDetailsPage;
