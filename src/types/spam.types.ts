import type { Contact } from "./contact.types";

export interface SpamsResponse {
  status: "success";
  results: number;
  data: {
    contacts: Contact[];
  };
}

export interface SpamResponse {
  status: "success";
  data: {
    contact: Contact;
  };
}

export interface DeleteSpamResponse {
  status: "success";
  message: string;
}
