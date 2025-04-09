
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
          razaoSocial: companyData.razaoSocial || companyData.razao_social || 'Empresa não identificada',
          nomeFantasia: companyData.nomeFantasia || 
                       companyData.nome_fantasia || 
                       companyData.razaoSocial || 
                       companyData.razao_social || 
                       'Empresa não identificada',
          endereco: companyData.endereco || formatAddress(companyData),
          cnaePrincipal: companyData.cnaePrincipal || {
            codigo: companyData.cnae_fiscal?.toString() || '',
            descricao: companyData.cnae_fiscal_descricao || 'CNAE não identificado'
          },
          cnaeSecundarios: processSecondaryActivities(companyData),
          situacaoCadastral: companyData.situacaoCadastral || companyData.situacao_cadastral || 'Ativa',
          dataSituacaoCadastral: companyData.dataSituacaoCadastral || companyData.data_situacao_cadastral,
          naturezaJuridica: companyData.naturezaJuridica || companyData.natureza_juridica || 'Não informada',
          capitalSocial: companyData.capitalSocial || companyData.capital_social,
          porte: companyData.porte || 'Não informado',
          telefone: companyData.telefone || formatPhone(companyData),
          original: companyData.original || companyData
        };
        
        console.log('Dados da empresa formatados:', formattedData);
        setFormData(formattedData);
        
        // Set company name in localStorage for easy access by other components
        localStorage.setItem('companyName', formattedData.razaoSocial);
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

  // Helper function to format address from API response
  const formatAddress = (data: any): string => {
    if (!data) return '';
    
    const parts = [];
    if (data.logradouro) parts.push(data.logradouro);
    if (data.numero) parts.push(data.numero);
    if (data.complemento) parts.push(data.complemento);
    if (data.bairro) parts.push(data.bairro);
    
    let address = parts.join(', ');
    
    if (data.municipio && data.uf) {
      address += ` - ${data.municipio}/${data.uf}`;
    }
    
    if (data.cep) {
      address += ` - CEP: ${data.cep.replace(/^(\d{5})(\d{3})$/, "$1-$2")}`;
    }
    
    return address || 'Endereço não disponível';
  };
  
  // Helper function to format phone from API response
  const formatPhone = (data: any): string => {
    if (!data) return '';
    
    if (data.ddd_telefone_1) {
      const phone = data.ddd_telefone_1.replace(/\D/g, '');
      if (phone.length === 10) {
        return `(${phone.substring(0, 2)}) ${phone.substring(2, 6)}-${phone.substring(6)}`;
      } else if (phone.length === 11) {
        return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7)}`;
      }
      return phone;
    }
    
    return 'Telefone não disponível';
  };
  
  // Helper function to process secondary activities
  const processSecondaryActivities = (data: any): Array<{codigo: string, descricao: string}> => {
    if (!data) return [];
    
    if (data.cnaeSecundarios && Array.isArray(data.cnaeSecundarios)) {
      return data.cnaeSecundarios.map((cnae: any) => ({
        codigo: typeof cnae.codigo === 'number' ? cnae.codigo.toString() : cnae.codigo,
        descricao: cnae.descricao || 'Descrição não disponível'
      }));
    }
    
    if (data.cnaes_secundarios && Array.isArray(data.cnaes_secundarios)) {
      return data.cnaes_secundarios.map((cnae: any) => ({
        codigo: typeof cnae.codigo === 'number' ? cnae.codigo.toString() : cnae.codigo,
        descricao: cnae.descricao || 'Descrição não disponível'
      }));
    }
    
    return [];
  };

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
