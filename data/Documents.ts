import { Document } from "@/interfaces/Document";
import * as Clients from "@/data/Clients";
import * as Collaborators from "@/data/Collaborators";

export const CONTRACT_1: Document = {
  client: Clients.ALFAPAC,
  name: "Retail Operations - Vendor",
  start_date: "01/01/2023",
  end_date: "01/01/2026",
  type: ["RO"],
  marketplaces: ["FR", "UK", "IT"],
  package: "Diamond",
  minimum_package: 8000,
  performance: true,
  status: "Actif",
  business_developper: Collaborators.MATTHIEU,
  manager: Collaborators.ARNAUD,
  business_unit: "GGS",
};

export const CONTRACT_2: Document = {
  client: Clients.CAFES_FOLLIET,
  name: "Retail Operations - Seller",
  start_date: "01/01/2024",
  end_date: "01/12/2026",
  type: ["RO", "RM"],
  marketplaces: ["FR"],
  package: "Gold",
  minimum_package: 4000,
  performance: true,
  status: "Actif",
  business_developper: Collaborators.MATTHIEU,
  manager: Collaborators.ARNAUD,
  business_unit: "GGS",
};

export const DEVIS_1: Document = {
  client: Clients.F1_DISTRIBUTION,
  name: "Audit - Vendor",
  start_date: "01/01/2025",
  end_date: "01/06/2025",
  type: ["Consulting"],
  marketplaces: ["FR", "UK", "IT"],
  package: "Silver",
  minimum_package: 4000,
  performance: false,
  status: "Actif",
  business_developper: Collaborators.MATTHIEU,
  manager: Collaborators.THIBAUT,
  business_unit: "LCS",
};

export const DEVIS_2: Document = {
  client: Clients.VERMES_BV,
  name: "Setup - Vendor",
  start_date: "01/02/2025",
  end_date: "01/03/2025",
  type: ["Consulting"],
  marketplaces: ["FR", "UK", "IT", "DE", "ES"],
  package: "Platinium",
  minimum_package: 10000,
  performance: true,
  status: "Actif",
  business_developper: Collaborators.MATTHIEU,
  manager: Collaborators.AYMERIC,
  business_unit: "LCS",
};
