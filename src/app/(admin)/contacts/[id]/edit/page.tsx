"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ArrowLeft, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { toast } from "@/components/ui/toast";

import { useContact, useUpdateContact } from "@/hooks/apis/useContacts";
import { Contact, UpdateContactInput } from "@/types/contact.types";
import { ProjectType } from "@/types/common.types";
import TextField from "@/components/form-elements/text-field";
import ButtonBack from "@/components/common/buttons/button-back";
import { PageHeader } from "@/components/features/common/page-header";
import { PageLoader } from "@/components/common/loader/page-loader";
import SelectField from "@/components/form-elements/select-field";
import TextareaField from "@/components/form-elements/text-area-field";
import { projectTypes } from "@/lib/data/project-type";
import {
  EditContactFormValues,
  editContactSchema,
} from "@/lib/validations/contacts.validation";

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

interface EditContactFormProps {
  contact: Contact;
}

const EditContactForm = ({ contact }: EditContactFormProps) => {
  const router = useRouter();
  const updateContact = useUpdateContact();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditContactFormValues>({
    resolver: zodResolver(editContactSchema),
    defaultValues: getDefaultValues(contact),
  });

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
              <TextField
                name="name"
                label="Name"
                placeholder="Contact name"
                register={register("name")}
                error={errors.name?.message}
              />

              <TextField
                name="company"
                label="Company"
                placeholder="Company name"
                register={register("company")}
                error={errors.company?.message}
              />

              <TextField
                name="email"
                label="Email"
                placeholder="contact@example.com"
                register={register("email")}
                error={errors.email?.message}
              />

              <TextField
                name="phone"
                label="Phone"
                placeholder="+1 555 123 4567"
                register={register("phone")}
                error={errors.phone?.message}
              />

              <TextField
                name="website"
                label="Website"
                type="url"
                placeholder="https://example.com"
                register={register("website")}
                error={errors.website?.message}
              />

              <TextField
                name="industry"
                label="Industry"
                type="url"
                placeholder="e.g. Health & Wellness"
                register={register("industry")}
                error={errors.industry?.message}
              />
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
              <Controller
                name="projectType"
                control={control}
                render={({ field }) => (
                  <SelectField
                    name="projectType"
                    label="Project Type"
                    placeholder="Choose a project type"
                    options={projectTypes}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.projectType?.message}
                  />
                )}
              />

              <TextField
                name="budget"
                label="Budget"
                placeholder="₹10,000 - ₹20,000"
                register={register("budget")}
                error={errors.budget?.message}
              />

              <TextField
                name="timeline"
                label="Timeline"
                placeholder="2-3 months"
                register={register("timeline")}
                error={errors.timeline?.message}
              />
            </div>

            <TextareaField
              name="projectDetails"
              label="Project Details"
              placeholder="Tell us about your project..."
              rows={5}
              register={register("projectDetails")}
              error={errors.projectDetails?.message}
            />
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
            <TextField
              name="referral"
              label="Referral Source"
              placeholder="e.g. Google, Instagram, Referral"
              register={register("referral")}
              error={errors.referral?.message}
            />
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
    return <PageLoader />;
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
        <ButtonBack link={`/contacts/${contact.id}`} />

        <PageHeader
          title="Edit Contact"
          subTitle={`Update the information for ${contact.name}.`}
        />
      </div>

      <EditContactForm
        key={`${contact.id}-${contact.updatedAt}`}
        contact={contact}
      />
    </div>
  );
};

export default EditContactPage;
