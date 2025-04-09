
import { useState, useEffect, useCallback } from 'react';
import { CompanyData } from './types';
import { toast } from 'sonner';

export const useCompanyData = () => {
  const [formData, setFormData] = useState<CompanyData | null>(null);
  
  // Load company data from localStorage as a callback function
  const refreshCompanyData = useCallback(() => {
    try {
      console.log('Updating company data from localStorage');
      
      // First try to load from formData (combined personal and company data)
      const formDataStr = localStorage.getItem('formData');
      if (formDataStr) {
        const parsedFormData = JSON.parse(formDataStr);
        console.log('Form data loaded:', parsedFormData);
        
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
          
          // Create properly formatted CNAE arrays if they don't exist
          if (!parsedFormData.companyData.cnaeSecundarios && parsedFormData.companyData.cnaes_secundarios) {
            parsedFormData.companyData.cnaeSecundarios = parsedFormData.companyData.cnaes_secundarios;
          }
          
          if (!parsedFormData.companyData.cnaePrincipal && parsedFormData.companyData.cnae_fiscal) {
            parsedFormData.companyData.cnaePrincipal = {
              codigo: parsedFormData.companyData.cnae_fiscal.toString(),
              descricao: parsedFormData.companyData.cnae_fiscal_descricao || ''
            };
          }
          
          console.log('Formatted company data:', parsedFormData);
          setFormData(parsedFormData);
        }
      } else {
        // As a fallback, try loading just company data
        const companyDataStr = localStorage.getItem('companyData');
        if (companyDataStr) {
          const companyData = JSON.parse(companyDataStr);
          console.log('Company data loaded:', companyData);
          
          // Format the data to ensure consistency
          setFormData({
            companyData
          });
        } else {
          console.log('No company data found in localStorage');
        }
      }
    } catch (e) {
      console.error('Error loading company data from localStorage:', e);
      toast.error('Erro ao carregar dados da empresa');
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
