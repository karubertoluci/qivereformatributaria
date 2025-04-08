
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChartExpandToggleProps {
  expanded: boolean;
  toggleExpanded: () => void;
}

const ChartExpandToggle: React.FC<ChartExpandToggleProps> = ({ expanded, toggleExpanded }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleExpanded}
      className="flex items-center gap-1 text-sm"
    >
      {expanded ? (
        <>
          <ChevronUp className="h-4 w-4" />
          <span>Minimizar</span>
        </>
      ) : (
        <>
          <ChevronDown className="h-4 w-4" />
          <span>Expandir</span>
        </>
      )}
    </Button>
  );
};

export default ChartExpandToggle;
