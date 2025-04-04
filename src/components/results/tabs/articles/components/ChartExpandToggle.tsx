
import React from 'react';
import { Button } from '@/components/ui/button';
import { Maximize2, Minimize2 } from 'lucide-react';

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
      title={expanded ? "Minimizar gráfico" : "Expandir gráfico"}
      className="h-8 w-8 p-0"
    >
      {expanded ? (
        <Minimize2 className="h-4 w-4" />
      ) : (
        <Maximize2 className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ChartExpandToggle;
