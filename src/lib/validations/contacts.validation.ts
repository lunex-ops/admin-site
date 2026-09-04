import { z } from "zod";

export const editContactSchema = z.object({
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

export type EditContactFormValues = z.infer<typeof editContactSchema>;
