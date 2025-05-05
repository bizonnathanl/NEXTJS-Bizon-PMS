"use client";
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContractDataTable } from "@/components/tables/ListContractDataTable";
import * as Documents from "@/data/Documents";

export default function ContractsPage() {
  const docs = [
    Documents.CONTRACT_1,
    Documents.CONTRACT_2,
    Documents.DEVIS_1,
    Documents.DEVIS_2,
  ];

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 pl-4 space-y-8 overflow-auto">
        <PageHeader
          breadcrumbs={[{ label: "Contrats et devis" }]}
          title="Contrats et devis"
          subtitle="Visualisez et détaillez vos contrats et devis."
        />
        <ContractDataTable rows={docs} />
      </main>
    </div>
  );
}
