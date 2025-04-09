
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ChartExpandToggleProps {
  expanded: boolean;
  toggleExpanded: () => void;
}

const ChartExpandToggle: React.FC<ChartExpandToggleProps> = ({
  expanded,
  toggleExpanded
}) => {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleExpanded} 
      className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
    >
      {expanded ? (
        <>
          <ChevronUp className="h-4 w-4" />
          <span>Menos gráficos</span>
        </>
      ) : (
        <>
          <ChevronDown className="h-4 w-4" />
          <span>Mais gráficos</span>
        </>
      )}
    </Button>
  );
};

export default ChartExpandToggle;
