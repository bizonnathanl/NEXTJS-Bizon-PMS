import { Document } from "@/interfaces/Document";
import * as Clients from "@/data/Clients";
import * as Collaborators from "@/data/Collaborators";

export const CONTRACT_1: Document = {
  name: "Retail Operations - Vendor",
  start_date: "01/01/2023",
  end_date: "01/01/2026",
  document_type: "Contrat",
  type: ["RO"],
  marketplaces: ["FR", "UK", "IT"],
  package: "Diamond",
  minimum_package: 8000,
  performance: true,
  status: "Actif",
  business_unit: "GGS",
  manager: Collaborators.ARNAUD,
  business_developper: Collaborators.MATTHIEU,
  client: Clients.ALFAPAC,
};

export const CONTRACT_2: Document = {
  name: "Retail Operations - Seller",
  start_date: "01/06/2025",
  end_date: "01/12/2026",
  document_type: "Contrat",
  type: ["RO", "RM"],
  marketplaces: ["FR"],
  package: "Gold",
  minimum_package: 4000,
  performance: true,
  status: "À venir",
  business_unit: "GGS",
  business_developper: Collaborators.MATTHIEU,
  manager: Collaborators.ARNAUD,
  client: Clients.CAFES_FOLLIET,
};

export const DEVIS_1: Document = {
  name: "Audit - Vendor",
  start_date: "01/01/2025",
  end_date: "01/06/2025",
  document_type: "Devis",
  type: ["Consulting"],
  marketplaces: ["FR", "UK", "IT"],
  package: "Silver",
  minimum_package: 4000,
  performance: false,
  status: "Dernier mois",
  business_unit: "LCS",
  business_developper: Collaborators.MATTHIEU,
  manager: Collaborators.THIBAUT,
  client: Clients.F1_DISTRIBUTION,
};

export const DEVIS_2: Document = {
  name: "Setup - Vendor",
  start_date: "01/02/2025",
  end_date: "01/03/2025",
  document_type: "Devis",
  type: ["Consulting"],
  marketplaces: ["FR", "UK", "IT", "DE", "ES"],
  package: "Platinium",
  minimum_package: 10000,
  performance: true,
  status: "Clôturé",
  business_unit: "LCS",
  business_developper: Collaborators.MATTHIEU,
  manager: Collaborators.AYMERIC,
  client: Clients.VERMES_BV,
};
