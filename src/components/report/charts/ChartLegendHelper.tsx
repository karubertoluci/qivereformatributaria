
import React from 'react';

interface ChartLegendHelperProps {
  title?: string;
  items: {
    color: string;
    label: string;
    description: string;
  }[];
}

const ChartLegendHelper: React.FC<ChartLegendHelperProps> = ({
  title,
  items
}) => {
  return (
    <div className="mt-4 space-y-2">
      {title && <h4 className="text-sm font-medium">{title}</h4>}
      <div className="space-y-1.5">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <div 
              className="w-3 h-3 mt-1 rounded-sm flex-shrink-0" 
              style={{ backgroundColor: item.color }} 
            />
            <div className="space-y-0.5">
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ChartLegendHelper };
