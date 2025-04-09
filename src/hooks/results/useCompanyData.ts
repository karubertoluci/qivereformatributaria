
import { useState, useEffect, useCallback } from 'react';
import { CompanyData } from './types';

export const useCompanyData = () => {
  const [formData, setFormData] = useState<CompanyData | null>(null);
  
  // Load company data from localStorage as a callback function
  const refreshCompanyData = useCallback(() => {
    try {
      console.log('Atualizando dados da empresa do localStorage');
      // First try to load from companyData (from API)
      const companyDataStr = localStorage.getItem('companyData');
      if (companyDataStr) {
        const companyData = JSON.parse(companyDataStr);
        console.log('Dados da empresa carregados:', companyData);
        
        // Format the data to ensure consistency
        const formattedData: CompanyData = {
          cnpj: companyData.cnpj,
          razaoSocial: companyData.razaoSocial || companyData.razao_social,
          nomeFantasia: companyData.nomeFantasia || companyData.nome_fantasia || companyData.razaoSocial || companyData.razao_social,
          endereco: companyData.endereco,
          cnaePrincipal: companyData.cnaePrincipal || {
            codigo: companyData.cnae_fiscal?.toString() || '',
            descricao: companyData.cnae_fiscal_descricao || ''
          },
          cnaeSecundarios: companyData.cnaeSecundarios || 
                          companyData.cnaes_secundarios?.map((cnae: any) => ({
                            codigo: typeof cnae.codigo === 'number' ? cnae.codigo.toString() : cnae.codigo,
                            descricao: cnae.descricao
                          })) || [],
          situacaoCadastral: companyData.situacaoCadastral || companyData.situacao_cadastral,
          dataSituacaoCadastral: companyData.dataSituacaoCadastral || companyData.data_situacao_cadastral,
          naturezaJuridica: companyData.naturezaJuridica || companyData.natureza_juridica,
          capitalSocial: companyData.capitalSocial || companyData.capital_social,
          porte: companyData.porte,
          telefone: companyData.telefone || companyData.ddd_telefone_1,
          original: companyData.original || companyData
        };
        
        console.log('Dados da empresa formatados:', formattedData);
        setFormData(formattedData);
        
        // Set company name in localStorage for easy access by other components
        localStorage.setItem('companyName', formattedData.razaoSocial || '');
      } else {
        // Fallback to formData for backwards compatibility
        const formDataStr = localStorage.getItem('formData');
        if (formDataStr) {
          const formDataObj = JSON.parse(formDataStr);
          setFormData(formDataObj);
          console.log('Dados do formulário carregados:', formDataObj);
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
    hasCompanyData: formData !== null,
    refreshCompanyData 
  };
};
