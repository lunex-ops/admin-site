"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

import {
  useContact,
  useUpdateContact,
  type Contact,
} from "@/hooks/apis/useContacts";

interface EditContactFormProps {
  contact: Contact;
}

const EditContactForm = ({ contact }: EditContactFormProps) => {
  const router = useRouter();
  const updateContact = useUpdateContact();

  const [form, setForm] = useState({
    name: contact.name,
    company: contact.company,
    email: contact.email,
    website: contact.website ?? "",
    projectType: contact.projectType,
    budget: contact.budget ?? "",
    timeline: contact.timeline ?? "",
    projectDetails: contact.projectDetails ?? "",
    referral: contact.referral ?? "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateContact.mutate(
      {
        id: contact.id,
        payload: {
          ...form,
          website: form.website || undefined,
          budget: form.budget || undefined,
          timeline: form.timeline || undefined,
          projectDetails: form.projectDetails || undefined,
          referral: form.referral || undefined,
        },
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
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>

              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">
                Company
              </label>

              <Input
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="text-sm font-medium">
                Website
              </label>

              <Input
                id="website"
                name="website"
                type="url"
                value={form.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="projectType" className="text-sm font-medium">
                Project Type
              </label>

              <Input
                id="projectType"
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="budget" className="text-sm font-medium">
                Budget
              </label>

              <Input
                id="budget"
                name="budget"
                value={form.budget}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="timeline" className="text-sm font-medium">
                Timeline
              </label>

              <Input
                id="timeline"
                name="timeline"
                value={form.timeline}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="referral" className="text-sm font-medium">
                Referral
              </label>

              <Input
                id="referral"
                name="referral"
                value={form.referral}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-2">
            <label htmlFor="projectDetails" className="text-sm font-medium">
              Project Details
            </label>

            <textarea
              id="projectDetails"
              name="projectDetails"
              value={form.projectDetails}
              onChange={handleChange}
              rows={6}
              className="flex w-full border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Project details..."
            />
          </div>

          {/* Actions */}
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
        </CardContent>
      </Card>
    </form>
  );
};

const EditContactPage = () => {
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading, isError } = useContact(id);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Contacts
          </p>

          <h1 className="text-3xl font-semibold">Edit Contact</h1>
        </div>

        <div className="border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Loading contact...</p>
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="space-y-8">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Contacts
          </p>

          <h1 className="text-3xl font-semibold">Edit Contact</h1>
        </div>

        <div className="border border-danger/30 bg-danger/5 p-6">
          <p className="text-sm text-danger">Unable to load this contact.</p>
        </div>
      </div>
    );
  }

  const contact = data.data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Contacts
          </p>

          <h1 className="text-3xl font-semibold">Edit Contact</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Update the contact information below.
          </p>
        </div>

        <Button variant="outline">
          <Link href={`/contacts/${id}`}>
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
      </div>

      {/* Form */}
      <EditContactForm key={contact.id + contact.updatedAt} contact={contact} />
    </div>
  );
};

export default EditContactPage;
