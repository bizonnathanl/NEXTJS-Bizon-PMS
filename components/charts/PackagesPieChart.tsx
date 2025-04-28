'use client'
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { PieDataItem } from './ContractsPieChart';

interface PackagesPieChartProps {
  data: PieDataItem[];
  colors?: string[];
  width?: string | number;
  height?: number;
}

export function PackagesPieChart({
  data,
  colors = ['#6366F1', '#34D399', '#FBBF24', '#F87171'],
  width = '100%',
  height = 250,
}: PackagesPieChartProps) {
  return (
    <div style={{ width, height }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
