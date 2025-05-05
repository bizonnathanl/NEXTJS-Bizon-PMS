import { Client } from "@/interfaces/Client";
import * as Collaborators from "@/data/Collaborators";
import * as RM from "@/data/RMWorkPlans";
import * as RO from "@/data/ROWorkPlans";
import * as Doc from "@/data/Documents";

export const CAFES_FOLLIET: Client = {
  name: "Cafés Folliet",
  marketplaces: ["FR", "UK", "ES"],
  minimum_package: 2000,
  business_developper: Collaborators.MATTHIEU,
  global_lead_1: Collaborators.ARNAUD,
  collaborators: [Collaborators.NATHAN, Collaborators.ARNAUD],
  // documents: [Doc.CONTRACT_1],
};

export const VERMES_BV: Client = {
  name: "Vermes BV",
  marketplaces: ["FR", "UK", "ES"],
  minimum_package: 2000,
  business_developper: Collaborators.MATTHIEU,
  global_lead_1: Collaborators.THIBAUT,
  global_lead_2: Collaborators.AYMERIC,
  collaborators: [
    Collaborators.THIBAUT,
    Collaborators.NATHAN,
    Collaborators.ELISE,
    Collaborators.AYMERIC,
  ],
  // documents: [Doc.CONTRACT_2],
};

export const ALFAPAC: Client = {
  name: "Alfapac",
  marketplaces: ["FR"],
  minimum_package: 2000,
  business_developper: Collaborators.MATTHIEU,
  global_lead_1: Collaborators.ARNAUD,
  global_lead_2: Collaborators.NATHAN,
  collaborators: [
    Collaborators.NATHAN,
    Collaborators.ARNAUD,
    Collaborators.ELISE,
  ],
  // documents: [Doc.DEVIS_2],
};

export const SFA_SANIFLO: Client = {
  name: "SFA Saniflo",
  marketplaces: ["FR", "UK", "IT"],
  minimum_package: 2000,
  business_developper: Collaborators.MATTHIEU,
  global_lead_1: Collaborators.THIBAUT,
  global_lead_2: Collaborators.AYMERIC,
  collaborators: [
    Collaborators.NATHAN,
    Collaborators.ARNAUD,
    Collaborators.ELISE,
    Collaborators.AYMERIC,
  ],
  // documents: [Doc.DEVIS_1],
};

export const F1_DISTRIBUTION: Client = {
  name: "F1 Distribution",
  marketplaces: ["FR", "UK", "ES"],
  minimum_package: 2000,
  business_developper: Collaborators.MATTHIEU,
  global_lead_1: Collaborators.THIBAUT,
  global_lead_2: Collaborators.AYMERIC,
  collaborators: [
    Collaborators.THIBAUT,
    Collaborators.ELISE,
    Collaborators.AYMERIC,
  ],
  // documents: [Doc.CONTRACT_1, Doc.DEVIS_1],
};
