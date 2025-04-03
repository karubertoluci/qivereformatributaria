
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import ChartTooltipContent from './ChartTooltipContent';
import { PercentageData } from './utils/chartCalculations';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ImpactBarChartProps {
  data: PercentageData[];
  onRelevanceFilter?: (relevanceLevel: string | null) => void;
}

const ImpactBarChart: React.FC<ImpactBarChartProps> = ({ data, onRelevanceFilter }) => {
  const [selectedRelevance, setSelectedRelevance] = useState<string | null>(null);

  // Handle relevance filter selection
  const handleRelevanceSelect = (value: string) => {
    const newValue = value === selectedRelevance ? null : value;
    setSelectedRelevance(newValue);
    if (onRelevanceFilter) {
      onRelevanceFilter(newValue);
    }
  };

  return (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
              dataKey="name" 
              width={150}
              tick={{ fill: '#64748b' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
              tickFormatter={(value) => {
                const item = data.find(d => d.name === value);
                return `${value} (${item?.total || 0} artigos)`;
              }}
            />
            <Tooltip content={<ChartTooltipContent active={false} payload={[]} />} />
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

      {/* Relevance level filters */}
      {onRelevanceFilter && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Filtrar por nível de relevância:</p>
          <ToggleGroup type="single" value={selectedRelevance || ''} onValueChange={handleRelevanceSelect}>
            {data.map((item) => (
              <ToggleGroupItem key={item.name} value={item.name} variant="outline" size="sm"
                className={`text-xs border-muted ${selectedRelevance === item.name ? 'bg-primary/20' : ''}`}>
                {item.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      )}
    </div>
  );
};

export default ImpactBarChart;
