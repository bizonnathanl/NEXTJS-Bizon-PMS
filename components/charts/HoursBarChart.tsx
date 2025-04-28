'use client'
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

export interface HoursDataItem {
  month: string;
  theoretical: number;
  actual: number;
}

interface HoursBarChartProps {
  data: HoursDataItem[];
  width?: string | number;
  height?: number;
}

export function HoursBarChart({ data, width = '100%', height = 400 }: HoursBarChartProps) {
  return (
    <div style={{ width, height }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="theoretical" name="Théorique" fill="#7C67FF" />
          <Bar dataKey="actual" name="Réel" fill="#5EFBFB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
