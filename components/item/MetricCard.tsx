import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
}

export function MetricCard({ label, value, unit }: MetricCardProps) {
  const displayValue =
    typeof value === "number"
      ? value.toLocaleString("fr-FR", { maximumFractionDigits: 2 })
      : value;

  return (
    <Card className="card-bg shadow-none rounded-md py-3 px-3 w-fit">
      <CardContent className="w-fit p-0 flex flex-col items-center justify-left gap-1">
        <p className="text-16 text-center font-anton whitespace-nowrap">
          {label}
        </p>
        <p className="text-20 text-center font-anton whitespace-nowrap">
          {displayValue} {unit}
        </p>
      </CardContent>
    </Card>
  );
}
