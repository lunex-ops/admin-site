import { z } from "zod";

export const settingsSchema = z.object({
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

export type SettingsFormValues = z.infer<typeof settingsSchema>;
