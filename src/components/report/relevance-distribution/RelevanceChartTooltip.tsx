
import React from 'react';

interface RelevanceTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const RelevanceChartTooltip: React.FC<RelevanceTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Find the book data in the payload
    const bookData = payload[0].payload;
    
    // Calculate total
    const total = bookData.muitoRelevante + bookData.moderadamenteRelevante + 
                 bookData.poucoRelevante + bookData.irrelevante;
    
    return (
      <div className="bg-white p-3 border rounded-md shadow-md">
        <p className="text-lg font-bold mb-2">{bookData.name}: {bookData.description}</p>
        <p className="mb-2 text-sm">Total: {total} artigos</p>
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex justify-between gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <div 
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: entry.fill }}
                />
                <span>{entry.name}</span>
              </div>
              <span className="font-medium">{entry.value}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-center text-muted-foreground">
          Clique para filtrar
        </p>
      </div>
    );
  }
  
  return null;
};
