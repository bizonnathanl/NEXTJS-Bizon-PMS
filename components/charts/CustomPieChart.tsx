"use client";
import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export interface CustomPieDataItem {
  name: string;
  value: number;
}

interface CustomPieChartProps {
  title: string;
  data: CustomPieDataItem[];
  colors?: string[];
  width?: string | number;
  height?: number;
}

export function CustomPieChart({
  title,
  data,
  colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
  ],
  width = "100%",
  height = 400,
}: CustomPieChartProps) {
  return (
    <div className="card-bg shadow-none rounded-md py-4 px-8 w-full">
      <h3 className="font-anton text-20">{title}</h3>
      <div style={{ width, height }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={140}
              startAngle={90}
              endAngle={-270}
              label
              cornerRadius={8}>
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              iconType="square"
              iconSize={10}
              formatter={(value) => (
                <span style={{ color: "#09002F" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
