import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface FilterPanelProps {
  filters: string[];
  onFilterChange?: (filter: string, option: string) => void;
}

export function FilterPanel({ filters }: FilterPanelProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {filters.map((f) => (
        <DropdownMenu key={f}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {f} <span className="ml-1">▾</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Option 1</DropdownMenuItem>
            <DropdownMenuItem>Option 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
      <Button size="sm">Filtrer</Button>
    </div>
  );
}
