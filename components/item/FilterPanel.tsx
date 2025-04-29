'use client';

import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface FilterPanelProps {
  rows: Record<string, any>[];
  onFilterChange?: (filterKey: string, option: string | undefined) => void;
}

export function FilterPanel({
  rows,
  onFilterChange,
}: FilterPanelProps) {
  const filters = [
    { label: 'Global Lead',    key: 'lead' },
    { label: 'Marketplace',    key: 'marketplaces' },
    { label: 'Type de contrat',key: 'types' },
  ];

  const optionsMap = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    for (const { key } of filters) {
      map[key] = new Set<string>();
    }
    for (const row of rows) {
      for (const { key } of filters) {
        const val = row[key];
        if (Array.isArray(val)) {
          val.forEach((v: any) => map[key].add(String(v)));
        } else if (val != null) {
          map[key].add(String(val));
        }
      }
    }
    const out: Record<string, string[]> = {};
    for (const { key } of filters) {
      out[key] = Array.from(map[key]).sort();
    }
    return out;
  }, [rows]);

  const [selections, setSelections] = useState<Record<string, string>>(
    filters.reduce((acc, { key }) => {
      acc[key] = 'all';
      return acc;
    }, {} as Record<string, string>)
  );

  const handleChange = (key: string, val: string) => {
    setSelections((prev) => ({ ...prev, [key]: val }));
    onFilterChange?.(key, val === 'all' ? undefined : val);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      {filters.map(({ label, key }) => (
        <div key={key} className="w-40">
          <Select
            value={selections[key]}
            onValueChange={(val) => handleChange(key, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{label}</SelectItem>
              {optionsMap[key].map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}

      <Button size="sm" onClick={() => onFilterChange?.('apply', undefined)}>
        Filtrer
      </Button>
    </div>
  );
}
