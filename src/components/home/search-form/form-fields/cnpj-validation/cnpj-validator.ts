
import { fetchCNPJData } from '@/services/brasilApi';
import { toast } from 'sonner';
import { saveCnaeToSupabase } from './supabase-operations';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../../types/companyData';

/**
 * Validates a CNPJ by fetching its data from the API
 * @param cnpj The CNPJ to validate
 * @param form The form instance for setting values
 * @param setIsValid Function to set validation state
 * @param setIsValidating Function to set validation loading state
 */
export const validateCNPJ = async (
  cnpj: string,
  form: UseFormReturn<FormValues>,
  setIsValid: (isValid: boolean | null) => void,
  setIsValidating: (isValidating: boolean) => void
) => {
  // Only validate if CNPJ has 14 digits (without formatting)
  const digits = cnpj.replace(/\D/g, '');
  if (digits.length !== 14) {
    setIsValid(null);
    return null;
  }
  
  setIsValidating(true);
  setIsValid(null);
  
  try {
    console.log('Validando CNPJ:', cnpj);
    const data = await fetchCNPJData(cnpj);
    console.log('Dados recebidos da API:', data);
    setIsValid(true);
    
    // Convert the CNAE code from number to string for consistency
    const cnaeCode = data.cnae_fiscal ? data.cnae_fiscal.toString() : '';
    console.log('CNAE extraído:', cnaeCode);
    
    // Create company data object with all API fields maintained in their original format
    const companyData = {
      cnpj: data.cnpj,
      razaoSocial: data.razao_social,
      nomeFantasia: data.nome_fantasia || data.razao_social,
      endereco: `${data.logradouro}, ${data.numero}${data.complemento ? ', ' + data.complemento : ''}, ${data.bairro}, ${data.municipio} - ${data.uf}, CEP: ${data.cep}`,
      logradouro: data.logradouro,
      numero: data.numero,
      complemento: data.complemento,
      bairro: data.bairro,
      municipio: data.municipio,
      uf: data.uf,
      cep: data.cep,
      cnaePrincipal: {
        codigo: cnaeCode,
        descricao: data.cnae_fiscal_descricao,
      },
      cnaeSecundarios: data.cnaes_secundarios ? data.cnaes_secundarios.map((cnae: any) => ({
        codigo: cnae.codigo.toString(),
        descricao: cnae.descricao
      })) : [],
      situacaoCadastral: data.situacao_cadastral,
      dataSituacaoCadastral: data.data_situacao_cadastral,
      naturezaJuridica: data.natureza_juridica,
      capitalSocial: data.capital_social,
      porte: data.porte,
      telefone: data.ddd_telefone_1,
      // Preserving original data for compatibility
      razao_social: data.razao_social,
      nome_fantasia: data.nome_fantasia,
      cnae_fiscal: data.cnae_fiscal,
      cnae_fiscal_descricao: data.cnae_fiscal_descricao,
      cnaes_secundarios: data.cnaes_secundarios,
      situacao_cadastral: data.situacao_cadastral,
      data_situacao_cadastral: data.data_situacao_cadastral,
      natureza_juridica: data.natureza_juridica,
      capital_social: data.capital_social,
      ddd_telefone_1: data.ddd_telefone_1
    };
    
    console.log('Dados da empresa formatados:', companyData);
    toast.success(`CNPJ válido: ${data.razao_social}`);
    
    // Clear any existing company data before setting new data
    localStorage.removeItem('companyData');
    
    // Store company data in localStorage for later use
    localStorage.setItem('companyData', JSON.stringify(companyData));
    localStorage.setItem('companyName', data.nome_fantasia || data.razao_social);
    
    // Set CNAE code in localStorage for segment mapping
    localStorage.setItem('cnae', cnaeCode);
    
    // Auto-fill the nome in the form (do NOT set this to the company name)
    // Let the user enter their own name, not the company name
    
    // Save CNAE data to Supabase
    if (cnaeCode && data.cnae_fiscal_descricao) {
      saveCnaeToSupabase(
        data.cnpj,
        cnaeCode,
        data.cnae_fiscal_descricao,
        data.razao_social
      );
    }
    
    // If we're in the results page, reload to refresh data
    if (window.location.pathname.includes('/results/')) {
      window.location.reload();
    }
    
    return { companyData };
  } catch (error) {
    setIsValid(false);
    console.error('Erro ao validar CNPJ:', error);
    toast.error('Erro ao validar CNPJ. Verifique o número e tente novamente.');
    return null;
  } finally {
    setIsValidating(false);
  }
};
