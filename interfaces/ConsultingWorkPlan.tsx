import { Client } from "@/interfaces/Client";
import { Collaborator } from "@/interfaces/Collaborator";

export interface ConsultingWorkPlans {
  client?: Client; // A rendre obligatoire une fois la DB créée
  collaborator: Collaborator;
  total_hours: number;
  call_hours: number;
  reports_hours: number;
  management_hours: number;
  edl_update_hours: number;
  edl_management_hours: number;
  edl_analyse_hours: number;
  stock_management_hours: number;
  support_hours: number;
  other_analyses_hours: number;
  optimization_hours: number;
}
