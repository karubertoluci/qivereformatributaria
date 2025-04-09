
import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (isLoading && companyData) {
      try {
        // Store structured data with both company information and form data
        localStorage.setItem('formData', JSON.stringify({
          companyName,
          companyData
        }));
        
        console.log("Company data saved to localStorage");
      } catch (error) {
        console.error("Error saving company data to localStorage:", error);
      }
    }
  }, [isLoading, companyData, companyName]);

  // Ensure that onComplete is called even if the dialog is closed manually
  useEffect(() => {
    if (!isLoading && companyData) {
      console.log("Loading completed, executing onComplete callback");
      // Small timeout to ensure state updates have propagated
      const timer = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, companyData, onComplete]);
  
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
