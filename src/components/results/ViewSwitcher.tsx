
import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';

interface ViewSwitcherProps {
  viewMode: 'chart' | 'table';
  setViewMode: (mode: 'chart' | 'table') => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant={viewMode === 'chart' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setViewMode('chart')}
        className="flex items-center gap-1"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Tópicos</span>
      </Button>
      
      <Button
        variant={viewMode === 'table' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setViewMode('table')}
        className="flex items-center gap-1"
      >
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">Tabela</span>
      </Button>
    </div>
  );
};

export default ViewSwitcher;
