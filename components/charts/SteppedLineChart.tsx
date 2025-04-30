// components/charts/SteppedLineChart.tsx
"use client";
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
} from "recharts";

export interface StepDataItem {
  [key: string]: string | number;
  month: string;
}

interface SteppedLineChartProps {
  title: string;
  data: StepDataItem[];
  lines: Array<{
    dataKey: string;
    name: string;
    color: string;
  }>;
  width?: string | number;
  height?: string | number;
}

export function SteppedLineChart({
  title,
  data,
  lines,
  width = "100%",
  height = 450,
}: SteppedLineChartProps) {
  return (
    <div
      style={{ width, height }}
      className="card-bg shadow-none rounded-md pt-8 px-8  pb-20">
      <h3 className="font-anton text-20 mb-8">{title}</h3>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="4 4"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            className="font-os text-12 text-dark"
            padding={{ right: 10, left: 10 }}
            tick={{ fontSize: 12, fill: "#09002F" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            className="font-os text-12 text-dark"
            tick={{ textAnchor: "end", fontSize: 12, fill: "#09002F" }}
          />
          <Tooltip />
          <Legend
            iconType="square"
            iconSize={10}
            formatter={(val) => <span style={{ color: "#09002F" }}>{val}</span>}
          />
          {lines.map((l) => (
            <Line
              key={l.dataKey}
              type="step"
              dataKey={l.dataKey}
              name={l.name}
              stroke={l.color}
              dot={{ r: 4 }}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
