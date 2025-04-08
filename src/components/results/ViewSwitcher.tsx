
import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutList, LayoutGrid, FileText } from 'lucide-react';
import { ViewMode } from './types';

interface ViewSwitcherProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant={viewMode === 'list' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setViewMode('list')}
        aria-label="Visualização em tópicos"
        className="flex items-center gap-1.5"
      >
        <LayoutList className="h-4 w-4" />
        <span className="hidden sm:inline">Tópicos</span>
      </Button>
      
      <Button
        variant={viewMode === 'table' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setViewMode('table')}
        aria-label="Visualização em tabela"
        className="flex items-center gap-1.5"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Tabela</span>
      </Button>
      
      <Button
        variant={viewMode === 'chart' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setViewMode('chart')}
        aria-label="Visualização em cards"
        className="flex items-center gap-1.5"
      >
        <FileText className="h-4 w-4" />
        <span className="hidden sm:inline">Cards</span>
      </Button>
    </div>
  );
};

export default ViewSwitcher;
