
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChartExpandToggleProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  collapsedLabel: string;
  expandedLabel: string;
  className?: string;
}

const ChartExpandToggle: React.FC<ChartExpandToggleProps> = ({
  isCollapsed,
  setIsCollapsed,
  collapsedLabel,
  expandedLabel,
  className = ''
}) => {
  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={() => setIsCollapsed(!isCollapsed)}
      className={`flex items-center gap-1 ${className}`}
    >
      {isCollapsed ? (
        <>
          <ChevronDown className="h-4 w-4" />
          {collapsedLabel}
        </>
      ) : (
        <>
          <ChevronUp className="h-4 w-4" />
          {expandedLabel}
        </>
      )}
    </Button>
  );
};

export default ChartExpandToggle;
