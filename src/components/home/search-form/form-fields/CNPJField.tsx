
import React, { useState, useEffect } from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../types/companyData';
import { Building2 } from 'lucide-react';
import { formatCNPJInput } from './utils/cnpj-formatter';
import ValidationStatus from './cnpj-validation/ValidationStatus';
import { validateCNPJ } from './cnpj-validation/cnpj-validator';
import CompanyCard from './CompanyCard';

interface CNPJFieldProps {
  form: UseFormReturn<FormValues>;
}

const CNPJField: React.FC<CNPJFieldProps> = ({ form }) => {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [companyData, setCompanyData] = useState<any>(null);
  
  // Verificar dados da empresa no localStorage quando o componente monta
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('companyData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log('Dados da empresa carregados do localStorage:', parsedData);
        setCompanyData(parsedData);
      }
    } catch (error) {
      console.error('Erro ao carregar dados da empresa:', error);
    }
  }, []);

  // Lidar com a validação do CNPJ ao perder o foco
  const handleCNPJBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cnpj = event.target.value;
    await validateCNPJ(cnpj, form, setIsValid, setIsValidating);
    
    // Após a validação, atualizar os dados da empresa do localStorage
    try {
      const storedData = localStorage.getItem('companyData');
      if (storedData) {
        setCompanyData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Erro ao carregar dados da empresa após validação:', error);
    }
  };

  const handleCNPJChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Formatar CNPJ enquanto o usuário digita
    const formatted = formatCNPJInput(event.target.value);
    form.setValue('cnpj', formatted);
  };

  // Obter nome da empresa, segmento e CNPJ (se disponível)
  const companyName = companyData?.nomeFantasia || companyData?.nome_fantasia || companyData?.razao_social || '';
  const segment = companyData?.cnae_fiscal_descricao || '';
  const cnpj = companyData?.cnpj || form.getValues('cnpj') || '';

  return (
    <>
      {/* Cartão da empresa - mostra durante carregamento ou quando dados estão disponíveis */}
      {(isValidating || companyData) && (
        <CompanyCard 
          companyName={companyName} 
          segment={segment} 
          cnpj={cnpj}
          isLoading={isValidating} 
        />
      )}
      
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
              <ValidationStatus isValidating={isValidating} isValid={isValid} />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CNPJField;
