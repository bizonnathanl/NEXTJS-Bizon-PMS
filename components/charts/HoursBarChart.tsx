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
  title: string;
  data: HoursDataItem[];
  width?: string | number;
  height?: string | number;
}

export function HoursBarChart({ title, data, width = '100%', height = 500 }: HoursBarChartProps) {
  return (
    <div style={{ width, height }} className='card-bg shadow-none rounded-md py-8 px-8 pb-20 mb-16'>
      <h3 className='font-anton text-20 mb-8'>{title}</h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="month" tickLine={false} axisLine={false} className='font-os text-12'/>
          <YAxis tickLine={false} axisLine={false} className='font-os text-12'/>
          <Tooltip />
          <Legend
            iconType="square"
            iconSize={10}
            formatter={(value) => <span style={{ color: '#09002F' }}>{value}</span>}
          />
          <Bar dataKey="theoretical" name="Théorique" fill="#7C67FF" unit={"h"}/>
          <Bar dataKey="actual" name="Réel" fill="#5EFBFB" unit={"h"}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
