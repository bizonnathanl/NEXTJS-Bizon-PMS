"use client";
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CollaboratorDataTable } from "@/components/tables/ListCollaboratorTable";
import { Collaborator } from "@/interfaces/Collaborator";
import * as Collaborators from "@/data/Collaborators";

export default function CollaboratorsPage() {
  const rowData: Collaborator[] = [
    Collaborators.ARNAUD,
    Collaborators.AYMERIC,
    Collaborators.ELISE,
    Collaborators.NATHAN,
    Collaborators.THIBAUT,
  ];

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 pl-4 space-y-8 overflow-auto">
        <PageHeader
          breadcrumbs={[{ label: "Collaborateurs" }]}
          title="Collaborateurs"
          subtitle="Retrouvez ici tous les collaborateurs de Bizon"
        />

        <CollaboratorDataTable rows={rowData} />
      </main>
    </div>
  );
}
