export type ContactStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED";

export interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string | null;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
}
