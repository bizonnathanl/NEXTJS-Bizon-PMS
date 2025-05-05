// components/tables/ContractDataTable.tsx
"use client";
import React, { useState, useMemo } from "react";
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
import { Document } from "@/interfaces/Document";

interface ContractDataTableProps {
  rows: Document[];
}

type FilterKey =
  | "document_type"
  | "type"
  | "package"
  | "performance"
  | "status"
  | "business_unit";

export function ContractDataTable({ rows }: ContractDataTableProps) {
  // --- filter state ---
  const [selections, setSelections] = useState<Record<FilterKey, string>>({
    document_type: "all",
    type: "all",
    package: "all",
    performance: "all",
    status: "all",
    business_unit: "all",
  });

  // --- prepare filter options ---
  const optionsMap = useMemo(() => {
    const map: Record<FilterKey, Set<string>> = {
      document_type: new Set(),
      type: new Set(),
      package: new Set(),
      performance: new Set(),
      status: new Set(),
      business_unit: new Set(),
    };
    rows.forEach((r) => {
      map.document_type.add(r.document_type);
      r.type.forEach((t) => map.type.add(t));
      map.package.add(r.package);
      map.performance.add(r.performance ? "Oui" : "Non");
      map.status.add(r.status);
      map.business_unit.add(r.business_unit);
    });
    return Object.fromEntries(
      Object.entries(map).map(([k, set]) => [k, Array.from(set).sort()])
    ) as Record<FilterKey, string[]>;
  }, [rows]);

  // --- filter rows ---
  const filteredRows = useMemo(
    () =>
      rows.filter((doc) => {
        if (
          selections.document_type !== "all" &&
          doc.document_type !== selections.document_type
        )
          return false;
        if (selections.type !== "all" && !doc.type.includes(selections.type))
          return false;
        if (selections.package !== "all" && doc.package !== selections.package)
          return false;
        if (
          selections.performance !== "all" &&
          (doc.performance ? "Oui" : "Non") !== selections.performance
        )
          return false;
        if (selections.status !== "all" && doc.status !== selections.status)
          return false;
        if (
          selections.business_unit !== "all" &&
          doc.business_unit !== selections.business_unit
        )
          return false;
        return true;
      }),
    [rows, selections]
  );

  // --- icons & styles ---
  const flagIcons: Record<string, string> = {
    FR: "/icons/SVG_Flag-FR.svg",
    UK: "/icons/SVG_Flag-UK.svg",
    DE: "/icons/SVG_Flag-DE.svg",
    IT: "/icons/SVG_Flag-IT.svg",
    ES: "/icons/SVG_Flag-ES.svg",
    IE: "/icons/SVG_Flag-IE.svg",
  };
  const docTypeStyles: Record<string, string> = {
    Contrat: "bg-custom-green text-white",
    Devis: "cta-purple text-white",
  };
  const statusStyles: Record<string, string> = {
    Actif: "bg-custom-green text-white",
    "Dernier mois": "bg-custom-yellow text-white",
    Clôturé: "bg-custom-red text-white",
    "À venir": "cta-purple text-white",
  };
  const buStyles: Record<string, string> = {
    GGS: "bg-custom-green text-white",
    LCS: "bg-custom-yellow text-white",
    Media: "bg-custom-red text-white",
  };

  // --- filter definitions ---
  const filters: {
    label: string;
    defaultOption: string;
    key: FilterKey;
  }[] = [
    {
      label: "Document",
      defaultOption: "Tous Documents",
      key: "document_type",
    },
    {
      label: "Type de contrat",
      defaultOption: "Tout Types",
      key: "type",
    },
    {
      label: "Package",
      defaultOption: "Tout Packages",
      key: "package",
    },
    {
      label: "Perf.",
      defaultOption: "Tout Perf.",
      key: "performance",
    },
    {
      label: "Statut",
      defaultOption: "Tout Statuts",
      key: "status",
    },
    {
      label: "Business Unit",
      defaultOption: "Toutes BU",
      key: "business_unit",
    },
  ];

  return (
    <div>
      {/* --- filters bar --- */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
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
            setSelections({
              document_type: "all",
              type: "all",
              package: "all",
              performance: "all",
              status: "all",
              business_unit: "all",
            })
          }
          className="cta-purple text-white font-bold rounded-md px-6 py-2 h-auto">
          Réinitialiser
        </Button>
      </div>

      {/* --- original table --- */}
      <table className="w-full divide-y divide-gray-200 text-[#09002F] px-2">
        <thead className="bg-transparent">
          <tr className="flex items-center justify-between bg-custom-dark text-white font-os mb-2 rounded-md px-2 py-1">
            <th className="w-48 px-4 py-2 text-left font-os text-14">Nom</th>
            <th className="w-32 px-4 py-2 text-left font-os text-14 text-center">
              Type
            </th>
            <th className="w-32 px-4 py-2 text-center font-os text-14 text-center">
              Marketplaces
            </th>
            <th className="w-36 px-4 py-2 text-center font-os text-14 text-center">
              Business Unit
            </th>
            <th className="w-32 px-4 py-2 text-center font-os text-14 text-center">
              Package
            </th>
            <th className="w-32 px-4 py-2 text-center font-os text-14 text-center">
              Forfait min.
            </th>
            <th className="w-24 px-4 py-2 text-center font-os text-14 text-center">
              Perf.
            </th>
            <th className="w-48 px-4 py-2 text-center font-os text-14 text-center">
              Statut
            </th>
          </tr>
        </thead>
        <tbody className="w-full rounded-md card-bg py-4 px-2 inline-block">
          {filteredRows.map((doc, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === filteredRows.length - 1;
            const cellPadding = `${isFirst ? "pt-0 pb-3" : "py-3"} ${
              isLast ? "pb-0 pt-3" : "py-3"
            }`;
            const borderClass = isLast ? "" : "border-b-1 border-[#F3F2FF]";

            return (
              <React.Fragment key={idx}>
                <tr
                  className={`flex items-center justify-between font-os cursor-pointer ${cellPadding} ${borderClass}`}>
                  <td className="w-48 px-4 text-14 font-bold font-anton">
                    {doc.name}
                  </td>
                  <td className="w-32 px-4 text-14 flex items-center justify-center">
                    <span
                      className={`px-3 py-1 rounded ${
                        docTypeStyles[doc.document_type] ||
                        "bg-gray-200 text-gray-800"
                      }`}>
                      {doc.document_type}
                    </span>
                  </td>
                  <td className="w-32 px-4 text-center flex items-center justify-center gap-1">
                    {doc.marketplaces.map((m) => (
                      <img
                        key={m}
                        src={flagIcons[m] ?? ""}
                        alt={m}
                        className="w-6 inline-block"
                      />
                    ))}
                  </td>
                  <td className="w-36 px-4 text-center flex items-center justify-center text-14">
                    <span
                      className={`px-3 py-1 rounded ${
                        buStyles[doc.business_unit] ||
                        "bg-gray-200 text-gray-800"
                      }`}>
                      {doc.business_unit}
                    </span>
                  </td>
                  <td className="w-32 px-4 text-center text-14 flex items-center justify-center">
                    {doc.package}
                  </td>
                  <td className="w-32 px-4 text-center text-14">
                    {doc.minimum_package.toLocaleString("fr-FR")}€
                  </td>
                  <td className="w-24 px-4 text-center flex items-center justify-center">
                    <img
                      src={
                        doc.performance
                          ? "/icons/SVG_Checkbox-checked.svg"
                          : "/icons/SVG_Checkbox.svg"
                      }
                      alt={doc.performance ? "Perf OK" : "Perf NOK"}
                      className="w-5 inline-block"
                    />
                  </td>
                  <td className="w-48 px-4 text-center flex items-center justify-center">
                    <span
                      className={`px-3 py-1 rounded ${
                        statusStyles[doc.status] || "bg-gray-200 text-gray-800"
                      }`}>
                      {doc.status}
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
