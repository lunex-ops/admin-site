"use client";

import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RotateCcw, Save, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";

import { useSettings, useUpdateSettings } from "@/hooks/apis/useSettings";
import { UpdateSettingsInput } from "@/types/settings.types";

const settingsSchema = z.object({
  agencyName: z
    .string()
    .trim()
    .max(100, "Agency name must be 100 characters or less")
    .optional()
    .or(z.literal("")),

  agencyEmail: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be 255 characters or less")
    .optional()
    .or(z.literal("")),

  agencyPhone: z
    .string()
    .trim()
    .max(30, "Phone number must be 30 characters or less")
    .optional()
    .or(z.literal("")),

  websiteUrl: z
    .string()
    .trim()
    .url("Please enter a valid website URL")
    .max(500, "Website URL must be 500 characters or less")
    .optional()
    .or(z.literal("")),

  timezone: z
    .string()
    .trim()
    .min(1, "Timezone is required")
    .max(100, "Timezone must be 100 characters or less"),

  currency: z
    .string()
    .trim()
    .min(3, "Currency must be 3 characters")
    .max(3, "Currency must be 3 characters")
    .regex(/^[A-Za-z]{3}$/, "Currency must be a 3-letter code"),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

/* -------------------------------------------------------------------------- */
/*                              Settings Page                                 */
/* -------------------------------------------------------------------------- */

const SettingsPage = () => {
  const { data, isLoading, isError } = useSettings();

  const { mutate: updateSettings, isPending: isUpdating } = useUpdateSettings();

  const settings = data?.data?.settings;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),

    defaultValues: {
      agencyName: "",
      agencyEmail: "",
      agencyPhone: "",
      websiteUrl: "",
      timezone: "",
      currency: "",
    },

    mode: "onBlur",
  });

  useEffect(() => {
    if (!settings) {
      return;
    }

    reset({
      agencyName: settings.agencyName ?? "",
      agencyEmail: settings.agencyEmail ?? "",
      agencyPhone: settings.agencyPhone ?? "",
      websiteUrl: settings.websiteUrl ?? "",
      timezone: settings.timezone ?? "",
      currency: settings.currency ?? "",
    });
  }, [settings, reset]);

  const onSubmit = (values: SettingsFormValues) => {
    const payload: UpdateSettingsInput = {
      agencyName: values.agencyName?.trim() || null,
      agencyEmail: values.agencyEmail?.trim() || null,
      agencyPhone: values.agencyPhone?.trim() || null,
      websiteUrl: values.websiteUrl?.trim() || null,
      timezone: values.timezone.trim(),
      currency: values.currency.trim().toUpperCase(),
    };

    updateSettings(payload, {
      onSuccess: () => {
        reset({
          agencyName: values.agencyName?.trim() ?? "",
          agencyEmail: values.agencyEmail?.trim() ?? "",
          agencyPhone: values.agencyPhone?.trim() ?? "",
          websiteUrl: values.websiteUrl?.trim() ?? "",
          timezone: values.timezone.trim(),
          currency: values.currency.trim().toUpperCase(),
        });

        toast.add({
          title: "Settings saved",
          description:
            "Your workspace settings have been updated successfully.",
        });
      },

      onError: (error) => {
        toast.add({
          type: "error",
          title: "Unable to save settings",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
        });
      },
    });
  };

  const handleReset = () => {
    if (!settings) {
      return;
    }

    reset({
      agencyName: settings.agencyName ?? "",
      agencyEmail: settings.agencyEmail ?? "",
      agencyPhone: settings.agencyPhone ?? "",
      websiteUrl: settings.websiteUrl ?? "",
      timezone: settings.timezone ?? "",
      currency: settings.currency ?? "",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-4 w-28 animate-pulse bg-muted" />

          <div className="mt-4 h-9 w-40 animate-pulse bg-muted" />

          <div className="mt-3 h-4 w-80 animate-pulse bg-muted" />
        </div>

        <div className="border border-border bg-card">
          <div className="border-b border-border p-5">
            <div className="h-5 w-32 animate-pulse bg-muted" />

            <div className="mt-2 h-3 w-64 animate-pulse bg-muted" />
          </div>

          <div className="space-y-8 p-5">
            {Array.from({ length: 2 }).map((_, sectionIndex) => (
              <div key={sectionIndex}>
                <div className="h-4 w-36 animate-pulse bg-muted" />

                <div className="mt-2 h-3 w-64 animate-pulse bg-muted" />

                <div className="my-5 h-px w-full bg-muted" />

                <div className="grid gap-6 md:grid-cols-2">
                  {Array.from({ length: sectionIndex === 0 ? 4 : 2 }).map(
                    (_, index) => (
                      <div key={index} className="space-y-2">
                        <div className="h-3 w-24 animate-pulse bg-muted" />

                        <div className="h-10 w-full animate-pulse bg-muted/50" />
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end border-t border-border p-5">
            <div className="h-10 w-32 animate-pulse bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !settings) {
    return (
      <div className="space-y-8">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Workspace
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage your agency and workspace preferences.
          </p>
        </div>

        <div className="flex min-h-48 flex-col items-center justify-center border border-border bg-card p-6 text-center">
          <Settings2 className="size-8 text-muted-foreground/50" />

          <p className="mt-4 text-sm font-medium">Unable to load settings</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Workspace
        </p>

        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage your agency and workspace preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="border border-border bg-card">
          <div className="border-b border-border p-5">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center bg-muted">
                <Settings2 className="size-4 text-muted-foreground" />
              </div>

              <div>
                <h2 className="font-medium">General Settings</h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Configure your agency information and workspace preferences.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8 p-5">
            <section>
              <div>
                <h3 className="text-sm font-medium">Agency Information</h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  Basic information about your agency.
                </p>
              </div>

              <Separator className="my-5" />

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="agencyName">Agency Name</Label>

                  <Input
                    id="agencyName"
                    placeholder="Your agency name"
                    aria-invalid={Boolean(errors.agencyName)}
                    aria-describedby={
                      errors.agencyName ? "agencyName-error" : undefined
                    }
                    {...register("agencyName")}
                  />

                  {errors.agencyName && (
                    <p
                      id="agencyName-error"
                      className="text-xs text-destructive"
                    >
                      {errors.agencyName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agencyEmail">Agency Email</Label>

                  <Input
                    id="agencyEmail"
                    type="email"
                    placeholder="contact@example.com"
                    aria-invalid={Boolean(errors.agencyEmail)}
                    aria-describedby={
                      errors.agencyEmail ? "agencyEmail-error" : undefined
                    }
                    {...register("agencyEmail")}
                  />

                  {errors.agencyEmail && (
                    <p
                      id="agencyEmail-error"
                      className="text-xs text-destructive"
                    >
                      {errors.agencyEmail.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agencyPhone">Agency Phone</Label>

                  <Input
                    id="agencyPhone"
                    type="tel"
                    placeholder="+1 555-000-0000"
                    aria-invalid={Boolean(errors.agencyPhone)}
                    aria-describedby={
                      errors.agencyPhone ? "agencyPhone-error" : undefined
                    }
                    {...register("agencyPhone")}
                  />

                  {errors.agencyPhone && (
                    <p
                      id="agencyPhone-error"
                      className="text-xs text-destructive"
                    >
                      {errors.agencyPhone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL</Label>

                  <Input
                    id="websiteUrl"
                    type="url"
                    placeholder="https://example.com"
                    aria-invalid={Boolean(errors.websiteUrl)}
                    aria-describedby={
                      errors.websiteUrl ? "websiteUrl-error" : undefined
                    }
                    {...register("websiteUrl")}
                  />

                  {errors.websiteUrl && (
                    <p
                      id="websiteUrl-error"
                      className="text-xs text-destructive"
                    >
                      {errors.websiteUrl.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section>
              <div>
                <h3 className="text-sm font-medium">Workspace Preferences</h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  Configure the timezone and currency used by the workspace.
                </p>
              </div>

              <Separator className="my-5" />

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>

                  <Input
                    id="timezone"
                    placeholder="Asia/Kolkata"
                    aria-invalid={Boolean(errors.timezone)}
                    aria-describedby={
                      errors.timezone
                        ? "timezone-error"
                        : "timezone-description"
                    }
                    {...register("timezone")}
                  />

                  {errors.timezone ? (
                    <p id="timezone-error" className="text-xs text-destructive">
                      {errors.timezone.message}
                    </p>
                  ) : (
                    <p
                      id="timezone-description"
                      className="text-xs text-muted-foreground"
                    >
                      Example: Asia/Kolkata
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>

                  <Input
                    id="currency"
                    placeholder="INR"
                    maxLength={3}
                    className="uppercase"
                    aria-invalid={Boolean(errors.currency)}
                    aria-describedby={
                      errors.currency
                        ? "currency-error"
                        : "currency-description"
                    }
                    {...register("currency")}
                  />

                  {errors.currency ? (
                    <p id="currency-error" className="text-xs text-destructive">
                      {errors.currency.message}
                    </p>
                  ) : (
                    <p
                      id="currency-description"
                      className="text-xs text-muted-foreground"
                    >
                      Use a 3-letter ISO currency code, e.g. INR, USD, EUR.
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              {isDirty
                ? "You have unsaved changes."
                : "Your settings are up to date."}
            </p>

            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={!isDirty || isUpdating}
                onClick={handleReset}
              >
                <RotateCcw className="size-4" />
                Reset
              </Button>

              <Button type="submit" disabled={!isDirty || isUpdating}>
                <Save className="size-4" />

                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
