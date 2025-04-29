'use client';
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { MetricCard } from '@/components/item/MetricCard';
import { FilterPanel } from '@/components/item/FilterPanel';
import { HoursBarChart, HoursDataItem } from '@/components/charts/HoursBarChart';
import { ContractsPieChart, PieDataItem } from '@/components/charts/ContractsPieChart';
import { PackagesPieChart } from '@/components/charts/PackagesPieChart';
import { DataTable, RowData } from '@/components/tables/DataTable';

export default function DashboardPage() {
  const barData: HoursDataItem[] = [
    { month: 'Janv.', theoretical: 140, actual: 60 },
    { month: 'Fév.', theoretical: 70, actual: 50 },
    { month: 'Mars.', theoretical: 140, actual: 60 },
    { month: 'Avril.', theoretical: 70, actual: 50 },
    { month: 'Mai.', theoretical: 140, actual: 60 },
    { month: 'Juin.', theoretical: 70, actual: 50 },
    { month: 'Juil..', theoretical: 140, actual: 60 },
    { month: 'Août.', theoretical: 70, actual: 50 },
    { month: 'Sept.', theoretical: 140, actual: 60 },
    { month: 'Oct.', theoretical: 70, actual: 50 },
    { month: 'Nov.', theoretical: 70, actual: 50 },
    { month: 'Déc.', theoretical: 140, actual: 60 }
  ]

  const contractsData: PieDataItem[] = [
    { name: 'Consulting', value: 30 },
    { name: 'Audit', value: 25 },
    { name: 'RO', value: 20 },
    { name: 'RM', value: 25 },
  ]

  const packagesData: PieDataItem[] = [
    { name: 'Gold', value: 30 },
    { name: 'Silver', value: 45 },
    { name: 'Platinum', value: 15 },
    { name: 'Diamond', value: 10 },
  ]

  const tableRows: RowData[] = [
    {
      client: 'Vermes BV',
      lead: 'Oui',
      marketplaces: ['FR', 'IT', 'DE'],
      contrats: 12,
      types: ['RO'],
      contact: 'contact@vermesbv.com',
      hours: '11h30 / 10h',
    },
    {
      client: 'Lestra',
      lead: 'Arnaud JARROT',
      marketplaces: ['FR', 'ES'],
      contrats: 5,
      types: ['RM'],
      contact: 'support@lestra.fr',
      hours: '9h00 / 10h',
    },
    {
      client: 'Cafés Folliet',
      lead: 'Oui',
      marketplaces: ['FR'],
      contrats: 7,
      types: ['RO', 'RM'],
      contact: 'info@cafesfolliet.fr',
      hours: '13h15 / 12h',
    },
    {
      client: 'Ceva',
      lead: 'Eva LEULEU',
      marketplaces: ['DE', 'IT'],
      contrats: 10,
      types: ['RO'],
      contact: 'contact@ceva.com',
      hours: '8h45 / 9h',
    },
    {
      client: 'Pranarom',
      lead: 'Oui',
      marketplaces: ['FR', 'IT'],
      contrats: 14,
      types: ['RM'],
      contact: 'hello@pranarom.fr',
      hours: '15h20 / 14h',
    },
    {
      client: 'Maybelline NY',
      lead: 'Eva LEULEU',
      marketplaces: ['UK', 'FR', 'ES'],
      contrats: 9,
      types: ['RO', 'RM'],
      contact: 'contact@maybellineny.com',
      hours: '10h50 / 11h',
    },
    {
      client: 'SFA Saniflo',
      lead: 'Oui',
      marketplaces: ['FR', 'DE'],
      contrats: 6,
      types: ['RO'],
      contact: 'service@saniflo.fr',
      hours: '12h10 / 12h',
    },
    {
      client: 'Alfapac',
      lead: 'Arnaud JARROT',
      marketplaces: ['IT', 'FR'],
      contrats: 11,
      types: ['RM'],
      contact: 'sales@alfapac.it',
      hours: '9h30 / 10h',
    },
    {
      client: 'VNM',
      lead: 'Oui',
      marketplaces: ['ES', 'UK'],
      contrats: 8,
      types: ['RO', 'RM'],
      contact: 'contact@vnm.es',
      hours: '14h00 / 13h',
    },
    {
      client: "Carte d'Or",
      lead: 'Aymeric VURPILLOT',
      marketplaces: ['FR', 'IT', 'DE'],
      contrats: 13,
      types: ['RO'],
      contact: 'info@cartedor.fr',
      hours: '7h50 / 8h',
    }
  ]

  const [filteredRows, setFilteredRows] = useState<RowData[]>(tableRows)
  const [selections, setSelections] = useState<Record<string,string|undefined>>({})

  const handleFilterChange = (filterKey: string, option: string|undefined) => {
    if (filterKey === 'apply') {
      const newRows = tableRows.filter(row => {
        return Object.entries(selections).every(([key, value]) => {
          if (!value) return true
          const cell = row[key as keyof RowData]
          if (Array.isArray(cell)) {
            return cell.includes(value)
          }
          return String(cell) === value
        })
      })
      setFilteredRows(newRows)
    } else {
      setSelections(prev => ({
        ...prev,
        [filterKey]: option
      }))
    }
  }

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 pl-4 space-y-8 overflow-auto">
        <PageHeader
          breadcrumbs={[{ label: 'Tableau de bord' }]}
          title="Bienvenue sur ton tableau de bord Thibaut :)"
          subtitle="Head of Strategy · LCS · Depuis le 01/01/2025"
        />

        <div className="flex items-center gap-2 mb-8">
          <MetricCard label="Clients accompagnés" value={12} />
          <MetricCard label="Contrats en cours" value={26} />
          <MetricCard label="Forfait minimum" value="13 460 €" />
          <MetricCard label="Remplissage" value="72 %" />
          <MetricCard label="Temps restant" value="26 h" />
          <MetricCard label="N+1" value="Nicolas HABERT" />
        </div>

        <HoursBarChart title="Charge horaire" data={barData} />

        <div className="flex flex-col gap-8 mb-16">
          <h2 className="text-2xl font-anton mb-0">Clients accompagnés</h2>
          <div className="flex items-center justify-between gap-8">
            <ContractsPieChart
              title="Répartition par type de contrat"
              data={contractsData}
            />
            <PackagesPieChart
              title="Répartition par type de package"
              data={packagesData}
            />
          </div>
        </div>

        <div>
          <FilterPanel
            rows={tableRows}
            onFilterChange={handleFilterChange}
          />
          <DataTable rows={filteredRows} />
        </div>
      </main>
    </div>
  );
}
