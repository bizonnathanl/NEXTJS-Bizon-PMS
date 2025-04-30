"use client";
import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/item/MetricCard";
import { FilterPanel } from "@/components/item/ClientFilters";
import {
  CustomPieChart,
  CustomPieDataItem,
} from "@/components/charts/CustomPieChart";
import { DataTable, RowData } from "@/components/tables/DashboardClientTable";
import { SmoothLineChart } from "@/components/charts/SmoothLineChart";
import { SteppedLineChart } from "@/components/charts/SteppedLineChart";

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
  theoricalInvocing: number;
  realInvocing: number;
  clients: number;
  contracts: number;
  remainingTime: number;
}

export default function DashboardPage() {
  let unitData: UnitDataItem = {
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
    theoricalInvocing: 133460,
    realInvocing: 153460,
    clients: 56,
    contracts: 149,
    remainingTime: 20,
  };

  let facturationTagColor: string =
    unitData.realInvocing > unitData.theoricalInvocing
      ? "bg-custom-green"
      : "bg-custom-red";
  let marginTagColor: string =
    unitData.realMargin > 0.7 ? "bg-custom-green" : "bg-custom-red";
  let hoursTagColor: string =
    unitData.realHours > unitData.theoricalHours * 0.9
      ? unitData.realHours < unitData.theoricalHours * 1.1
        ? "bg-custom-green"
        : "bg-custom-red"
      : "bg-custom-red";

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
  return (
    <div className="flex min-h-screen">
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
            unit="€"
          />
          <MetricCard label="Directeur" value={unitData.director} />
        </div>

        <table className="w-full mb-4">
          <tbody className="w-full">
            <tr className="flex items-center justify-between bg-white text-dark font-os rounded-md p-3 w-full">
              <td className="w-fit flex items-center justify-center">
                <div className="flex flex-col justify-center items-center gap-2">
                  <span className="text-14 font-os font-bold mb-0">
                    Charge horaire
                  </span>
                  <span
                    className={`text-16 text-white px-2 py-1 rounded ${hoursTagColor}`}>
                    {unitData.realHours}h / {unitData.theoricalHours}h
                  </span>
                </div>
              </td>

              <td className="w-fit flex items-center justify-center">
                <div className="flex flex-col justify-center items-center gap-2">
                  <span className="text-14 font-os font-bold mb-0">Marge</span>
                  <span
                    className={`text-16 text-white px-2 py-1 rounded ${marginTagColor}`}>
                    {unitData.realMargin * 100} % /{" "}
                    {unitData.theoricalMargin * 100} %
                  </span>
                </div>
              </td>

              <td className="w-fit flex items-center justify-center">
                <div className="flex flex-col justify-center items-center gap-2">
                  <span className="text-14 font-os font-bold mb-0">
                    Facturation
                  </span>
                  <span
                    className={`text-16 text-white px-2 py-1 rounded ${facturationTagColor}`}>
                    {unitData.realInvocing.toLocaleString("fr-FR", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    € /{" "}
                    {unitData.theoricalInvocing.toLocaleString("fr-FR", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    €
                  </span>
                </div>
              </td>

              <td className="w-fit flex items-center justify-center">
                <div className="flex flex-col justify-center items-center gap-2">
                  <span className="text-14 font-os font-bold mb-0">
                    Clients
                  </span>
                  <span className="text-16 text-dark font-light">
                    {unitData.clients}
                  </span>
                </div>
              </td>

              <td className="w-fit flex items-center justify-center">
                <div className="flex flex-col justify-center items-center gap-2">
                  <span className="text-14 font-os font-bold mb-0">
                    Contrats
                  </span>
                  <span className="text-16 text-dark font-light">
                    {unitData.contracts}
                  </span>
                </div>
              </td>

              <td className="w-fit flex items-center justify-center">
                <div className="flex flex-col justify-center items-center gap-2">
                  <span className="text-14 font-os font-bold mb-0">
                    Temps restant
                  </span>
                  <span className="text-16 text-dark font-light">
                    {unitData.remainingTime}h
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

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

        {/* <div>
          <FilterPanel
            rows={rowData}
            onFilterChange={handleFilterChange}
          />
          <DataTable rows={filteredRows} />
        </div> */}
      </main>
    </div>
  );
}
