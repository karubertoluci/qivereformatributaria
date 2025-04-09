import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';
interface ViewSwitcherProps {
  viewMode: 'chart' | 'table';
  setViewMode: (mode: 'chart' | 'table') => void;
}
const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  viewMode,
  setViewMode
}) => {
  return;
};
export default ViewSwitcher;