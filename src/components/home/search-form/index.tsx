
import React, { useState } from 'react';
import { useFormDialogContext } from '../FormDialogContext';
import SearchFormButton from './SearchFormButton';
import SearchFormDialogs from './SearchFormDialogs';
import { FormValues } from './types/companyData';
import { useFormSubmit } from './hooks/useFormSubmit';

const SearchForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { closeFormDialog } = useFormDialogContext();
  const { handleSubmit, isSubmitting } = useFormSubmit();

  const onSubmit = async (data: FormValues) => {
    console.log("SearchForm: Formulário submetido, preparando para mostrar carregamento");
    
    // Processa o formulário sem fechar o modal de carregamento
    handleSubmit(data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <SearchFormDialogs 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        setIsLoading={setIsLoading} 
      />
      
      <div className="flex flex-col items-center justify-center py-6 gap-6">
        <SearchFormButton />
      </div>
    </div>
  );
};

export default SearchForm;
