import { Document } from "@/interfaces/Document";

export interface Invoice {
  title: string;
  amount: number;
  sending_date: string;
  payment_date?: string;
  status: string;
  file: string;
  document: Document;
}
