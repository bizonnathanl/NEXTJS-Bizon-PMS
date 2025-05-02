"use client";
import React, { useState, useMemo } from "react";
import { Collaborator } from "@/interfaces/Collaborator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface DataTableProps {
  rows: Collaborator[];
}

export function CollaboratorDataTable({ rows }: DataTableProps) {
  const [selections, setSelections] = useState<
    Record<"statut" | "businessUnit", string>
  >({
    statut: "all",
    businessUnit: "all",
  });

  const filters = [
    {
      label: "Statut",
      defaultOption: "Tous les Statut",
      key: "statut" as const,
    },
    {
      label: "Business Unit",
      defaultOption: "Toutes les BU",
      key: "businessUnit" as const,
    },
  ];

  // Préparer les options pour chaque filtre
  const optionsMap = useMemo(() => {
    const map: Record<"statut" | "business_unit", Set<string>> = {
      statut: new Set(),
      business_unit: new Set(),
    };
    rows.forEach((row) => {
      map.statut.add(row.statut);
      map.business_unit.add(row.business_unit);
    });
    return {
      statut: Array.from(map.statut).sort(),
      businessUnit: Array.from(map.business_unit).sort(),
    };
  }, [rows]);

  // Appliquer les filtres
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const byStatut =
        selections.statut === "all" || row.statut === selections.statut;
      const byBu =
        selections.businessUnit === "all" ||
        row.business_unit === selections.businessUnit;
      return byStatut && byBu;
    });
  }, [rows, selections]);

  // Styles utilitaires
  const buStyles: Record<string, string> = {
    LCS: "bg-custom-red text-white",
    GGS: "bg-custom-green text-white",
    MEDIA: "bg-custom-yellow text-white",
  };
  const flagIcons: Record<string, string> = {
    FR: "/icons/SVG_Flag-FR.svg",
    UK: "/icons/SVG_Flag-UK.svg",
    DE: "/icons/SVG_Flag-DE.svg",
    IT: "/icons/SVG_Flag-IT.svg",
    ES: "/icons/SVG_Flag-ES.svg",
    IE: "/icons/SVG_Flag-IE.svg",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {filters.map(({ label, defaultOption, key }) => (
            <div key={key}>
              <Select
                value={selections[key]}
                onValueChange={(val) =>
                  setSelections((prev) => ({ ...prev, [key]: val }))
                }>
                <SelectTrigger className="w-full card-bg font-bold rounded-md py-2 px-3 text-sm placeholder-gray-500 shadow-none border-none focus-visible:ring-0">
                  <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent
                  sideOffset={5}
                  align="start"
                  className="z-50 bg-white rounded-md shadow-lg">
                  <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    <SelectItem value="all">{defaultOption}</SelectItem>
                    {optionsMap[key].map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <Button
          size="sm"
          onClick={() => setSelections({ statut: "all", businessUnit: "all" })}
          className="cta-purple text-white font-bold rounded-md px-6 py-2 h-auto">
          Réinitialiser
        </Button>
      </div>

      <table className=" divide-y text-[#09002F] px-2">
        <thead className="bg-transparent">
          <tr className="flex items-center justify-between bg-custom-dark text-white font-os mb-2 rounded-md px-2 py-1">
            <th className="w-48 px-4 py-2 text-left font-os text-14">
              Collaborateur
            </th>
            <th className="w-44 px-4 py-2 text-center font-os text-14">
              Langues parlées
            </th>
            <th className="w-44 px-4 py-2 text-center font-os text-14">
              Poste
            </th>
            <th className="w-36 px-4 py-2 text-center font-os text-14">
              Grade
            </th>
            <th className="w-36 px-4 py-2 text-center font-os text-14">
              Statut
            </th>
            <th className="w-36 px-4 py-2 text-center font-os text-14">
              Business Unit
            </th>
            <th className="w-20 px-2 py-2 text-center font-os text-14">
              Clients
            </th>
            <th className="w-20 px-4 py-2 text-center font-os text-14">
              Contrats
            </th>
          </tr>
        </thead>
        <tbody className="w-full rounded-md card-bg py-4 px-2 inline-block">
          {filteredRows.map((row, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === filteredRows.length - 1;
            const cellPadding = `${isFirst ? "pt-0 pb-3" : "py-3"} ${
              isLast ? "pb-0 pt-3" : "py-3"
            }`;
            const borderClass = isLast ? "" : "border-b-1 border-[#F3F2FF]";

            const countClients = row.client?.length ?? 0;
            const clientsBg =
              countClients > 0 ? "bg-custom-green" : "text-[#09002F]";

            return (
              <React.Fragment key={idx}>
                <tr
                  className={`flex items-center justify-between font-os cursor-pointer ${cellPadding} ${borderClass}`}>
                  <td className="w-48 px-4 font-anton text-14">
                    <div className="flex items-center">
                      <img
                        src={row.picture}
                        alt={`${row.first_name} ${row.last_name}`}
                        className="w-10 h-10 rounded-sm mr-2"
                      />
                      {row.first_name} {row.last_name}
                    </div>
                  </td>
                  <td className="w-44 px-4 font-os text-14 text-center flex items-center justify-center gap-1">
                    {row.languages.map((m) => (
                      <img
                        key={m}
                        src={flagIcons[m]}
                        alt={m}
                        className="w-6 inline-block"
                      />
                    ))}
                  </td>
                  <td className="w-44 px-2 font-os text-14 text-center">
                    {row.job_title}
                  </td>
                  <td className="w-36 px-2 font-os text-14 text-center">
                    {row.rank.title}
                  </td>
                  <td className="w-36 px-2 font-os text-14 text-center">
                    {row.statut}
                  </td>
                  <td className="w-36 px-4 flex space-x-1 justify-center gap-1">
                    <span
                      className={`px-3 py-1 rounded uppercase text-14 leading-5 ${
                        buStyles[row.business_unit]
                      }`}>
                      {row.business_unit}
                    </span>
                  </td>
                  <td className="w-20 px-4 font-os text-14 text-center flex items-center justify-center">
                    <span
                      className={`${clientsBg} px-3 py-1 rounded block w-fit uppercase leading-5`}>
                      {countClients}
                    </span>
                  </td>
                  <td className="w-20 px-4 font-os text-14 text-center flex items-center justify-center">
                    <span
                      className={`${clientsBg} px-3 py-1 rounded block w-fit uppercase leading-5`}>
                      {row.client?.reduce(
                        (sum, c) => sum + (c.documents?.length ?? 0),
                        0
                      )}{" "}
                      0
                    </span>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
