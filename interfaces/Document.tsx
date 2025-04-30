import { Client } from "@/interfaces/Client";
import { Collaborator } from "@/interfaces/Collaborator";

export interface Document {
  client: Client;
  name: string;
  start_date: string;
  end_date?: string;
  type: string;
  marketplaces: string[];
  package: string;
  minimum_package: number;
  performance: boolean;
  status: string;
  business_developper: Collaborator;
  manager: Collaborator;
  business_unit: string;
}
