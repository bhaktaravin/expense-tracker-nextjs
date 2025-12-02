'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MonthlyTrendChartProps {
  data: { month: string; income: number; expenses: number }[];
}

export function MonthlyTrendChart({ data }: MonthlyTrendChartProps) {
  const formattedData = data.map(item => ({
    month: new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    Income: item.income,
    Expenses: item.expenses,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => `$${value.toFixed(2)}`}
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        />
        <Legend />
        <Bar dataKey="Income" fill="#22c55e" />
        <Bar dataKey="Expenses" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  );
}
