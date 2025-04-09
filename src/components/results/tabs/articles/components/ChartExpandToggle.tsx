
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
      className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
    >
      {expanded ? (
        <>
          <span>Show less</span>
          <ChevronUp className="h-4 w-4" />
        </>
      ) : (
        <>
          <span>Show more</span>
          <ChevronDown className="h-4 w-4" />
        </>
      )}
    </Button>
  );
};

export default ChartExpandToggle;
