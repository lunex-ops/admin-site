import { z } from "zod";

export const editLeadSchema = z.object({
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

export type EditLeadFormValues = z.infer<typeof editLeadSchema>;
