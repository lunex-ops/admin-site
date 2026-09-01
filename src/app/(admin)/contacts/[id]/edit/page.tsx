"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "@/components/ui/toast";

import { useContact, useUpdateContact } from "@/hooks/apis/useContacts";
import { Contact, UpdateContactInput } from "@/types/contact.types";
import { ProjectType } from "@/types/common.types";

const projectTypes = [
  {
    value: "WEBSITE",
    label: "Website",
  },
  {
    value: "WEB_APPLICATION",
    label: "Web Application",
  },
  {
    value: "SAAS_MVP",
    label: "SaaS / MVP",
  },
  {
    value: "EXISTING_PRODUCT",
    label: "Existing Product",
  },
  {
    value: "ONGOING_DEVELOPMENT",
    label: "Ongoing Development",
  },
  {
    value: "NOT_SURE",
    label: "Not Sure",
  },
] as const;

const editContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  company: z.string().trim().nullable().or(z.literal("")),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  phone: z.string().trim().nullable().or(z.literal("")),

  website: z.string().trim().url("Enter a valid website URL").or(z.literal("")),

  industry: z.string().trim().nullable().or(z.literal("")),

  projectType: z.enum([
    "WEBSITE",
    "WEB_APPLICATION",
    "SAAS_MVP",
    "EXISTING_PRODUCT",
    "ONGOING_DEVELOPMENT",
    "NOT_SURE",
  ]),

  budget: z.string().trim().nullable().or(z.literal("")),

  timeline: z.string().trim().nullable().or(z.literal("")),

  projectDetails: z.string().trim().min(1, "Project details are required"),

  referral: z.string().trim().nullable().or(z.literal("")),
});

type EditContactFormValues = z.infer<typeof editContactSchema>;

const getDefaultValues = (contact: Contact): EditContactFormValues => ({
  name: contact.name,
  company: contact.company ?? "",
  email: contact.email,
  phone: contact.phone ?? "",
  website: contact.website ?? "",
  industry: contact.industry ?? "",
  projectType: contact.projectType,
  budget: contact.budget ?? "",
  timeline: contact.timeline ?? "",
  projectDetails: contact.projectDetails ?? "",
  referral: contact.referral ?? "",
});

interface FieldErrorProps {
  message?: string;
}

const FieldError = ({ message }: FieldErrorProps) => {
  if (!message) return null;

  return <p className="text-xs text-danger">{message}</p>;
};

interface EditContactFormProps {
  contact: Contact;
}

const EditContactForm = ({ contact }: EditContactFormProps) => {
  const router = useRouter();
  const updateContact = useUpdateContact();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditContactFormValues>({
    resolver: zodResolver(editContactSchema),
    defaultValues: getDefaultValues(contact),
  });

  const projectType = watch("projectType");

  const handleFormSubmit = (values: EditContactFormValues) => {
    const payload: UpdateContactInput = {
      name: values.name,
      company: values.company || null,
      email: values.email,
      phone: values.phone || null,
      website: values.website || null,
      industry: values.industry || null,
      projectType: values.projectType as ProjectType,
      budget: values.budget || null,
      timeline: values.timeline || null,
      projectDetails: values.projectDetails,
      referral: values.referral || null,
    };

    updateContact.mutate(
      {
        id: contact.id,
        payload,
      },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "Contact updated successfully.",
          });

          router.push(`/contacts/${contact.id}`);
        },

        onError: () => {
          toast.add({
            type: "error",
            description: "Failed to update contact. Please try again.",
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
            <CardTitle>Contact Information</CardTitle>

            <p className="text-sm text-muted-foreground">
              Update the primary contact and company information.
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>

                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Contact name"
                  aria-invalid={!!errors.name}
                />

                <FieldError message={errors.name?.message} />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>

                <Input
                  id="company"
                  {...register("company")}
                  placeholder="Company name"
                  aria-invalid={!!errors.company}
                />

                <FieldError message={errors.company?.message} />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>

                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="contact@example.com"
                  aria-invalid={!!errors.email}
                />

                <FieldError message={errors.email?.message} />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>

                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="+1 555 123 4567"
                  aria-invalid={!!errors.phone}
                />

                <FieldError message={errors.phone?.message} />
              </div>

              <div className="space-y-2">
                <label htmlFor="website" className="text-sm font-medium">
                  Website
                </label>

                <Input
                  id="website"
                  type="url"
                  {...register("website")}
                  placeholder="https://example.com"
                  aria-invalid={!!errors.website}
                />

                <FieldError message={errors.website?.message} />
              </div>

              <div className="space-y-2">
                <label htmlFor="industry" className="text-sm font-medium">
                  Industry
                </label>

                <Input
                  id="industry"
                  {...register("industry")}
                  placeholder="e.g. Health & Wellness"
                  aria-invalid={!!errors.industry}
                />

                <FieldError message={errors.industry?.message} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>

            <p className="text-sm text-muted-foreground">
              Update the project requirements and commercial details.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2.5">
                <label htmlFor="budget" className="text-sm font-medium">
                  Project Type
                </label>

                <Select
                  value={projectType}
                  onValueChange={(value) =>
                    setValue("projectType", value as ProjectType, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger
                    aria-invalid={!!errors.projectType}
                    className="h-11 w-full rounded-md border-border bg-background px-3 text-sm shadow-sm transition-colors hover:border-primary/50 focus:ring-2 focus:ring-primary/20 data-placeholder:text-muted-foreground"
                  >
                    <SelectValue placeholder="Choose a project type" />
                  </SelectTrigger>

                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="cursor-pointer"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FieldError message={errors.projectType?.message} />
              </div>

              <div className="space-y-2">
                <label htmlFor="budget" className="text-sm font-medium">
                  Budget
                </label>

                <Input
                  id="budget"
                  {...register("budget")}
                  placeholder="$10,000 - $20,000"
                  aria-invalid={!!errors.budget}
                />

                <FieldError message={errors.budget?.message} />
              </div>

              <div className="space-y-2">
                <label htmlFor="timeline" className="text-sm font-medium">
                  Timeline
                </label>

                <Input
                  id="timeline"
                  {...register("timeline")}
                  placeholder="2-3 months"
                  aria-invalid={!!errors.timeline}
                />

                <FieldError message={errors.timeline?.message} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="projectDetails" className="text-sm font-medium">
                Project Details
              </label>

              <Textarea
                id="projectDetails"
                {...register("projectDetails")}
                rows={7}
                placeholder="Describe the project requirements..."
                aria-invalid={!!errors.projectDetails}
              />

              <FieldError message={errors.projectDetails?.message} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>

            <p className="text-sm text-muted-foreground">
              Update additional information about how this contact found you.
            </p>
          </CardHeader>

          <CardContent>
            <div className="max-w-md space-y-2">
              <label htmlFor="referral" className="text-sm font-medium">
                Referral Source
              </label>

              <Input
                id="referral"
                {...register("referral")}
                placeholder="e.g. Google, Instagram, Referral"
                aria-invalid={!!errors.referral}
              />

              <FieldError message={errors.referral?.message} />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col-reverse gap-2 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/contacts/${contact.id}`)}
            disabled={updateContact.isPending}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={updateContact.isPending}>
            <Save className="size-4" />

            {updateContact.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
};

const EditContactPage = () => {
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading, isError } = useContact(id);

  const contact = data?.data?.contact;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-4 w-24 animate-pulse bg-muted" />

          <div className="mt-4 h-9 w-48 animate-pulse bg-muted" />

          <div className="mt-3 h-4 w-72 animate-pulse bg-muted" />
        </div>

        <div className="space-y-6">
          <div className="h-96 animate-pulse border border-border bg-muted/30" />

          <div className="h-80 animate-pulse border border-border bg-muted/30" />
        </div>
      </div>
    );
  }

  if (isError || !contact) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center text-center">
        <p className="text-sm font-medium">Unable to load contact</p>

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

  return (
    <div className="space-y-8">
      <div>
        <Link
          href={`/contacts/${contact.id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Contact
        </Link>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Contacts
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Edit Contact
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Update the information for {contact.name}.
          </p>
        </div>
      </div>

      <EditContactForm
        key={`${contact.id}-${contact.updatedAt}`}
        contact={contact}
      />
    </div>
  );
};

export default EditContactPage;
