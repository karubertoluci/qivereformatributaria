
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ChartTooltipContentProps {
  active: boolean;
  payload: any[];
}

const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-md border bg-background p-3 shadow-md">
        <div className="font-medium flex items-center gap-2">
          {data.name} 
          {data.hasCritical && (
            <span className="text-red-500 flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" /> 
              Crítico
            </span>
          )}
        </div>
        <div className="text-sm mt-2 space-y-1">
          <div className="flex justify-between">
            <span className="flex items-center">
              <span className="h-2 w-2 bg-green-500 rounded-full inline-block mr-1"></span>
              Favorável:
            </span>
            <span>{data.favorable}%</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center">
              <span className="h-2 w-2 bg-gray-400 rounded-full inline-block mr-1"></span>
              Neutro:
            </span>
            <span>{data.neutral}%</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center">
              <span className="h-2 w-2 bg-red-500 rounded-full inline-block mr-1"></span>
              Desfavorável:
            </span>
            <span>{data.unfavorable}%</span>
          </div>
        </div>
        <div className="text-xs mt-2 text-muted-foreground">
          Total: {data.total} artigos
        </div>
      </div>
    );
  }
  return null;
};

export default ChartTooltipContent;
