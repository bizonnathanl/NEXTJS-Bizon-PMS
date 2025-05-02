import { Collaborator } from "@/interfaces/Collaborator";
import * as Ranks from "@/data/Ranks";

export const THIBAUT: Collaborator = {
  picture: "/workers/Thibaut_Triki.png",
  first_name: "Thibaut",
  last_name: "TRIKI",
  languages: ["FR", "UK"],
  job_title: "Head of Strategy",
  rank: Ranks.DIRECTOR,
  statut: "Directeur",
  business_unit: "LCS",
};

export const MATTHIEU: Collaborator = {
  picture: "/workers/Thibaut_Triki.png",
  first_name: "Matthieu",
  last_name: "LAURANT",
  languages: ["FR", "UK"],
  job_title: "Internation Business Developer",
  rank: Ranks.DIRECTOR,
  statut: "Directeur",
  business_unit: "SALES",
};

export const ARNAUD: Collaborator = {
  picture: "/workers/Arnaud_Jarrot.png",
  first_name: "Arnaud",
  last_name: "JARROT",
  languages: ["FR", "UK"],
  job_title: "Account Manager",
  rank: Ranks.SENIOR_1,
  statut: "Manager",
  business_unit: "GGS",
};

export const AYMERIC: Collaborator = {
  picture: "/workers/Aymeric_Vurpillot.png",
  first_name: "Aymeric",
  last_name: "VURPILLOT",
  languages: ["FR", "UK"],
  job_title: "Consultant E-commerce",
  rank: Ranks.SENIOR_2,
  statut: "Manager",
  business_unit: "LCS",
  manager: THIBAUT,
};

export const NATHAN: Collaborator = {
  picture: "/workers/Nathan_Lefetey.jpeg",
  first_name: "Nathan",
  last_name: "LEFETEY",
  languages: ["FR", "UK"],
  job_title: "Account Manager",
  rank: Ranks.ALTERNATE,
  statut: "Normal",
  business_unit: "GGS",
  manager: ARNAUD,
};

export const ELISE: Collaborator = {
  picture: "/workers/Elise_Blanc.png",
  first_name: "Élise",
  last_name: "BLANC",
  languages: ["FR", "UK"],
  job_title: "Consultant E-commerce",
  rank: Ranks.JUNIOR_1,
  statut: "Normal",
  business_unit: "LCS",
  manager: AYMERIC,
};
