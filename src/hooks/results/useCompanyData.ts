
import { useState, useEffect, useCallback } from 'react';
import { CompanyData } from './types';

export const useCompanyData = () => {
  const [formData, setFormData] = useState<CompanyData | null>(null);
  
  // Load company data from localStorage as a callback function
  const refreshCompanyData = useCallback(() => {
    try {
      console.log('Atualizando dados da empresa do localStorage');
      
      // First try to load from formData (combined personal and company data)
      const formDataStr = localStorage.getItem('formData');
      if (formDataStr) {
        const parsedFormData = JSON.parse(formDataStr);
        console.log('Dados do formulário carregados:', parsedFormData);
        
        // Set form data including both personal and company information
        setFormData(parsedFormData);
        
        // If there's company data in the form data
        if (parsedFormData.companyData) {
          // Set company name in localStorage for easy access by other components
          const companyName = parsedFormData.companyData.nome_fantasia || 
                             parsedFormData.companyData.nomeFantasia || 
                             parsedFormData.companyData.razao_social || 
                             parsedFormData.companyData.razaoSocial;
          
          if (companyName) {
            localStorage.setItem('companyName', companyName);
          }
        }
      } else {
        // As a fallback, try loading just company data
        const companyDataStr = localStorage.getItem('companyData');
        if (companyDataStr) {
          const companyData = JSON.parse(companyDataStr);
          console.log('Dados da empresa carregados:', companyData);
          
          // Format the data to ensure consistency
          setFormData({
            companyData
          });
        }
      }
    } catch (e) {
      console.error('Erro ao carregar dados da empresa do localStorage:', e);
    }
  }, []);

  // Initial load of company data
  useEffect(() => {
    refreshCompanyData();
  }, [refreshCompanyData]);

  return { 
    formData, 
    hasCompanyData: formData !== null && formData.companyData !== undefined,
    refreshCompanyData 
  };
};
