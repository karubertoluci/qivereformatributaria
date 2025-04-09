
import React from 'react';
import { ArticlePriorityData } from './utils/chartCalculations';

interface PriorityChartTooltipProps {
  active?: boolean;
  payload?: any[];
}

const PriorityChartTooltip: React.FC<PriorityChartTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ArticlePriorityData;
    
    return (
      <div className="bg-white p-2 border rounded shadow-lg text-xs max-w-[250px]">
        <p className="font-bold">{data.number}: {data.title}</p>
        <p className="text-muted-foreground mt-1">{data.simplified}</p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <p>Relevância:</p>
            <p className="font-medium">{data.relevance}/100</p>
            <p className="text-xs text-muted-foreground">{data.relevanceCategory}</p>
          </div>
          <div>
            <p>Urgência:</p>
            <p className="font-medium">{data.urgency}/100</p>
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
            data.impactType === 'positive' ? 'bg-green-100 text-green-700' : 
            data.impactType === 'negative' ? 'bg-red-100 text-red-700' : 
            'bg-gray-100 text-gray-700'
          }`}>
            {data.impactLabel}
          </span>
          <span className="text-xs text-primary">Artigo {data.number}</span>
        </div>
        <p className="mt-1 text-center text-primary-foreground bg-primary/80 rounded p-1">
          Clique para detalhes
        </p>
      </div>
    );
  }
  
  return null;
};

export default PriorityChartTooltip;
