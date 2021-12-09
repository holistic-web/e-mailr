export interface User {
  uid?: string;
  email: string;
}

export interface Recipient {
  firstname: string;
  lastname: string;
  address1: string;
  address2: string;
  country: string;
  city: string;
  state: string;
  zip: string;
}

export enum DocumentStatus {
  DRAFT = "DRAFT",
  SENT = "SENT",
}

export interface Document {
  _id?: string;
  userId: string;
  textContent: string;
  recipient: Recipient;
  status: DocumentStatus;
  stripeSessionId?: string;
}
