"use client";

import { useParams, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Save,
  Building2,
  Globe,
  Mail,
  Phone,
  Tag,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

import { useLead, useUpdateLead } from "@/hooks/apis/useLeads";
import { useUsers } from "@/hooks/apis/useUsers";

import { Lead, UpdateLeadInput } from "@/types/lead.types";
import { LeadStatus } from "@/types/common.types";

import ButtonBack from "@/components/common/buttons/button-back";
import { PageHeader } from "@/components/features/common/page-header";
import { DetailItem } from "@/components/features/common/detail-item";

import TextField from "@/components/form-elements/text-field";
import TextareaField from "@/components/form-elements/text-area-field";
import SelectField from "@/components/form-elements/select-field";

import { leadStatuses } from "@/lib/data/project-type";
import { PageLoader } from "@/components/common/loader/page-loader";
import {
  EditLeadFormValues,
  editLeadSchema,
} from "@/lib/validations/leads.validation";
import LeadsError from "@/components/features/leads/leads-error";
import { getDateTimeLocalValue } from "@/lib/helpers";

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

interface EditLeadFormProps {
  lead: Lead;
}

const EditLeadForm = ({ lead }: EditLeadFormProps) => {
  const router = useRouter();

  const updateLead = useUpdateLead();

  const { data: usersData, isLoading: isUsersLoading } = useUsers();

  const users = usersData?.data?.users ?? [];

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<EditLeadFormValues>({
    resolver: zodResolver(editLeadSchema),
    defaultValues: getDefaultValues(lead),
  });

  const assignedToOptions = [
    {
      value: "unassigned",
      label: "Unassigned",
    },

    ...users.map((user) => ({
      value: user.id,
      label: user.name || user.username || user.email,
    })),
  ];

  const handleFormSubmit = (values: EditLeadFormValues) => {
    const payload: UpdateLeadInput = {
      status: values.status as LeadStatus,

      assignedToId:
        values.assignedToId && values.assignedToId !== "unassigned"
          ? values.assignedToId
          : null,

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
        data: payload,
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
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <SelectField
                    name="status"
                    label="Status"
                    placeholder="Choose a status"
                    options={leadStatuses}
                    value={field.value}
                    onValueChange={(value) =>
                      setValue("status", value as LeadStatus, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    error={errors.status?.message}
                  />
                )}
              />

              <div>
                <Controller
                  name="assignedToId"
                  control={control}
                  render={({ field }) => (
                    <SelectField
                      name="assignedToId"
                      label="Assigned To"
                      placeholder={
                        isUsersLoading
                          ? "Loading users..."
                          : "Choose an assignee"
                      }
                      options={assignedToOptions}
                      value={field.value || "unassigned"}
                      onValueChange={(value) =>
                        setValue(
                          "assignedToId",
                          value === "unassigned" ? "" : value,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                          },
                        )
                      }
                      error={errors.assignedToId?.message}
                    />
                  )}
                />

                <p className="mt-2 text-xs text-muted-foreground">
                  Assignment can also be managed from the lead details page.
                </p>
              </div>

              <TextField
                name="estimatedValue"
                label="Estimated Value"
                placeholder="e.g. 25000"
                register={register("estimatedValue")}
                error={errors.estimatedValue?.message}
              />
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
              <DetailItem
                icon={<UserRound className="size-4" />}
                label="Name"
                value={lead.contact.name}
              />

              <DetailItem
                icon={<Building2 className="size-4" />}
                label="Company"
                value={lead.contact.company}
              />

              <DetailItem
                icon={<Mail className="size-4" />}
                label="Email"
                value={lead.contact.email}
                href={`mailto:${lead.contact.email}`}
              />

              <DetailItem
                icon={<Phone className="size-4" />}
                label="Phone"
                value={lead.contact.phone}
                href={
                  lead.contact.phone ? `tel:${lead.contact.phone}` : undefined
                }
              />

              <DetailItem
                icon={<Tag className="size-4" />}
                label="Industry"
                value={lead.contact.industry}
              />

              <DetailItem
                icon={<Globe className="size-4" />}
                label="Website"
                value={lead.contact.website}
                href={lead.contact.website ?? undefined}
                external
              />
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
              <TextField
                name="lastContactedAt"
                label="Last Contacted"
                type="datetime-local"
                register={register("lastContactedAt")}
                error={errors.lastContactedAt?.message}
              />

              <TextField
                name="nextFollowUpAt"
                label="Next Follow Up"
                type="datetime-local"
                register={register("nextFollowUpAt")}
                error={errors.nextFollowUpAt?.message}
              />
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
            <TextareaField
              name="notes"
              label="Lead Notes"
              placeholder="Add notes about this lead..."
              rows={5}
              register={register("notes")}
              error={errors.notes?.message}
            />
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
    return <PageLoader />;
  }

  if (isError || !lead) {
    return <LeadsError />;
  }

  return (
    <div className="space-y-8">
      <div>
        <ButtonBack link={`/leads/${lead.id}`} />

        <PageHeader
          title="Edit Lead"
          subTitle={`Update the lead information for ${lead.contact.name}.`}
        />
      </div>

      <EditLeadForm key={`${lead.id}-${lead.updatedAt}`} lead={lead} />
    </div>
  );
};

export default EditLeadPage;
