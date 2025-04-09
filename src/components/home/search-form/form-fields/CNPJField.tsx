
import React, { useState } from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../FormDialog';
import { Building2, CheckCircle2, XCircle } from 'lucide-react';
import { fetchCNPJData } from '@/services/brasilApi';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { mapCnaeToSegment } from '../utils';

interface CNPJFieldProps {
  form: UseFormReturn<FormValues>;
}

const CNPJField: React.FC<CNPJFieldProps> = ({ form }) => {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // Function to format CNPJ as it's typed
  const formatCNPJ = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    
    // Apply CNPJ mask: XX.XXX.XXX/XXXX-XX
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 5) {
      return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    } else if (digits.length <= 8) {
      return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
    } else if (digits.length <= 12) {
      return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
    } else {
      return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
    }
  };

  // Save CNAE data to Supabase
  const saveCnaeToSupabase = async (cnpj: string, cnae: string, descricao: string, empresa: string) => {
    try {
      // Map CNAE to segment
      const segmento = mapCnaeToSegment(cnae);
      
      // First, save basic data to the consultas table (which is already in the TypeScript types)
      const { error } = await supabase
        .from('consultas')
        .insert({
          cnae: cnae,
          cnpj: cnpj.replace(/\D/g, ''), // Store only digits
          consultado_em: new Date().toISOString()
        });
        
      if (error) {
        console.error('Erro ao salvar dados do CNAE no Supabase:', error);
      } else {
        console.log('Dados do CNAE salvos com sucesso no Supabase');
        
        // Use a direct fetch call to save the additional data to cnae_consultas
        // This bypasses the TypeScript limitations until types are regenerated
        try {
          const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/cnae_consultas`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              cnae: cnae,
              descricao: descricao,
              cnpj: cnpj.replace(/\D/g, ''),
              empresa: empresa,
              segmento: segmento
            })
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          console.log('Dados detalhados do CNAE salvos com sucesso');
        } catch (fetchError) {
          console.error('Erro ao salvar dados detalhados:', fetchError);
          // Continue with the flow even if saving detailed data fails
        }
      }
    } catch (error) {
      console.error('Erro ao tentar salvar CNAE no Supabase:', error);
      // Continue with the flow even if saving to Supabase fails
    }
  };

  // Handle CNPJ validation on blur
  const handleCNPJBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cnpj = event.target.value;
    
    // Only validate if CNPJ has 14 digits (without formatting)
    const digits = cnpj.replace(/\D/g, '');
    if (digits.length === 14) {
      setIsValidating(true);
      setIsValid(null);
      
      try {
        console.log('Validando CNPJ:', cnpj);
        const data = await fetchCNPJData(cnpj);
        setIsValid(true);
        
        // Convert the CNAE code from number to string for consistency
        const cnaeCode = data.cnae_fiscal ? data.cnae_fiscal.toString() : '';
        
        // Create company data object with all API fields maintained in their original format
        const companyData = {
          cnpj: data.cnpj,
          razaoSocial: data.razao_social,
          nomeFantasia: data.nome_fantasia || data.razao_social,
          endereco: `${data.logradouro}, ${data.numero}${data.complemento ? ', ' + data.complemento : ''}, ${data.bairro}, ${data.municipio} - ${data.uf}, CEP: ${data.cep}`,
          cnaePrincipal: {
            codigo: cnaeCode,
            descricao: data.cnae_fiscal_descricao,
          },
          cnaeSecundarios: data.cnaes_secundarios || [],
          situacaoCadastral: data.situacao_cadastral,
          dataSituacaoCadastral: data.data_situacao_cadastral,
          naturezaJuridica: data.natureza_juridica,
          capitalSocial: data.capital_social,
          porte: data.porte,
          telefone: data.ddd_telefone_1,
          // Preservando dados originais para compatibilidade
          original: data
        };
        
        console.log('Dados da empresa obtidos:', companyData);
        toast.success(`CNPJ válido: ${data.razao_social}`);
        
        // Clear any existing company data before setting new data
        localStorage.removeItem('companyData');
        
        // Store company data in localStorage for later use
        localStorage.setItem('companyData', JSON.stringify(companyData));
        localStorage.setItem('companyName', data.razao_social);
        
        // Set CNAE code in localStorage for segment mapping
        localStorage.setItem('cnae', cnaeCode);
        
        // Auto-preencher o nome no formulário
        form.setValue('nome', data.nome_fantasia || data.razao_social);
        
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
      } catch (error) {
        setIsValid(false);
        console.error('Erro ao validar CNPJ:', error);
        toast.error('Erro ao validar CNPJ. Verifique o número e tente novamente.');
      } finally {
        setIsValidating(false);
      }
    } else {
      setIsValid(null);
    }
  };

  const handleCNPJChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Format CNPJ as user types
    const formatted = formatCNPJ(event.target.value);
    form.setValue('cnpj', formatted);
  };

  return (
    <FormField
      control={form.control}
      name="cnpj"
      render={({ field }) => (
        <FormItem>
          <Label htmlFor="cnpj" className="block mb-2 font-medium flex items-center">
            <Building2 className="h-4 w-4 mr-2 text-orange-500" />
            CNPJ da empresa:
          </Label>
          <div className="relative">
            <FormControl>
              <Input
                id="cnpj"
                placeholder="XX.XXX.XXX/XXXX-XX"
                className="border-gray-300 focus-visible:ring-primary pr-10"
                {...field}
                onChange={(e) => {
                  handleCNPJChange(e);
                  field.onChange(e);
                }}
                onBlur={handleCNPJBlur}
              />
            </FormControl>
            {isValidating && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
              </div>
            )}
            {isValid === true && !isValidating && (
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
            )}
            {isValid === false && !isValidating && (
              <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CNPJField;
