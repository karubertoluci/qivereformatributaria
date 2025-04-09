
import React from 'react';
import { Dialog } from '@/components/ui/dialog';
import FormDialog from './FormDialog';
import { FormValues } from './types/companyData';
import SearchFormLoading from './SearchFormLoading';
import { useFormDialogContext } from '../FormDialogContext';

interface SearchFormDialogsProps {
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const SearchFormDialogs: React.FC<SearchFormDialogsProps> = ({ 
  onSubmit, 
  isLoading, 
  setIsLoading 
}) => {
  const { isFormDialogOpen, closeFormDialog } = useFormDialogContext();

  return (
    <>
      <Dialog open={isFormDialogOpen} onOpenChange={closeFormDialog}>
        <FormDialog onSubmit={onSubmit} isLoading={isLoading} />
      </Dialog>
      
      <SearchFormLoading 
        isLoading={isLoading} 
        onLoadingChange={setIsLoading}
      />
    </>
  );
};

export default SearchFormDialogs;
