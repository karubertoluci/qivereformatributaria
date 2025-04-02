
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

interface ViewSwitcherProps {
  viewMode: 'list' | 'table' | 'chart';
  setViewMode: (mode: 'list' | 'table' | 'chart') => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ viewMode, setViewMode }) => {
  // Always ensure we're in list view
  React.useEffect(() => {
    if (viewMode !== 'list') {
      setViewMode('list');
    }
  }, [viewMode, setViewMode]);
  
  return (
    <div className="flex justify-end mb-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-primary text-primary-foreground"
          onClick={() => setViewMode('list')}
        >
          <BookOpen className="h-4 w-4 mr-1" /> Lista
        </Button>
      </div>
    </div>
  );
};

export default ViewSwitcher;
