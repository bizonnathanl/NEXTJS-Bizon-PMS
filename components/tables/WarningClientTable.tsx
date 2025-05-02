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
import { Rank } from "@/interfaces/Rank";

export interface ClientRowData {
  name: string;
  global_lead_1: Collaborator;
  consulting: number;
  op: number;
  cost: number;
  billing: number;
  documents?: Array<{
    name: string;
    start_date: string;
    end_date?: string;
    type: string[];
    marketplaces: string[];
    package: string;
    minimum_package: number;
    performance: boolean;
    status: string;
    business_developper: Collaborator;
    manager: Collaborator;
    business_unit: string;
  }>;
  collaborators: Array<{
    first_name: string;
    last_name: string;
    job_title: string;
    op: number;
    consulting: number;
    rank: Rank;
  }>;
}

interface WarningClientRowData {
  rows: ClientRowData[];
}

export function WarningClientTable({ rows }: WarningClientRowData) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [selections, setSelections] = useState<
    Record<"lead" | "types", string>
  >({
    lead: "all",
    types: "all",
  });

  const filters = [
    {
      label: "Global Lead",
      defaultOption: "Tous les Global Lead",
      key: "lead" as const,
    },
    {
      label: "Type de document",
      defaultOption: "Tous les Types de document",
      key: "types" as const,
    },
  ];

  // Construire les options pour chaque filtre
  const optionsMap = useMemo(() => {
    const map: Record<"lead" | "types", Set<string>> = {
      lead: new Set(),
      types: new Set(),
    };
    rows.forEach((row) => {
      const fullname = `${row.global_lead_1.first_name} ${row.global_lead_1.last_name}`;
      map.lead.add(fullname);
      (row.documents ?? []).forEach((doc) =>
        doc.type.forEach((t) => map.types.add(t))
      );
    });
    return {
      lead: Array.from(map.lead).sort(),
      types: Array.from(map.types).sort(),
    };
  }, [rows]);

  // Appliquer les filtres
  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        const fullname = `${row.global_lead_1.first_name} ${row.global_lead_1.last_name}`;
        const byLead =
          selections.lead === "all" || fullname === selections.lead;
        const allTypes = (row.documents ?? []).flatMap((d) => d.type);
        const byType =
          selections.types === "all" || allTypes.includes(selections.types);
        return byLead && byType;
      }),
    [rows, selections]
  );

  const toggleRow = (idx: number) => {
    const s = new Set(expanded);
    s.has(idx) ? s.delete(idx) : s.add(idx);
    setExpanded(s);
  };

  const formatHours = (val: number) => {
    const h = Math.floor(val);
    const m = Math.round((val - h) * 60);
    return `${h}h${m.toString().padStart(2, "0")}`;
  };

  const formatCurrency = (val: number) =>
    val.toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });

  return (
    <div className="overflow-x-auto">
      {/* Filtres intégrés */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {filters.map(({ label, defaultOption, key }) => (
            <div key={key} className="w-44">
              <Select
                value={selections[key]}
                onValueChange={(val) =>
                  setSelections((prev) => ({ ...prev, [key]: val }))
                }>
                <SelectTrigger className="card-bg font-bold rounded-md py-2 px-3 text-sm placeholder-gray-500 shadow-none border-none focus-visible:ring-0">
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
          onClick={() => setSelections({ lead: "all", types: "all" })}
          className="cta-purple text-white font-bold rounded-md px-6 py-2 h-auto">
          Réinitialiser
        </Button>
      </div>

      <table className="w-full divide-y divide-gray-200 text-[#09002F] px-2">
        <thead className="bg-transparent">
          <tr className="flex items-center justify-between bg-custom-dark text-white font-os mb-2 rounded-md px-2 py-1">
            <th className="w-40 px-4 py-1 text-left font-os text-14">Client</th>
            <th className="w-36 px-4 py-1 text-center font-os text-14">
              Global Lead
            </th>
            <th className="w-40 px-4 py-2 text-center font-os text-14">
              Type de document
            </th>
            <th className="w-34 px-2 py-2 text-center font-os text-14">
              Consulting
            </th>
            <th className="w-34 px-4 py-2 text-center font-os text-14">
              Opérations
            </th>
            <th className="w-34 px-4 py-2 text-center font-os text-14">Coût</th>
            <th className="w-34 px-4 py-2 text-center font-os text-14">
              Facturation
            </th>
            <th className="w-32 px-4 py-2 text-center font-os text-14">
              Marge
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

            const actualConsulting = row.collaborators.reduce(
              (sum, c) => sum + c.consulting,
              0
            );
            const consultingBg =
              actualConsulting === 0
                ? "bg-gray-300"
                : actualConsulting > row.consulting * 1.1
                ? "bg-custom-red"
                : actualConsulting < row.consulting * 0.9
                ? "bg-custom-red"
                : "bg-custom-green";

            const actualOp = row.collaborators.reduce(
              (sum, c) => sum + c.op,
              0
            );
            const operationsBg =
              actualOp === 0
                ? "bg-gray-300"
                : actualOp > row.op * 1.1
                ? "bg-custom-red"
                : actualOp < row.op * 0.9
                ? "bg-custom-red"
                : "bg-custom-green";

            const costReal = row.collaborators.reduce(
              (sum, c) =>
                sum + (c.consulting + c.op) * (c.rank.employee_cost ?? 0),
              0
            );
            const costBg =
              costReal > row.cost ? "bg-custom-red" : "bg-custom-green";

            const billingReal = row.collaborators.reduce(
              (sum, c) =>
                sum + (c.consulting + c.op) * c.rank.client_hour_invoice,
              0
            );
            const billingBg =
              billingReal > row.billing * 1.1
                ? "bg-custom-red"
                : billingReal < row.billing * 0.9
                ? "bg-custom-red"
                : "bg-custom-green";

            const marginPct =
              billingReal > 0
                ? ((row.billing - costReal) / billingReal) * 100
                : 0;
            const marginBg =
              marginPct < 70 ? "bg-custom-red" : "bg-custom-green";

            return (
              <React.Fragment key={idx}>
                <tr
                  className={`w-full flex items-center justify-between font-os cursor-pointer ${cellPadding} ${borderClass}`}
                  onClick={() => toggleRow(idx)}>
                  <td className="w-40 pl-4 font-anton text-16">{row.name}</td>
                  <td className="w-36 text-center text-14">
                    {row.global_lead_1.first_name} {row.global_lead_1.last_name}
                  </td>
                  <td className="w-40 text-center flex flex-wrap items-center justify-center gap-1 text-14">
                    {(row.documents ?? [])
                      .reduce<string[]>((all, doc) => [...all, ...doc.type], [])
                      .map((t, i) => {
                        let bgClass: string;
                        switch (t.toLowerCase()) {
                          case "consulting":
                            bgClass = "cta-purple";
                            break;
                          case "ro":
                            bgClass = "bg-custom-red";
                            break;
                          case "rm":
                            bgClass = "bg-custom-yellow";
                            break;
                          default:
                            bgClass = "bg-gray-200";
                        }
                        return (
                          <span
                            key={`${t}-${i}`}
                            className={`${bgClass} text-white text-14 px-2 py-1 rounded`}>
                            {t}
                          </span>
                        );
                      })}
                  </td>
                  <td className="w-34 text-center">
                    <span
                      className={`px-3 py-1.5 rounded ${consultingBg} text-white text-14`}>
                      {formatHours(actualConsulting)} /{" "}
                      {formatHours(row.consulting)}
                    </span>
                  </td>
                  <td className="w-34 text-center">
                    <span
                      className={`px-3 py-1.5 rounded ${operationsBg} text-white text-14`}>
                      {formatHours(actualOp)} / {formatHours(row.op)}
                    </span>
                  </td>
                  <td className="w-34 text-center">
                    <span
                      className={`px-3 py-1.5 rounded ${costBg} text-white text-14`}>
                      {formatCurrency(costReal)} / {formatCurrency(row.cost)}
                    </span>
                  </td>
                  <td className="w-34 text-center">
                    <span
                      className={`px-3 py-1.5 rounded ${billingBg} text-white text-14`}>
                      {formatCurrency(billingReal)} / {row.billing}
                    </span>
                  </td>
                  <td className="w-32 text-center">
                    <span
                      className={`px-3 py-1.5 rounded ${marginBg} text-white text-14`}>
                      {marginPct.toFixed(0)} %
                    </span>
                  </td>
                </tr>
                {expanded.has(idx) && (
                  <tr className="flex w-full bg-white mb-2 rounded-md">
                    <td className="w-full px-4 py-3" colSpan={8}>
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
                          <div className="w-40 font-bold text-center">
                            Consulting
                          </div>
                          <div className="w-40 font-bold text-center">
                            Opérations
                          </div>
                          <div className="w-40 font-bold text-center">
                            Marge
                          </div>
                        </div>
                        {row.collaborators.map((c, i) => {
                          const hours = c.consulting + c.op;
                          const rev = hours * c.rank.client_hour_invoice;
                          const cost = hours * (c.rank.employee_cost ?? 0);
                          const collMargin =
                            rev > 0 ? ((rev - cost) / rev) * 100 : 0;
                          const collMarginBg =
                            collMargin < 75
                              ? "bg-custom-red"
                              : "bg-custom-green";
                          return (
                            <div
                              key={i}
                              className="flex items-center justify-between mt-2">
                              <div className="w-48 text-left">
                                {c.first_name} {c.last_name}
                              </div>
                              <div className="w-48 text-center">
                                {c.job_title}
                              </div>
                              <div className="w-48 text-center">
                                {c.rank.title}
                              </div>
                              <div className="w-40 text-center">
                                {formatHours(c.consulting)}
                              </div>
                              <div className="w-40 text-center">
                                {formatHours(c.op)}
                              </div>
                              <div className="w-40 text-center">
                                <span
                                  className={`${collMarginBg} px-2 py-1 rounded text-14 text-white`}>
                                  {collMargin.toFixed(0)} %
                                </span>
                              </div>
                            </div>
                          );
                        })}
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
