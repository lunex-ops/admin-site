"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

import { useLead, useUpdateLead } from "@/hooks/apis/useLeads";
import { Lead, UpdateLeadInput } from "@/types/lead.types";
import { LeadStatus } from "@/types/common.types";

const leadStatuses = [
  {
    value: "NEW",
    label: "New",
  },
  {
    value: "CONTACTED",
    label: "Contacted",
  },
  {
    value: "QUALIFIED",
    label: "Qualified",
  },
  {
    value: "PROPOSAL",
    label: "Proposal",
  },
  {
    value: "WON",
    label: "Won",
  },
  {
    value: "LOST",
    label: "Lost",
  },
] as const;

const editLeadSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"]),
  assignedToId: z.string().nullable().or(z.literal("")),
  estimatedValue: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || !Number.isNaN(Number(value)),
      "Estimated value must be a valid number",
    ),
  lastContactedAt: z.string().nullable().or(z.literal("")),
  nextFollowUpAt: z.string().nullable().or(z.literal("")),
  notes: z.string().trim().nullable().or(z.literal("")),
});

type EditLeadFormValues = z.infer<typeof editLeadSchema>;

const getDateTimeLocalValue = (value: string | null) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const getDefaultValues = (lead: Lead): EditLeadFormValues => ({
  status: lead.status,
  assignedToId: lead.assignedToId ?? "",
  estimatedValue:
    lead.estimatedValue !== null && lead.estimatedValue !== undefined
      ? String(lead.estimatedValue)
      : "",
  lastContactedAt: getDateTimeLocalValue(lead.lastContactedAt),
  nextFollowUpAt: getDateTimeLocalValue(lead.nextFollowUpAt),
  notes: lead.notes ?? "",
});

interface FieldErrorProps {
  message?: string;
}

const FieldError = ({ message }: FieldErrorProps) => {
  if (!message) return null;

  return <p className="text-xs text-danger">{message}</p>;
};

interface EditLeadFormProps {
  lead: Lead;
}

const EditLeadForm = ({ lead }: EditLeadFormProps) => {
  const router = useRouter();

  const updateLead = useUpdateLead();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditLeadFormValues>({
    resolver: zodResolver(editLeadSchema),
    defaultValues: getDefaultValues(lead),
  });

  const status = watch("status");
  const assignedToId = watch("assignedToId");

  const handleFormSubmit = (values: EditLeadFormValues) => {
    const payload: UpdateLeadInput = {
      status: values.status as LeadStatus,
      assignedToId: values.assignedToId || null,
      estimatedValue: values.estimatedValue
        ? Number(values.estimatedValue)
        : null,
      lastContactedAt: values.lastContactedAt
        ? new Date(values.lastContactedAt)
        : null,
      nextFollowUpAt: values.nextFollowUpAt
        ? new Date(values.nextFollowUpAt)
        : null,
      notes: values.notes || null,
    };

    updateLead.mutate(
      {
        id: lead.id,
        payload,
      },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "Lead updated successfully.",
          });

          router.push(`/leads/${lead.id}`);
        },
        onError: () => {
          toast.add({
            type: "error",
            description: "Failed to update lead. Please try again.",
            priority: "high",
          });
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Lead Information</CardTitle>

            <p className="text-sm text-muted-foreground">
              Update the current status, ownership, and commercial details of
              this lead.
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2.5">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>

                <Select
                  value={status}
                  onValueChange={(value) =>
                    setValue("status", value as LeadStatus, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger
                    aria-invalid={!!errors.status}
                    className="h-11 w-full rounded-md border-border bg-background px-3 text-sm shadow-sm transition-colors hover:border-primary/50 focus:ring-2 focus:ring-primary/20 data-placeholder:text-muted-foreground"
                  >
                    <SelectValue placeholder="Choose a status" />
                  </SelectTrigger>

                  <SelectContent>
                    {leadStatuses.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className="cursor-pointer"
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FieldError message={errors.status?.message} />
              </div>

              <div className="space-y-2.5">
                <label htmlFor="assignedToId" className="text-sm font-medium">
                  Assigned To
                </label>

                <Select
                  value={assignedToId || "unassigned"}
                  onValueChange={(value) =>
                    setValue(
                      "assignedToId",
                      value === "unassigned" ? "" : value,
                      {
                        shouldValidate: true,
                      },
                    )
                  }
                >
                  <SelectTrigger
                    aria-invalid={!!errors.assignedToId}
                    className="h-11 w-full rounded-md border-border bg-background px-3 text-sm shadow-sm transition-colors hover:border-primary/50 focus:ring-2 focus:ring-primary/20 data-placeholder:text-muted-foreground"
                  >
                    <SelectValue placeholder="Choose an assignee" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="unassigned" className="cursor-pointer">
                      Unassigned
                    </SelectItem>

                    {lead.assignedTo && (
                      <SelectItem
                        value={lead.assignedTo.id}
                        className="cursor-pointer"
                      >
                        {lead.assignedTo.name || lead.assignedTo.username}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>

                <FieldError message={errors.assignedToId?.message} />

                <p className="text-xs text-muted-foreground">
                  Assignment can also be managed from the lead details page.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="estimatedValue" className="text-sm font-medium">
                  Estimated Value
                </label>

                <Input
                  id="estimatedValue"
                  type="number"
                  min="0"
                  step="0.01"
                  {...register("estimatedValue")}
                  placeholder="e.g. 25000"
                  aria-invalid={!!errors.estimatedValue}
                />

                <FieldError message={errors.estimatedValue?.message} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>

            <p className="text-sm text-muted-foreground">
              Contact information associated with this lead.
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Name
                </p>

                <p className="text-sm font-medium">
                  {lead.contact.name || "—"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Company
                </p>

                <p className="text-sm font-medium">
                  {lead.contact.company || "—"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Email
                </p>

                <p className="text-sm font-medium">
                  {lead.contact.email || "—"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Phone
                </p>

                <p className="text-sm font-medium">
                  {lead.contact.phone || "—"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Industry
                </p>

                <p className="text-sm font-medium">
                  {lead.contact.industry || "—"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Website
                </p>

                <p className="text-sm font-medium">
                  {lead.contact.website || "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Follow Up</CardTitle>

            <p className="text-sm text-muted-foreground">
              Track communication and schedule the next follow-up.
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="lastContactedAt"
                  className="text-sm font-medium"
                >
                  Last Contacted
                </label>

                <Input
                  id="lastContactedAt"
                  type="datetime-local"
                  {...register("lastContactedAt")}
                  aria-invalid={!!errors.lastContactedAt}
                />

                <FieldError message={errors.lastContactedAt?.message} />
              </div>

              <div className="space-y-2">
                <label htmlFor="nextFollowUpAt" className="text-sm font-medium">
                  Next Follow Up
                </label>

                <Input
                  id="nextFollowUpAt"
                  type="datetime-local"
                  {...register("nextFollowUpAt")}
                  aria-invalid={!!errors.nextFollowUpAt}
                />

                <FieldError message={errors.nextFollowUpAt?.message} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>

            <p className="text-sm text-muted-foreground">
              Add internal notes and useful information about this lead.
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Lead Notes
              </label>

              <Textarea
                id="notes"
                {...register("notes")}
                rows={7}
                placeholder="Add notes about this lead..."
                aria-invalid={!!errors.notes}
              />

              <FieldError message={errors.notes?.message} />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col-reverse gap-2 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/leads/${lead.id}`)}
            disabled={updateLead.isPending}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={updateLead.isPending}>
            <Save className="size-4" />

            {updateLead.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
};

const EditLeadPage = () => {
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading, isError } = useLead(id);

  const lead = data?.data?.lead;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-4 w-24 animate-pulse bg-muted" />

          <div className="mt-4 h-9 w-48 animate-pulse bg-muted" />

          <div className="mt-3 h-4 w-72 animate-pulse bg-muted" />
        </div>

        <div className="space-y-6">
          <div className="h-80 animate-pulse border border-border bg-muted/30" />

          <div className="h-64 animate-pulse border border-border bg-muted/30" />

          <div className="h-64 animate-pulse border border-border bg-muted/30" />
        </div>
      </div>
    );
  }

  if (isError || !lead) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center text-center">
        <p className="text-sm font-medium">Unable to load lead</p>

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

  return (
    <div className="space-y-8">
      <div>
        <Link
          href={`/leads/${lead.id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Lead
        </Link>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Leads
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">Edit Lead</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Update the lead information for{" "}
            <span className="font-medium text-foreground">
              {lead.contact.name}
            </span>
            .
          </p>
        </div>
      </div>

      <EditLeadForm key={`${lead.id}-${lead.updatedAt}`} lead={lead} />
    </div>
  );
};

export default EditLeadPage;
