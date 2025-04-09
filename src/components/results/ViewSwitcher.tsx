
import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart2, Activity } from 'lucide-react';

interface ViewSwitcherProps {
  viewMode: 'chart' | 'table';
  setViewMode: (mode: 'chart' | 'table') => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  viewMode,
  setViewMode
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant={viewMode === 'chart' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setViewMode('chart')}
        className="flex items-center gap-1"
      >
        <BarChart2 className="h-4 w-4" />
        <span className="hidden sm:inline">Gráfico</span>
      </Button>
      <Button 
        variant={viewMode === 'table' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setViewMode('table')}
        className="flex items-center gap-1"
      >
        <Activity className="h-4 w-4" />
        <span className="hidden sm:inline">Distribuição</span>
      </Button>
    </div>
  );
};

export default ViewSwitcher;
