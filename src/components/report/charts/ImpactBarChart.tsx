
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

  // Garantir que todos os níveis de relevância estão presentes, mesmo que sem dados
  const relevanceLevels = ['Irrelevante', 'Pouco relevante', 'Moderadamente relevante', 'Muito relevante'];
  const allLevelsData = relevanceLevels.map(level => {
    const existingData = data.find(item => item.name === level);
    if (existingData) return existingData;
    
    // Se não existir, cria um item com valores zerados
    return {
      name: level,
      favorable: 0,
      neutral: 0,
      unfavorable: 0,
      total: 0,
      hasCritical: false
    };
  });

  return (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={allLevelsData}
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
                const item = allLevelsData.find(d => d.name === value);
                return `${value} ${item?.total ? `(${item.total} artigos)` : '(0 artigos)'}`;
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
              {allLevelsData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={entry.hasCritical ? '#dc2626' : '#ef4444'} // Vermelho mais brilhante para impactos críticos
                  strokeWidth={entry.hasCritical ? 1 : 0}
                  stroke="#000"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filtros de nível de relevância - exibindo todos os níveis, mesmo que sem dados */}
      {onRelevanceFilter && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Filtrar por nível de relevância:</p>
          <ToggleGroup type="single" value={selectedRelevance || ''} onValueChange={handleRelevanceSelect}>
            {relevanceLevels.map((levelName) => (
              <ToggleGroupItem key={levelName} value={levelName} variant="outline" size="sm"
                className={`text-xs border-muted ${selectedRelevance === levelName ? 'bg-primary/20' : ''}`}>
                {levelName}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      )}
    </div>
  );
};

export default ImpactBarChart;
