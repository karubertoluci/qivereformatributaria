
import React from 'react';

interface RelevanceChartLegendProps {
  payload?: any[];
  colorScheme: {
    muitoRelevante: string;
    moderadamenteRelevante: string;
    poucoRelevante: string;
    irrelevante: string;
  };
  selectedRelevance: string | null;
  onSelectRelevance: (relevance: string | null) => void;
}

const RelevanceChartLegend: React.FC<RelevanceChartLegendProps> = ({
  payload,
  colorScheme,
  selectedRelevance,
  onSelectRelevance
}) => {
  const relevanceItems = [
    { key: 'irrelevante', label: 'Irrelevante', color: colorScheme.irrelevante },
    { key: 'poucoRelevante', label: 'Pouco relevante', color: colorScheme.poucoRelevante },
    { key: 'moderadamenteRelevante', label: 'Moderadamente relevante', color: colorScheme.moderadamenteRelevante },
    { key: 'muitoRelevante', label: 'Muito relevante', color: colorScheme.muitoRelevante },
  ];
  
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {relevanceItems.map((item) => (
        <div 
          key={item.key}
          className={`flex items-center gap-1.5 px-2 py-1 rounded-md cursor-pointer transition-colors
            ${selectedRelevance === item.label ? 'bg-secondary border border-primary' : 'hover:bg-secondary/50'}`}
          onClick={() => onSelectRelevance(item.label)}
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

export default RelevanceChartLegend;
