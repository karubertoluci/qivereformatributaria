
import React from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';
import { LayoutList, LayoutGrid, ListFilter, Rows, BarChart2, LayoutGrid as LayoutGridIcon } from 'lucide-react';

interface ViewSwitcherProps {
  viewMode: 'list' | 'table' | 'chart';
  setViewMode: (mode: 'list' | 'table' | 'chart') => void;
  isCompactView?: boolean;
  setIsCompactView?: (isCompact: boolean) => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  viewMode,
  setViewMode,
  isCompactView,
  setIsCompactView
}) => {
  return (
    <div className="flex items-center gap-2">
      {isCompactView !== undefined && setIsCompactView && (
        <div className="flex items-center border rounded-md mr-2">
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 ${isCompactView ? 'bg-muted' : ''}`}
            onClick={() => setIsCompactView(true)}
            title="Visualização compacta"
          >
            <Rows className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 ${!isCompactView ? 'bg-muted' : ''}`}
            onClick={() => setIsCompactView(false)}
            title="Visualização normal"
          >
            <LayoutGridIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="flex items-center border rounded-md">
        <Button
          variant="ghost"
          size="sm"
          className={`p-2 ${viewMode === 'list' ? 'bg-muted' : ''}`}
          onClick={() => setViewMode('list')}
          title="Visualização por tópicos"
        >
          <LayoutList className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`p-2 ${viewMode === 'table' ? 'bg-muted' : ''}`}
          onClick={() => setViewMode('table')}
          title="Visualização em tabela"
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`p-2 ${viewMode === 'chart' ? 'bg-muted' : ''}`}
          onClick={() => setViewMode('chart')}
          title="Visualização em gráficos"
        >
          <BarChart2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ViewSwitcher;
