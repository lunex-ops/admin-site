export const formatValue = (value: string | null | undefined) => {
  if (!value) return "—";

  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const formatDate = (value: string | null | undefined) => {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

export const formatDateTime = (value: string | null | undefined) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

export const formatCurrency = (value: number | null | undefined) => {
  if (value === null || value === undefined) return "—";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

export const roleStyles: Record<string, string> = {
  SUPER_ADMIN: "bg-purple-500/10 text-purple-600",
  ADMIN: "bg-blue-500/10 text-blue-600",
  MODERATOR: "bg-yellow-500/10 text-yellow-600",
  USER: "bg-muted text-muted-foreground",
};

export const contactStatusStyles: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-600",
  CONVERTED: "bg-green-500/10 text-green-600",
  SPAM: "bg-red-500/10 text-red-600",
};

export const leadStatusStyles: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-600",
  CONTACTED: "bg-yellow-500/10 text-yellow-600",
  QUALIFIED: "bg-purple-500/10 text-purple-600",
  PROPOSAL: "bg-orange-500/10 text-orange-600",
  WON: "bg-green-500/10 text-green-600",
  LOST: "bg-red-500/10 text-red-600",
};

export const userStatusStyles: Record<string, string> = {
  ACTIVE: "bg-green-500/10 text-green-600",
  INACTIVE: "bg-red-500/10 text-red-600",
};
