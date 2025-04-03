
import React from 'react';

interface ChartLegendHelperProps {
  title?: string;
  items: {
    color: string;
    label: string;
    description: string;
  }[];
}

const ChartLegendHelper: React.FC<ChartLegendHelperProps> = ({ title, items }) => {
  return (
    <div className="mt-6 p-3 bg-muted/50 rounded-md border border-muted">
      {title && <h4 className="font-medium mb-1">{title}</h4>}
      <ul className="text-sm text-muted-foreground space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 bg-[color:var(--item-color)] rounded-full inline-block" 
                  style={{ '--item-color': item.color } as React.CSSProperties}></span>
            <span><strong>{item.label}:</strong> {item.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChartLegendHelper;
