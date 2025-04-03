
import React from 'react';

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
  
  return null; // Return nothing as we don't need a visual component
};

export default ViewSwitcher;
