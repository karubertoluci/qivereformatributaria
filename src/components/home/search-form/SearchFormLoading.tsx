
import React from 'react';
import { Dialog } from '@/components/ui/dialog';
import LoadingDialog from './LoadingDialog';

interface SearchFormLoadingProps {
  isLoading: boolean;
  onLoadingChange: (isLoading: boolean) => void;
}

const SearchFormLoading: React.FC<SearchFormLoadingProps> = ({ 
  isLoading, 
  onLoadingChange 
}) => {
  return (
    <Dialog open={isLoading} onOpenChange={(open) => onLoadingChange(open)}>
      <LoadingDialog 
        open={isLoading} 
        onOpenChange={() => onLoadingChange(false)} 
        progress={50} 
        companyName="Sua empresa" 
      />
    </Dialog>
  );
};

export default SearchFormLoading;
