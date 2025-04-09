
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RelevanceTotalData } from './useFavorabilityRelevanceData';

interface FavorabilityBarChartProps {
  chartData: RelevanceTotalData[];
  selectedFavorability: string | null;
  onSelectFavorability: (favorability: string | null) => void;
}

const FavorabilityBarChart: React.FC<FavorabilityBarChartProps> = ({
  chartData,
  selectedFavorability,
  onSelectFavorability
}) => {
  const handleBarClick = (data: any) => {
    const clickedBar = data.activePayload?.[0];
    if (clickedBar) {
      const dataKey = clickedBar.dataKey;
      onSelectFavorability(selectedFavorability === dataKey ? null : dataKey);
    }
  };
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        onClick={handleBarClick}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="relevanceLevel" />
        <YAxis />
        <Tooltip 
          formatter={(value, name) => {
            let label = name;
            if (name === 'favorable') label = 'Favorável';
            if (name === 'neutral') label = 'Neutro';
            if (name === 'unfavorable') label = 'Desfavorável';
            return [`${value}%`, label];
          }}
        />
        <Legend 
          formatter={(value) => {
            if (value === 'favorable') return 'Favorável';
            if (value === 'neutral') return 'Neutro';
            if (value === 'unfavorable') return 'Desfavorável';
            return value;
          }}
        />
        <Bar 
          dataKey="favorable" 
          name="favorable" 
          fill="#4ade80" 
          radius={[4, 4, 0, 0]}
          fillOpacity={selectedFavorability === 'favorable' ? 1 : (selectedFavorability ? 0.3 : 0.8)}
        />
        <Bar 
          dataKey="neutral" 
          name="neutral" 
          fill="#9ca3af" 
          radius={[4, 4, 0, 0]}
          fillOpacity={selectedFavorability === 'neutral' ? 1 : (selectedFavorability ? 0.3 : 0.8)}
        />
        <Bar 
          dataKey="unfavorable" 
          name="unfavorable" 
          fill="#f87171" 
          radius={[4, 4, 0, 0]}
          fillOpacity={selectedFavorability === 'unfavorable' ? 1 : (selectedFavorability ? 0.3 : 0.8)}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FavorabilityBarChart;
