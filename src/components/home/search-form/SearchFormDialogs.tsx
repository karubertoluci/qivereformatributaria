
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
  const [formData, setFormData] = React.useState<FormValues | null>(null);
  const [loadingCompleted, setLoadingCompleted] = React.useState(false);
  
  const handleDialogSubmit = (data: FormValues) => {
    console.log("SearchFormDialogs: Form submitted, preparing to show loading");
    setFormData(data);
    closeFormDialog();
    
    // Pequeno delay para garantir que o modal do formulário fechou completamente
    setTimeout(() => {
      setIsLoading(true);
      console.log("SearchFormDialogs: Starting loading");
      
      // Processa o formulário
      onSubmit(data);
    }, 300);
  };
  
  const handleLoadingComplete = () => {
    setLoadingCompleted(true);
    setIsLoading(false);
    console.log("SearchFormDialogs: Loading completed");
  };

  return (
    <>
      <Dialog open={isFormDialogOpen} onOpenChange={closeFormDialog}>
        <FormDialog onSubmit={handleDialogSubmit} isLoading={isLoading} />
      </Dialog>
      
      <SearchFormLoading 
        isLoading={isLoading} 
        onLoadingChange={setIsLoading}
        onComplete={handleLoadingComplete}
        companyName={formData?.nome || ""}
        companyData={formData?.companyData}
      />
    </>
  );
};

export default SearchFormDialogs;
