export const ContactStatus = {
  NEW: "NEW",
  CONVERTED: "CONVERTED",
  SPAM: "SPAM",
} as const;

export type ContactStatus = (typeof ContactStatus)[keyof typeof ContactStatus];

export const LeadStatus = {
  NEW: "NEW",
  CONTACTED: "CONTACTED",
  QUALIFIED: "QUALIFIED",
  PROPOSAL: "PROPOSAL",
  WON: "WON",
  LOST: "LOST",
} as const;

export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus];

export const ProjectType = {
  WEBSITE: "WEBSITE",
  WEB_APPLICATION: "WEB_APPLICATION",
  SAAS_MVP: "SAAS_MVP",
  EXISTING_PRODUCT: "EXISTING_PRODUCT",
  ONGOING_DEVELOPMENT: "ONGOING_DEVELOPMENT",
  NOT_SURE: "NOT_SURE",
} as const;

export type ProjectType = (typeof ProjectType)[keyof typeof ProjectType];
