
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { ViewMode } from './types';

interface ViewSwitcherProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ viewMode, setViewMode }) => {
  // Always set to chart mode since it's the only option now
  React.useEffect(() => {
    if (viewMode !== 'chart') {
      setViewMode('chart');
    }
  }, [viewMode, setViewMode]);

  return (
    <div className="flex space-x-2">
      <Button
        variant="default"
        size="sm"
        className="flex items-center gap-1.5"
        aria-label="Visualização em cards"
      >
        <FileText className="h-4 w-4" />
        <span className="hidden sm:inline">Cards</span>
      </Button>
    </div>
  );
};

export default ViewSwitcher;
