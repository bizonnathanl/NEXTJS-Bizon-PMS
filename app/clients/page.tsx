"use client";
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  ClientRowData,
  ListClientTable,
} from "@/components/tables/ListClientTable";
import * as Collaborators from "@/data/Collaborators";
import * as Ranks from "@/data/Ranks";

export default function ContractsPage() {
  const ClientsRows: ClientRowData[] = [
    {
      name: "F1 Distribution",
      global_lead_1: Collaborators.THIBAUT,
      consulting: 10.5,
      op: 16,
      cost: 300,
      billing: 4000,
      documents: [
        {
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
        },
      ],
      collaborators: [
        {
          first_name: "Thibaut",
          last_name: "TRIKI",
          job_title: "Head of Strategy",
          op: 2,
          consulting: 2,
          rank: Ranks.DIRECTOR,
        },
        {
          first_name: "Aymeric",
          last_name: "VURPILLOT",
          job_title: "Consultant Senior",
          op: 8,
          consulting: 5,
          rank: Ranks.SENIOR_1,
        },
        {
          first_name: "Élise",
          last_name: "BLANC",
          job_title: "Consultant Junior",
          op: 12,
          consulting: 5,
          rank: Ranks.JUNIOR_1,
        },
      ],
    },
    {
      name: "Vermes BV",
      global_lead_1: Collaborators.AYMERIC,
      consulting: 8,
      op: 12.5,
      cost: 800,
      billing: 2800,
      documents: [
        {
          name: "Setup - Vendor",
          start_date: "01/02/2025",
          end_date: "01/03/2025",
          type: ["Consulting"],
          marketplaces: ["FR", "UK", "IT", "DE", "ES"],
          package: "Platinium",
          minimum_package: 2800,
          performance: true,
          status: "Actif",
          business_developper: Collaborators.MATTHIEU,
          manager: Collaborators.AYMERIC,
          business_unit: "LCS",
        },
      ],
      collaborators: [
        {
          first_name: "Aymeric",
          last_name: "VURPILLOT",
          job_title: "Consultant Senior",
          op: 2,
          consulting: 1,
          rank: Ranks.SENIOR_1,
        },
        {
          first_name: "Élise",
          last_name: "BLANC",
          job_title: "Consultant Junior",
          op: 10.75,
          consulting: 6.25,
          rank: Ranks.JUNIOR_1,
        },
      ],
    },
    {
      name: "Alfapac",
      global_lead_1: Collaborators.ARNAUD,
      consulting: 0,
      op: 20,
      cost: 400,
      billing: 2400,
      documents: [
        {
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
        },
      ],
      collaborators: [
        {
          first_name: "Arnaud",
          last_name: "JARROT",
          job_title: "Account Manager",
          op: 5,
          consulting: 0,
          rank: Ranks.SENIOR_1,
        },
        {
          first_name: "Nathan",
          last_name: "LEFETEY",
          job_title: "Account Manager Junior",
          op: 8,
          consulting: 0,
          rank: Ranks.JUNIOR_1,
        },
        {
          first_name: "Flora",
          last_name: "RIBEIRO",
          job_title: "Account Manager Junior",
          op: 12,
          consulting: 0,
          rank: Ranks.JUNIOR_1,
        },
      ],
    },
    {
      name: "Cafés FOLLIET",
      global_lead_1: Collaborators.ARNAUD,
      consulting: 0,
      op: 14,
      cost: 550,
      billing: 2000,
      documents: [
        {
          name: "Retail Operations - Seller",
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
        },
      ],
      collaborators: [
        {
          first_name: "Arnaud",
          last_name: "JARROT",
          job_title: "Account Manager",
          op: 2,
          consulting: 0,
          rank: Ranks.SENIOR_1,
        },
        {
          first_name: "Nathan",
          last_name: "LEFETEY",
          job_title: "Account Manager Junior",
          op: 4,
          consulting: 0,
          rank: Ranks.JUNIOR_1,
        },
        {
          first_name: "Flora",
          last_name: "RIBEIRO",
          job_title: "Account Manager Junior",
          op: 8,
          consulting: 0,
          rank: Ranks.JUNIOR_1,
        },
      ],
    },
    {
      name: "SFA Saniflo",
      global_lead_1: Collaborators.ARNAUD,
      consulting: 0,
      op: 20,
      cost: 800,
      billing: 3000,
      documents: [
        {
          name: "Distribution",
          start_date: "01/01/2023",
          end_date: "01/01/2026",
          type: ["RO"],
          marketplaces: ["FR", "UK", "IT", "US"],
          package: "Diamond",
          minimum_package: 8000,
          performance: true,
          status: "Actif",
          business_developper: Collaborators.MATTHIEU,
          manager: Collaborators.ARNAUD,
          business_unit: "GGS",
        },
      ],
      collaborators: [
        {
          first_name: "Arnaud",
          last_name: "JARROT",
          job_title: "Account Manager",
          op: 6,
          consulting: 0,
          rank: Ranks.SENIOR_1,
        },
        {
          first_name: "Nathan",
          last_name: "LEFETEY",
          job_title: "Account Manager Junior",
          op: 4,
          consulting: 0,
          rank: Ranks.JUNIOR_1,
        },
        {
          first_name: "Flora",
          last_name: "RIBEIRO",
          job_title: "Account Manager Junior",
          op: 10,
          consulting: 0,
          rank: Ranks.JUNIOR_1,
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 pl-4 space-y-8 overflow-auto">
        <PageHeader
          breadcrumbs={[{ label: "Clients" }]}
          title="Clients"
          subtitle="Visualisez et détaillez l'ensemble des clients de l'agence."
        />
        <ListClientTable rows={ClientsRows} />
      </main>
    </div>
  );
}
