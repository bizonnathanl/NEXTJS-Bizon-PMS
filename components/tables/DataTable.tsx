import React from 'react';

export interface RowData {
  client: string;
  lead: string;
  marketplace: string;
  contrats: number;
  types: string[];
  contact: string;
  hours: string;
}

interface DataTableProps {
  rows: RowData[];
}

export function DataTable({ rows }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th>Client</th>
            <th>Global Lead</th>
            <th>Marketplace</th>
            <th>Contrats</th>
            <th>Type de contrats</th>
            <th>Contact Principal</th>
            <th>Heures Total</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td className="py-2">{row.client}</td>
              <td>{row.lead}</td>
              <td>{row.marketplace}</td>
              <td>{row.contrats}</td>
              <td className="flex space-x-1">
                {row.types.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs"
                  >
                    {t}
                  </span>
                ))}
              </td>
              <td>{row.contact}</td>
              <td>{row.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
