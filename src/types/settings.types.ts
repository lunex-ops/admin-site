export interface Settings {
  id: string;
  agencyName: string | null;
  agencyEmail: string | null;
  agencyPhone: string | null;
  websiteUrl: string | null;
  timezone: string;
  currency: string;
}

export interface UpdateSettingsInput {
  agencyName?: string | null;
  agencyEmail?: string | null;
  agencyPhone?: string | null;
  websiteUrl?: string | null;
  timezone?: string;
  currency?: string;
}

export interface SettingsResponse {
  status: "success";
  data: {
    settings: Settings;
  };
}
