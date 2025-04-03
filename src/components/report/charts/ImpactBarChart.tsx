
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import ChartTooltipContent from './ChartTooltipContent';
import { PercentageData } from './utils/chartCalculations';

interface ImpactBarChartProps {
  data: PercentageData[];
}

const ImpactBarChart: React.FC<ImpactBarChartProps> = ({ data }) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={150}
            tickFormatter={(value) => `${value} (${data.find(d => d.name === value)?.total || '0'} artigos)`}
          />
          <Tooltip content={<ChartTooltipContent active={false} payload={[]} />} />
          <Legend 
            formatter={(value) => {
              if (value === 'favorable') return 'Favorável';
              if (value === 'neutral') return 'Neutro';
              if (value === 'unfavorable') return 'Desfavorável';
              return value;
            }}
            iconSize={15}
            wrapperStyle={{ paddingTop: '10px' }}
          />
          <Bar dataKey="favorable" stackId="a" name="favorable" fill="#4ade80" />
          <Bar dataKey="neutral" stackId="a" name="neutral" fill="#d1d5db" />
          <Bar dataKey="unfavorable" stackId="a" name="unfavorable">
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={entry.hasCritical ? '#dc2626' : '#ef4444'} // Brighter red for critical impacts
                strokeWidth={entry.hasCritical ? 1 : 0}
                stroke="#000"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ImpactBarChart;
