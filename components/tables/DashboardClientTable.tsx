// components/tables/DashboardClientTable.tsx
"use client";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Collaborator } from "@/interfaces/Collaborator";

export interface ClientRowData {
  client: string;
  lead: string;
  marketplaces: string[];
  contrats: number;
  types: string[];
  contact: string;
  hours: string;
  collaborators?: Collaborator[];
}

interface DataTableProps {
  rows: ClientRowData[];
}

export function ClientDataTable({ rows }: DataTableProps) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [selections, setSelections] = useState<
    Record<"lead" | "types" | "marketplaces", string>
  >({
    lead: "all",
    types: "all",
    marketplaces: "all",
  });

  const filters = [
    {
      label: "Global Lead",
      defaultOption: "Tous les Global Lead",
      key: "lead" as const,
    },
    {
      label: "Type de contrat",
      defaultOption: "Tous les Types de contrat",
      key: "types" as const,
    },
    {
      label: "Marketplaces",
      defaultOption: "Toutes les marketplaces",
      key: "marketplaces" as const,
    },
  ];

  // Préparer les options pour chaque filtre
  const optionsMap = useMemo(() => {
    const map: Record<"lead" | "types" | "marketplaces", Set<string>> = {
      lead: new Set(),
      types: new Set(),
      marketplaces: new Set(),
    };
    rows.forEach((row) => {
      map.lead.add(row.lead);
      row.types.forEach((t) => map.types.add(t));
      row.marketplaces.forEach((m) => map.marketplaces.add(m));
    });
    return {
      lead: Array.from(map.lead).sort(),
      types: Array.from(map.types).sort(),
      marketplaces: Array.from(map.marketplaces).sort(),
    };
  }, [rows]);

  // Appliquer les filtres
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const byLead = selections.lead === "all" || row.lead === selections.lead;
      const byType =
        selections.types === "all" || row.types.includes(selections.types);
      const byMk =
        selections.marketplaces === "all" ||
        row.marketplaces.includes(selections.marketplaces);
      return byLead && byType && byMk;
    });
  }, [rows, selections]);

  const toggleRow = (idx: number) => {
    const s = new Set(expanded);
    s.has(idx) ? s.delete(idx) : s.add(idx);
    setExpanded(s);
  };

  function parseHourString(str: string): number {
    const m = str.match(/(\d+)h(\d+)?/);
    if (!m) return 0;
    return parseInt(m[1], 10) + (m[2] ? parseInt(m[2], 10) / 60 : 0);
  }

  const typeStyles: Record<string, string> = {
    RO: "bg-custom-red text-white",
    RM: "bg-custom-yellow text-white",
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
    <div className="overflow-x-auto">
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
          onClick={() =>
            setSelections({ lead: "all", types: "all", marketplaces: "all" })
          }
          className="cta-purple text-white font-bold rounded-md px-6 py-2 h-auto">
          Réinitialiser
        </Button>
      </div>

      <table className="divide-y divide-gray-200 text-[#09002F] px-2">
        <thead className="bg-transparent">
          <tr className="flex items-center justify-between bg-custom-dark text-white font-os mb-2 rounded-md px-2 py-1">
            <th className="w-32 px-4 py-2 text-left font-os text-14">Client</th>
            <th className="w-48 px-4 py-2 text-center font-os text-14">
              Global Lead
            </th>
            <th className="w-32 px-4 py-2 text-center font-os text-14">
              Marketplace
            </th>
            <th className="w-20 px-2 py-2 text-center font-os text-14">
              Contrats
            </th>
            <th className="w-48 px-4 py-2 text-center font-os text-14">
              Type de contrats
            </th>
            <th className="w-48 px-4 py-2 text-center font-os text-14">
              Contact Principal
            </th>
            <th className="w-48 px-4 py-2 text-center font-os text-14">
              Heures Total
            </th>
          </tr>
        </thead>
        <tbody className="w-full rounded-md card-bg py-4 px-2 inline-block">
          {filteredRows.map((row, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === filteredRows.length - 1;
            const [actualStr, theoreticalStr] = row.hours
              .split("/")
              .map((s) => s.trim());
            const actual = parseHourString(actualStr);
            const theoretical = parseHourString(theoreticalStr);
            const lower = theoretical * 0.9;
            const upper = theoretical * 1.1;
            const hoursClass =
              actual < lower || actual > upper
                ? "bg-custom-red text-white"
                : "bg-custom-green text-white";

            const cellPadding = `${isFirst ? "pt-0 pb-3" : "py-3"} ${
              isLast ? "pb-0 pt-3" : "py-3"
            }`;
            const borderClass = isLast ? "" : "border-b-1 border-[#F3F2FF]";

            return (
              <React.Fragment key={idx}>
                <tr
                  className={`flex items-center justify-between font-os cursor-pointer ${cellPadding} ${borderClass}`}
                  onClick={() => toggleRow(idx)}>
                  <td className="w-32 px-4 font-anton text-14">{row.client}</td>
                  <td className="w-48 px-4 text-center flex items-center justify-center">
                    {row.lead === "Oui" ? (
                      <span className="font-os text-14 bg-custom-green text-white px-3 py-1 rounded uppercase leading-5 block w-fit">
                        {row.lead}
                      </span>
                    ) : (
                      <span className="font-os text-14">{row.lead}</span>
                    )}
                  </td>
                  <td className="w-32 px-4 font-os text-14 text-center flex items-center justify-center gap-1">
                    {row.marketplaces.map((m) => (
                      <img
                        key={m}
                        src={flagIcons[m] ?? ""}
                        alt={`Flag ${m}`}
                        className="w-6 inline-block"
                      />
                    ))}
                  </td>
                  <td className="w-20 px-2 font-os text-14 text-center">
                    {row.contrats}
                  </td>
                  <td className="w-48 px-4 flex space-x-1 justify-center gap-1">
                    {row.types.map((t) => (
                      <span
                        key={t}
                        className={`px-3 py-1 rounded text-14 uppercase m-0 leading-5 block h-auto ${
                          typeStyles[t] ?? "bg-gray-100 text-gray-800"
                        }`}>
                        {t}
                      </span>
                    ))}
                  </td>
                  <td className="w-48 px-4 font-os text-14 text-center">
                    {row.contact}
                  </td>
                  <td className="w-48 px-4 text-center flex items-center justify-center">
                    <span
                      className={`px-3 py-[5px] rounded text-14 leading-5 block w-fit h-auto ${hoursClass}`}>
                      {row.hours}
                    </span>
                  </td>
                </tr>

                {row.collaborators && expanded.has(idx) && (
                  <tr
                    className={`flex w-full bg-white rounded-md ${
                      isLast ? "mt-2 mb-0" : "mt-0 mb-2"
                    }`}>
                    <td className="w-full px-4 py-3" colSpan={7}>
                      <div className="font-os text-sm">
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-48 font-bold text-left">
                            Collaborateur
                          </div>
                          <div className="w-48 font-bold text-center">
                            Poste
                          </div>
                          <div className="w-48 font-bold text-center">
                            Grade
                          </div>
                          <div className="w-48 font-bold text-center">
                            Statut
                          </div>
                          <div className="w-48 font-bold text-center">
                            Business Unit
                          </div>
                        </div>
                        <div>
                          {row.collaborators.map((c, i) => (
                            <React.Fragment key={i}>
                              <div className="flex items-center justify-between mt-2">
                                <div className="w-48 text-left">
                                  {c.first_name} {c.last_name}
                                </div>
                                <div className="w-48 text-center">
                                  {c.job_title}
                                </div>
                                <div className="w-48 text-center">
                                  {c.rank.title}
                                </div>
                                <div className="w-48 text-center">
                                  {c.statut}
                                </div>
                                <div className="w-48 flex items-center justify-center">
                                  {c.business_unit === "GGS" ? (
                                    <span className="px-2 py-1 rounded text-xs bg-custom-green text-white">
                                      {c.business_unit}
                                    </span>
                                  ) : c.business_unit === "LCS" ? (
                                    <span className="px-2 py-1 rounded text-xs bg-custom-red text-white">
                                      {c.business_unit}
                                    </span>
                                  ) : c.business_unit === "MEDIA" ? (
                                    <span className="px-2 py-1 rounded text-xs bg-custom-yellow text-white">
                                      {c.business_unit}
                                    </span>
                                  ) : (
                                    <span className="px-2 py-1 rounded text-xs bg-gray text-white">
                                      {c.business_unit}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
