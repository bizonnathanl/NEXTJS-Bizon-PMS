'use client'
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { PieDataItem } from './ContractsPieChart';

interface PackagesPieChartProps {
  title: string;
  data: PieDataItem[];
  colors?: string[];
  width?: string | number;
  height?: number;
}

export function PackagesPieChart({
  title,
  data,
  colors = ['#FFD700', '#C0C0C0', '#E5E4E2', '#B9F2FF'],
  width = '100%',
  height = 400,
}: PackagesPieChartProps) {
  return (
    <div className='card-bg shadow-none rounded-md py-8 px-8 w-full'>
      <h3 className='font-anton text-20'>{title}</h3>
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
              cornerRadius={8}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend iconType="square" iconSize={10} formatter={(value) => <span style={{ color: '#09002F' }}>{value}</span>}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
