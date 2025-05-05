// app/my-dashboard/page.tsx
"use client";
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/item/MetricCard";
import {
  CustomPieChart,
  CustomPieDataItem,
} from "@/components/charts/CustomPieChart";
import {
  WarningClientTable,
  ClientRowData,
} from "@/components/tables/WarningClientTable";
import { SmoothLineChart } from "@/components/charts/SmoothLineChart";
import { SteppedLineChart } from "@/components/charts/SteppedLineChart";

import { Collaborator } from "@/interfaces/Collaborator";
import * as Collaborators from "@/data/Collaborators";
import * as Ranks from "@/data/Ranks";

interface UnitDataItem {
  collaborators: number;
  languages: number;
  package: number;
  averageInvoice: number;
  director: string;
  theoricalMargin: number;
  realMargin: number;
  theoricalHours: number;
  realHours: number;
  theoricalFilling: number;
  realFilling: number;
  invoicing: number;
  clients: number;
  contracts: number;
  remainingTime: number;
}

export default function DashboardPage() {
  const unitData: UnitDataItem = {
    collaborators: 40,
    languages: 6,
    package: 13460,
    averageInvoice: 135460,
    director: "Nicolas HABERT",
    theoricalMargin: 0.75,
    realMargin: 0.71,
    theoricalHours: 72,
    realHours: 69,
    theoricalFilling: 1,
    realFilling: 0.96,
    invoicing: 133460,
    clients: 56,
    contracts: 149,
    remainingTime: 20,
  };

  // Données graphiques
  const smoothData = [
    { month: "Janv.", target: 150, real: 160 },
    { month: "Fév.", target: 100, real: 90 },
    { month: "Mars", target: 110, real: 60 },
    { month: "Avr.", target: 130, real: 170 },
    { month: "Mai.", target: 80, real: 75 },
    { month: "Juin", target: 120, real: 140 },
  ];
  const steppedData = [
    { month: "Janv.", a: 80, b: 120 },
    { month: "Fév.", a: 100, b: 100 },
    { month: "Mars", a: 60, b: 110 },
    { month: "Avr.", a: 170, b: 130 },
    { month: "Mai.", a: 75, b: 80 },
    { month: "Juin", a: 140, b: 120 },
  ];
  const linesSmooth = [
    { dataKey: "target", name: "Objectif", color: "#7C67FF" },
    { dataKey: "real", name: "Réel", color: "#5EFBFB" },
  ];
  const linesStep = [
    { dataKey: "a", name: "Théorique", color: "#7C67FF" },
    { dataKey: "b", name: "Réel", color: "#5EFBFB" },
  ];
  const contractsTypeData: CustomPieDataItem[] = [
    { name: "Alternant", value: 30 },
    { name: "CDI", value: 30 },
    { name: "CDD", value: 5 },
  ];
  const rankData: CustomPieDataItem[] = [
    { name: "Senior 1", value: 8 },
    { name: "Senior 2", value: 6 },
    { name: "Junior 1", value: 10 },
    { name: "Junior 2", value: 12 },
    { name: "Confirmé 1", value: 9 },
    { name: "Confirmé 2", value: 10 },
    { name: "Assistant", value: 14 },
  ];

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
          consulting: 1.5,
          rank: Ranks.DIRECTOR,
        },
        {
          first_name: "Aymeric",
          last_name: "VURPILLOT",
          job_title: "Consultant Senior",
          op: 8,
          consulting: 3,
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
          minimum_package: 10000,
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
          op: 4,
          consulting: 4,
          rank: Ranks.SENIOR_1,
        },
        {
          first_name: "Élise",
          last_name: "BLANC",
          job_title: "Consultant Junior",
          op: 11.75,
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
  ];

  return (
    <div className="w-[80vw] flex min-h-screen">
      <main className="flex-1 pl-4 space-y-8 overflow-auto">
        <PageHeader
          breadcrumbs={[{ label: "Tableau de bord - Direction" }]}
          title="Tableau de bord"
          subtitle="En tant que membre de la direction, vous avez accès aux informations de l'ensemble de l'agence. Ce tableau de bord vous permet la visualisation au global ou par BU."
        />

        <div className="flex items-center gap-2 mb-4">
          <MetricCard label="Langues parlées" value={unitData.languages} />
          <MetricCard label="Collaborateurs" value={unitData.collaborators} />
          <MetricCard
            label="Forfait minimum"
            value={unitData.package}
            unit="€"
          />
          <MetricCard
            label="Facturation moyenne"
            value={unitData.averageInvoice}
            unit="€"
          />
          <MetricCard
            label="Remplissage"
            value={unitData.realFilling * 100}
            unit="%"
          />
          <MetricCard label="Directeur" value={unitData.director} />
        </div>

        <div className="flex flex-col gap-8 mb-16">
          <div className="flex items-center justify-between gap-8">
            <SteppedLineChart
              title="Taux de remplissage"
              data={steppedData}
              lines={linesStep}
              height={450}
            />
            <SmoothLineChart
              title="Facturation mensuelle"
              data={smoothData}
              lines={linesSmooth}
              height={450}
            />
          </div>
          <div className="flex items-center justify-between gap-8">
            <CustomPieChart
              title="Composition de l'équipe par type de contrat"
              data={contractsTypeData}
            />
            <CustomPieChart
              title="Composition de l'équipe par grade"
              data={rankData}
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-anton mb-4">Clients défaillants</h2>
          <WarningClientTable rows={ClientsRows} />
        </div>
      </main>
    </div>
  );
}
