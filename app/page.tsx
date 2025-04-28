// app/page.tsx

import React from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { PageHeader } from '@/components/layout/PageHeader'
import { MetricCard } from '@/components/item/MetricCard'
import { FilterPanel } from '@/components/item/FilterPanel'
import { HoursBarChart, HoursDataItem } from '@/components/charts/HoursBarChart'
import { ContractsPieChart, PieDataItem } from '@/components/charts/ContractsPieChart'
import { PackagesPieChart } from '@/components/charts/PackagesPieChart'
import { DataTable, RowData } from '@/components/tables/DataTable'

export default function DashboardPage() {
  // Données simulées
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
    { name: 'Silver', value: 45 },
    { name: 'Gold', value: 30 },
    { name: 'Platinum', value: 15 },
    { name: 'Diamond', value: 10 },
  ]

  const tableRows: RowData[] = [
    {
      client: 'Vernes BV',
      lead: 'Oui',
      marketplace: '🇫🇷🇪🇸🇮🇹',
      contrats: 8,
      types: ['RO', 'RM'],
      contact: 'contact@example.fr',
      hours: '19h50 / 12h',
    },
    // … autres lignes …
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar/>

      <main className="flex-1 pl-4 space-y-8 overflow-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Tableau de bord' },
          ]}
          title="Bienvenue sur ton tableau de bord Thibaut :)"
          subtitle="Head of Strategy · LCS · Depuis le 01/01/2025"
        />

        <div className="flex items-center justify-start gap-2 mb-8">
          <MetricCard label="Clients accompagnés" value={12} />
          <MetricCard label="Contrats en cours" value={26} />
          <MetricCard label="Forfait minimum" value="13 460 €" />
          <MetricCard label="Remplissage" value="72 %" />
          <MetricCard label="Temps restant" value="26 h" />
          <MetricCard label="N+1" value="Nicolas HABERT" />
        </div>

        <HoursBarChart data={barData} />

        <div className="grid grid-cols-2 gap-4">
          <ContractsPieChart data={contractsData} />
          <PackagesPieChart data={packagesData} />
        </div>

        <div>
          <FilterPanel filters={['Client', 'Global Lead', 'Marketplace', 'Typologie']} />
          <DataTable rows={tableRows} />
        </div>
      </main>
    </div>
  )
}
