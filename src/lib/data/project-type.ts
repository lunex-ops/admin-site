export const projectTypes = [
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

export const leadStatuses = [
  {
    value: "NEW",
    label: "New",
  },
  {
    value: "CONTACTED",
    label: "Contacted",
  },
  {
    value: "QUALIFIED",
    label: "Qualified",
  },
  {
    value: "PROPOSAL",
    label: "Proposal",
  },
  {
    value: "WON",
    label: "Won",
  },
  {
    value: "LOST",
    label: "Lost",
  },
] as const;
