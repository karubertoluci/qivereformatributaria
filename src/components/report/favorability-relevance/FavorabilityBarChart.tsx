
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FavorabilityRelevanceData } from './useFavorabilityRelevanceData';

interface FavorabilityBarChartProps {
  chartData: FavorabilityRelevanceData[];
}

const FavorabilityBarChart: React.FC<FavorabilityBarChartProps> = ({ chartData }) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
          <XAxis 
            type="number" 
            domain={[0, 100]} 
            tickFormatter={(value) => `${value}%`} 
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <YAxis 
            type="category" 
            dataKey="relevanceLevel" 
            width={150}
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Percentual']}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend 
            iconType="square"
            formatter={(value) => {
              if (value === 'favorable') return 'Favorável';
              if (value === 'neutral') return 'Neutro';
              if (value === 'unfavorable') return 'Desfavorável';
              return value;
            }}
            iconSize={10}
            wrapperStyle={{ paddingTop: '10px' }}
          />
          <Bar dataKey="favorable" stackId="a" name="favorable" fill="#4ade80" isAnimationActive={false} />
          <Bar dataKey="neutral" stackId="a" name="neutral" fill="#d1d5db" isAnimationActive={false} />
          <Bar dataKey="unfavorable" stackId="a" name="unfavorable" fill="#ef4444" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FavorabilityBarChart;
