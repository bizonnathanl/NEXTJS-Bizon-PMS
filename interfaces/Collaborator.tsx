import { CollaboratorDetails } from "@/interfaces/CollaboratorDetails";
import { Rank } from "@/interfaces/Rank";
import { Client } from "@/interfaces/Client";

export interface Collaborator {
  picture?: string;
  first_name: string;
  last_name: string;
  languages: string[];
  job_title: string;
  rank: Rank;
  statut: string;
  business_unit: string;
  client?: Client[];
  manager?: Collaborator;
  details?: CollaboratorDetails;
  subordinates?: Collaborator[];
}
