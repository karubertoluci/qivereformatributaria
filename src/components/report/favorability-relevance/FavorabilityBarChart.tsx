
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { FavorabilityRelevanceData } from './useFavorabilityRelevanceData';
interface FavorabilityBarChartProps {
  chartData: FavorabilityRelevanceData[];
  selectedFavorability: string | null;
  onSelectFavorability: (favorability: string | null) => void;
}
const FavorabilityBarChart: React.FC<FavorabilityBarChartProps> = ({
  chartData,
  selectedFavorability,
  onSelectFavorability
}) => {
  // Garantir que o chartData tenha entradas únicas por nível de relevância
  // Isso é especialmente importante para o status "Geral" onde dados de múltiplos livros são agregados
  const relevanceLevels = ['Irrelevante', 'Pouco relevante', 'Moderadamente relevante', 'Muito relevante'];

  // Primeiro vamos filtrar os dados para ter apenas um item por nível de relevância
  // Isso evita duplicação quando estamos no modo "Geral" com dados de vários livros
  const uniqueChartData = relevanceLevels.map(level => {
    // Encontra todos os itens para este nível de relevância
    const relevanceItems = chartData.filter(item => item.relevanceLevel === level);

    // Se não há itens para este nível, criamos um com valores zero
    if (relevanceItems.length === 0) {
      return {
        relevanceLevel: level,
        favorable: 0,
        neutral: 0,
        unfavorable: 0,
        name: level,
        bookId: 'none',
        total: 0
      };
    }

    // Caso contrário, usamos o primeiro item (ou agregamos se necessário)
    return relevanceItems[0];
  });

  // Custom legend that acts as a filter
  const renderCustomLegend = () => {
    return (
      <div className="flex justify-center gap-4 mt-6 py-2">
        {[
          { key: 'favorable', label: 'Favorável', color: '#4ade80' },
          { key: 'neutral', label: 'Neutro', color: '#d1d5db' },
          { key: 'unfavorable', label: 'Desfavorável', color: '#ef4444' }
        ].map(item => (
          <div 
            key={item.key} 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md cursor-pointer transition-colors
              ${selectedFavorability === item.key ? 'bg-secondary border border-primary' : 'hover:bg-secondary/50'}`}
            onClick={() => onSelectFavorability(selectedFavorability === item.key ? null : item.key)}
          >
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: item.color }} 
            />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={uniqueChartData} 
            layout="vertical" 
            margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              tickFormatter={value => `${value}%`} 
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
              labelFormatter={label => `${label}`} 
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }} 
            />
            {/* Hide the default legend as we'll use our custom one */}
            <Legend content={() => null} />
            
            {/* Only render bars that aren't filtered out */}
            {(!selectedFavorability || selectedFavorability === 'favorable') && (
              <Bar 
                dataKey="favorable" 
                stackId="a" 
                name="favorable" 
                fill="#4ade80" 
                isAnimationActive={false} 
              />
            )}
            {(!selectedFavorability || selectedFavorability === 'neutral') && (
              <Bar 
                dataKey="neutral" 
                stackId="a" 
                name="neutral" 
                fill="#d1d5db" 
                isAnimationActive={false} 
              />
            )}
            {(!selectedFavorability || selectedFavorability === 'unfavorable') && (
              <Bar 
                dataKey="unfavorable" 
                stackId="a" 
                name="unfavorable" 
                fill="#ef4444" 
                isAnimationActive={false} 
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
      {renderCustomLegend()}
    </div>
  );
};

export default FavorabilityBarChart;
