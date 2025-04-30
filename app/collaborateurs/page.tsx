"use client";
import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterPanel } from "@/components/item/CollaborateurFilters";
import { CollaboratorDataTable } from "@/components/tables/ListCollaboratorTable";
import { Collaborator } from "@/interfaces/Collaborator";
import * as Collaborators from "@/data/Collaborators";

export default function DashboardPage() {
  const rowData: Collaborator[] = [
    Collaborators.ARNAUD,
    Collaborators.AYMERIC,
    Collaborators.ELISE,
    Collaborators.NATHAN,
    Collaborators.THIBAUT,
  ];

  const [filteredRows, setFilteredRows] = useState<Collaborator[]>(rowData);
  const [selections, setSelections] = useState<
    Record<string, string | undefined>
  >({});

  const handleFilterChange = (
    filterKey: string,
    option: string | undefined
  ) => {
    if (filterKey === "apply") {
      const newRows = rowData.filter((row) => {
        return Object.entries(selections).every(([key, value]) => {
          if (!value || key === "collaborateurs") return true;
          const cell = row[key as keyof Collaborator];
          if (Array.isArray(cell)) {
            if (cell.length === 0 || typeof cell[0] === "string") {
              return (cell as string[]).includes(value);
            }
            return true;
          }
          return String(cell) === value;
        });
      });
      setFilteredRows(newRows);
    } else {
      setSelections((prev) => ({
        ...prev,
        [filterKey]: option,
      }));
    }
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 pl-4 space-y-8 overflow-auto">
        <PageHeader
          breadcrumbs={[{ label: "Collaborateurs" }]}
          title="Collaborateurs"
          subtitle="Retrouvez ici tous les collaborateurs de Bizon"
        />

        <div>
          <FilterPanel rows={rowData} onFilterChange={handleFilterChange} />
          <CollaboratorDataTable rows={filteredRows} />
        </div>
      </main>
    </div>
  );
}
