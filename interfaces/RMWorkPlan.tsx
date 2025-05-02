import { Client } from "@/interfaces/Client";
import { Collaborator } from "@/interfaces/Collaborator";

export interface RMWorkPlans {
  client?: Client; // A rendre obligatoire une fois la DB créée
  collaborator: Collaborator;
  total_hours: number;
  call_hours: number;
  reports_hours: number;
  management_hours: number;
  strategy_hours: number;
  other_analyses_hours: number;
  optimization_hours: number;
}
