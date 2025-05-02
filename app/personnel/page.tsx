// app/dashboard/page.tsx (ou wherever your DashboardPage lives)
"use client";
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/item/MetricCard";
import {
  HoursBarChart,
  HoursDataItem,
} from "@/components/charts/HoursBarChart";
import {
  CustomPieChart,
  CustomPieDataItem,
} from "@/components/charts/CustomPieChart";
import {
  ClientDataTable,
  ClientRowData,
} from "@/components/tables/DashboardClientTable";

import { Collaborator } from "@/interfaces/Collaborator";
import * as Collaborators from "@/data/Collaborators";
import * as Ranks from "@/data/Ranks";

interface UserData {
  first_name: string;
  last_name: string;
  clients: number;
  contracts: number;
  minimumPackage: number;
  filling: number;
  remaining: number;
  n1: string;
}

export default function DashboardPage() {
  const userData: UserData = {
    first_name: "Thibaut",
    last_name: "TRIKI",
    clients: 12,
    contracts: 26,
    minimumPackage: 1_312_460,
    filling: 0.72,
    remaining: 26,
    n1: "Nicolas HABERT",
  };

  const barData: HoursDataItem[] = [
    { month: "Janv.", theoretical: 140, actual: 60 },
    { month: "Fév.", theoretical: 70, actual: 50 },
    { month: "Mars.", theoretical: 140, actual: 60 },
    { month: "Avril.", theoretical: 70, actual: 50 },
    { month: "Mai.", theoretical: 140, actual: 60 },
    { month: "Juin.", theoretical: 70, actual: 50 },
    { month: "Juil.", theoretical: 140, actual: 60 },
    { month: "Août.", theoretical: 70, actual: 50 },
    { month: "Sept.", theoretical: 140, actual: 60 },
    { month: "Oct.", theoretical: 70, actual: 50 },
    { month: "Nov.", theoretical: 70, actual: 50 },
    { month: "Déc.", theoretical: 140, actual: 60 },
  ];

  const contractsData: CustomPieDataItem[] = [
    { name: "Consulting", value: 30 },
    { name: "Audit", value: 25 },
    { name: "RO", value: 20 },
    { name: "RM", value: 25 },
  ];

  const packagesData: CustomPieDataItem[] = [
    { name: "Gold", value: 30 },
    { name: "Silver", value: 45 },
    { name: "Platinum", value: 15 },
    { name: "Diamond", value: 10 },
  ];

  const rowData: ClientRowData[] = [
    {
      client: "Vermes BV",
      lead: "Oui",
      marketplaces: ["FR", "IT", "DE"],
      contrats: 12,
      types: ["RO"],
      contact: "contact@vermesbv.com",
      hours: "11h30 / 10h",
      collaborators: [
        Collaborators.NATHAN,
        Collaborators.ARNAUD,
        Collaborators.THIBAUT,
      ],
    },
    {
      client: "Lestra",
      lead: "Arnaud JARROT",
      marketplaces: ["FR", "ES"],
      contrats: 5,
      types: ["RM"],
      contact: "support@lestra.fr",
      hours: "9h00 / 10h",
      collaborators: [
        Collaborators.ELISE,
        Collaborators.AYMERIC,
        Collaborators.THIBAUT,
      ],
    },
    {
      client: "Cafés Folliet",
      lead: "Oui",
      marketplaces: ["FR"],
      contrats: 7,
      types: ["RO", "RM"],
      contact: "info@cafesfolliet.fr",
      hours: "13h15 / 12h",
      collaborators: [
        Collaborators.NATHAN,
        Collaborators.ARNAUD,
        Collaborators.ELISE,
        Collaborators.AYMERIC,
      ],
    },
  ];

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 pl-4 space-y-8 overflow-auto">
        <PageHeader
          breadcrumbs={[{ label: "Tableau de bord" }]}
          title={`Bienvenue sur ton tableau de bord ${userData.first_name} :)`}
          subtitle="Head of Strategy · LCS · Depuis le 01/01/2025"
        />

        <div className="flex items-center gap-2 mb-8">
          <MetricCard label="Clients accompagnés" value={userData.clients} />
          <MetricCard label="Contrats en cours" value={userData.contracts} />
          <MetricCard
            label="Forfait minimum"
            value={userData.minimumPackage}
            unit="€"
          />
          <MetricCard
            label="Remplissage"
            value={userData.filling * 100}
            unit="%"
          />
          <MetricCard
            label="Temps restant"
            value={userData.remaining}
            unit="h"
          />
          <MetricCard label="N+1" value={userData.n1} />
        </div>

        <HoursBarChart title="Charge horaire" data={barData} />

        <div className="flex flex-col gap-8 mb-16">
          <h2 className="text-2xl font-anton mb-0">Clients accompagnés</h2>
          <div className="flex items-center justify-between gap-8">
            <CustomPieChart
              title="Répartition par type de contrat"
              data={contractsData}
            />
            <CustomPieChart
              title="Répartition par type de package"
              colors={["#fbc02d", "#bdbdbd", "#90a4ae", "#039be5"]}
              data={packagesData}
            />
          </div>
        </div>

        <div>
          <ClientDataTable rows={rowData} />
        </div>
      </main>
    </div>
  );
}
