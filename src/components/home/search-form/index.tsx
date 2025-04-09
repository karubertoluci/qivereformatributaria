
import React, { useState } from 'react';
import { useFormDialogContext } from '../FormDialogContext';
import SearchFormButton from './SearchFormButton';
import SearchFormDialogs from './SearchFormDialogs';
import { FormValues } from './types/companyData';
import { useFormSubmit } from './hooks/useFormSubmit';
import { BusinessSegment } from '@/data/segments';

interface SearchFormProps {
  onSelectSegment?: (segment: BusinessSegment | null) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSelectSegment }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { closeFormDialog } = useFormDialogContext();
  const { handleSubmit, isSubmitting } = useFormSubmit();

  const onSubmit = async (data: FormValues) => {
    console.log("SearchForm: Form submitted, preparing to show loading");
    
    // Process the form without closing the loading modal
    handleSubmit(data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <SearchFormDialogs 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        setIsLoading={setIsLoading}
        onSelectSegment={onSelectSegment || (() => {})}
      />
      
      <div className="flex flex-col items-center justify-center py-6 gap-6">
        <SearchFormButton />
      </div>
    </div>
  );
};

export default SearchForm;
