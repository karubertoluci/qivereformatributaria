
import React from 'react';
import { TooltipProps } from 'recharts';

export const RelevanceChartTooltip: React.FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }
  
  // Color scheme for the relevance levels
  const colors = {
    muitoRelevante: '#10b981', // verde
    moderadamenteRelevante: '#facc15', // amarelo
    poucoRelevante: '#6b7280', // cinza escuro
    irrelevante: '#d1d5db', // cinza claro
  };
  
  // Mapping to human-readable names
  const relevanceNames = {
    muitoRelevante: 'Muito relevante',
    moderadamenteRelevante: 'Moderadamente relevante',
    poucoRelevante: 'Pouco relevante',
    irrelevante: 'Irrelevante',
  };

  const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0);
  
  return (
    <div className="bg-white p-3 shadow-md rounded-md border border-gray-200 min-w-[200px]">
      <p className="text-sm font-medium mb-2 border-b pb-1">{label}</p>
      
      <div className="space-y-1">
        {payload.map((entry, index) => {
          // Skip if value is zero
          if (entry.value === 0) return null;
          
          const relevanceKey = entry.dataKey as keyof typeof relevanceNames;
          const name = relevanceNames[relevanceKey] || entry.name || entry.dataKey;
          // Fix: Use type assertion to access color properties safely
          const color = colors[relevanceKey] || entry.color || (entry as any).fill;
          
          return (
            <div key={`item-${index}`} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }}></div>
                <span>{name}:</span>
              </div>
              <span className="font-medium">{entry.value} artigos</span>
            </div>
          );
        })}
        
        {total > 0 && (
          <div className="flex justify-between items-center text-sm font-semibold border-t mt-1 pt-1">
            <span>Total:</span>
            <span>{total} artigos</span>
          </div>
        )}
      </div>
    </div>
  );
};
