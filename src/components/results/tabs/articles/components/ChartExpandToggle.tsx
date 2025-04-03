
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ChartExpandToggleProps {
  collapsed: boolean;
  onToggle: () => void;
}

const ChartExpandToggle: React.FC<ChartExpandToggleProps> = ({ collapsed, onToggle }) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="mb-4" 
      onClick={onToggle}
    >
      {collapsed ? (
        <>
          <ArrowDown className="h-4 w-4 mr-1" /> 
          Expandir Gráficos e Filtros
        </>
      ) : (
        <>
          <ArrowUp className="h-4 w-4 mr-1" />
          Recolher Gráficos e Filtros
        </>
      )}
    </Button>
  );
};

export default ChartExpandToggle;
