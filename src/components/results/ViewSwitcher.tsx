
import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart, BookOpen, Filter } from 'lucide-react';

interface ViewSwitcherProps {
  viewMode: 'list' | 'table' | 'chart';
  setViewMode: (mode: 'list' | 'table' | 'chart') => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className={viewMode === 'chart' ? 'bg-primary text-primary-foreground' : ''}
          onClick={() => setViewMode('chart')}
        >
          <BarChart className="h-4 w-4 mr-1" /> Prioridade
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={viewMode === 'list' ? 'bg-primary text-primary-foreground' : ''}
          onClick={() => setViewMode('list')}
        >
          <BookOpen className="h-4 w-4 mr-1" /> Lista
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={viewMode === 'table' ? 'bg-primary text-primary-foreground' : ''}
          onClick={() => setViewMode('table')}
        >
          <Filter className="h-4 w-4 mr-1" /> Tabela
        </Button>
      </div>
    </div>
  );
};

export default ViewSwitcher;
