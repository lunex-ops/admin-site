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

export const getDateTimeLocalValue = (value: string | null) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const formatCurrency = (value: number | null | undefined) => {
  if (value === null || value === undefined) return "—";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

export const getInitials = (name: string | null | undefined) => {
  if (!name) return "A";

  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export const roleStyles: Record<string, string> = {
  SUPER_ADMIN: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
  ADMIN: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  MODERATOR: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  USER: "bg-slate-500/10 text-slate-700 dark:text-slate-400",
};

export const contactStatusStyles: Record<string, string> = {
  NEW: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  CONVERTED: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  SPAM: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
};

export const leadStatusStyles: Record<string, string> = {
  NEW: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  CONTACTED: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  QUALIFIED: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
  PROPOSAL: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  WON: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  LOST: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
};

export const userStatusStyles: Record<string, string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  INACTIVE: "bg-slate-500/10 text-slate-700 dark:text-slate-400",
};
