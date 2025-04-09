
import React from 'react';
import ReportLoadingDialog from './ReportLoadingDialog';

interface SearchFormLoadingProps {
  isLoading: boolean;
  onLoadingChange: (isLoading: boolean) => void;
  onComplete: () => void;
  companyName: string;
  companyData?: any;
}

const SearchFormLoading: React.FC<SearchFormLoadingProps> = ({ 
  isLoading, 
  onLoadingChange,
  onComplete,
  companyName,
  companyData
}) => {
  console.log("SearchFormLoading - isLoading:", isLoading);
  console.log("SearchFormLoading - companyData:", companyData);
  
  // Store company data in localStorage for use in reports
  React.useEffect(() => {
    if (isLoading && companyData) {
      localStorage.setItem('formData', JSON.stringify({
        companyName,
        companyData
      }));
    }
  }, [isLoading, companyData, companyName]);
  
  return (
    <ReportLoadingDialog 
      open={isLoading} 
      onOpenChange={(open) => onLoadingChange(open)}
      onComplete={onComplete}
      companyName={companyName}
      companyData={companyData}
    />
  );
};

export default SearchFormLoading;
