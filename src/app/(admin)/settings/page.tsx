"use client";

import { useEffect } from "react";

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
import { SettingsFormValues, settingsSchema } from "@/lib/validations";
import { SettingLoader } from "@/components/features/common/loaders/setting-loader";
import { SettingError } from "@/components/features/common/errors/setting-error";
import { PageHeader } from "@/components/features/common/page-header";

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
    return <SettingLoader />;
  }

  if (isError || !settings) {
    return <SettingError />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Workspace"
        pageName="Settings"
        subTitle="Manage your agency and workspace preferences."
      />

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
