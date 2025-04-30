import { Collaborator } from "@/interfaces/Collaborator";
import { ClientDetails } from "@/interfaces/ClientDetails";
import { Expenses } from "@/interfaces/Expenses";
import { Document } from "@/interfaces/Document";

export interface Client {
  name: string;
  marketplaces: string[];
  minimum_package: number;
  average_invoicing?: number;
  business_developper: Collaborator;
  global_lead_1: Collaborator;
  global_lead_2?: Collaborator;
  email?: string;
  details?: ClientDetails;
  expenses?: Expenses[];
  documents?: Document[];
  collaborators?: Collaborator[];
}
