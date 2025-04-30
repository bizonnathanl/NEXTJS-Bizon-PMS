// components/tables/DataTable.tsx
"use client";
import React, { useState } from "react";
import { Collaborator } from "@/interfaces/Collaborator";

interface DataTableProps {
  rows: Collaborator[];
}

export function CollaboratorDataTable({ rows }: DataTableProps) {
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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-[#09002F] px-2">
        <thead className="bg-transparent">
          <tr className="flex items-center justify-between bg-custom-dark text-white font-os mb-2 rounded-md px-2 py-1">
            <th className="w-52 px-4 py-2 text-left font-os text-14">
              Collaboreteur
            </th>
            <th className="w-40 px-4 py-2 text-center font-os text-14">
              Langues parlées
            </th>
            <th className="w-48 px-4 py-2 text-center font-os text-14">
              Poste
            </th>
            <th className="w-40 px-4 py-2 text-center font-os text-14">
              Grade
            </th>
            <th className="w-40 px-4 py-2 text-center font-os text-14">
              Statut
            </th>
            <th className="w-40 px-4 py-2 text-center font-os text-14">
              Business Unit
            </th>
            <th className="w-20 px-2 py-2 text-center font-os text-14">
              Contrats
            </th>
            <th className="w-20 px-4 py-2 text-center font-os text-14">
              Clients
            </th>
          </tr>
        </thead>
        <tbody className="w-full rounded-md card-bg py-4 px-2 inline-block">
          {rows.map((row, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === rows.length - 1;

            const cellPadding = `${isFirst ? "pt-0 pb-3" : "py-3"} ${
              isLast ? "pb-0 pt-3" : "py-3"
            }`;
            const borderClass = `${
              isLast ? "" : "border-b-1 border-[#F3F2FF]"
            }`;

            return (
              <React.Fragment key={idx}>
                <tr
                  className={`flex items-center justify-between font-os cursor-pointer ${cellPadding} ${borderClass}`}>
                  <td className="w-52 px-4 font-anton text-14">
                    <div className="flex items-center">
                      <img
                        src={row.picture}
                        alt={`${row.first_name} ${row.last_name}`}
                        className="w-10 h-10 rounded-sm mr-2"
                      />
                      {row.first_name} {row.last_name}
                    </div>
                  </td>
                  <td className="w-40 px-4 font-os text-14 text-center flex items-center justify-center gap-1">
                    {row.languages.map((m) => (
                      <img
                        key={m}
                        src={flagIcons[m] ?? ""}
                        alt={`Flag ${m}`}
                        className="w-6 inline-block"
                      />
                    ))}
                  </td>
                  <td className="w-48 px-2 font-os text-14 text-center">
                    {row.job_title}
                  </td>
                  <td className="w-40 px-2 font-os text-14 text-center">
                    {row.rank.title}
                  </td>
                  <td className="w-40 px-2 font-os text-14 text-center">
                    {row.statut}
                  </td>
                  <td className="w-40 px-4 flex space-x-1 justify-center gap-1">
                    <span
                      key={row.business_unit}
                      className={`px-3 py-1 rounded text-14 uppercase m-0 leading-5 block h-auto ${
                        buStyles[row.business_unit] ??
                        "bg-gray-100 text-gray-800"
                      }`}>
                      {row.business_unit}
                    </span>
                  </td>
                  <td className="w-20 px-4 font-os text-14 text-center">
                    {(() => {
                      const count = row.client?.length ?? 0;
                      const isPositive = count > 0;
                      return (
                        <span
                          className={`
                          block w-fit uppercase leading-5
                          px-3 py-1 rounded
                          font-os text-14
                          ${
                            isPositive
                              ? "bg-custom-green text-white"
                              : "text-[#09002F]" /* ou votre couleur par défaut */
                          }
                        `}>
                          {count}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="w-20 px-4 font-os text-14 text-center">
                    {(() => {
                      const clients = row.client ?? [];
                      const count = clients.reduce(
                        (sum, client) => sum + (client.documents?.length ?? 0),
                        0
                      );
                      const isPositive = count > 0;
                      return (
                        <span
                          className={`
                          block w-fit uppercase leading-5
                          px-3 py-1 rounded
                          font-os text-14
                          ${
                            isPositive
                              ? "bg-custom-green text-white"
                              : "text-[#09002F]"
                          }
                        `}>
                          {count}
                        </span>
                      );
                    })()}
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
