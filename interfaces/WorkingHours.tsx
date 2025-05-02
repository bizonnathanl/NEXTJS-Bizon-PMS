import { Client } from "@/interfaces/Client";
import { Collaborator } from "@/interfaces/Collaborator";

export interface WorkingHours {
  client: Client;
  collaborator: Collaborator;
  consulting_hours: number;
  op_hours: number;
}
