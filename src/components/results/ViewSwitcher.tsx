
import React from 'react';
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

  // Return an empty fragment since we don't need to show any view mode buttons
  return <></>;
};

export default ViewSwitcher;
