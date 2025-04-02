
import React, { useState } from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../FormDialog';
import { Building2, CheckCircle2, XCircle } from 'lucide-react';
import { fetchCNPJData } from '@/services/brasilApi';

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

  // Handle CNPJ validation on blur
  const handleCNPJBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cnpj = event.target.value;
    
    // Only validate if CNPJ has 14 digits (without formatting)
    const digits = cnpj.replace(/\D/g, '');
    if (digits.length === 14) {
      setIsValidating(true);
      try {
        const data = await fetchCNPJData(cnpj);
        setIsValid(true);
        
        // Store company data in localStorage for later use
        localStorage.setItem('companyData', JSON.stringify({
          cnpj: data.cnpj,
          razaoSocial: data.razao_social,
          nomeFantasia: data.nome_fantasia,
          endereco: `${data.logradouro}, ${data.numero}, ${data.bairro}, ${data.municipio} - ${data.uf}`,
          cnaePrincipal: {
            codigo: data.cnae_fiscal.toString(),
            descricao: data.cnae_fiscal_descricao,
          },
          cnaeSecundarios: data.cnaes_secundarios,
          situacaoCadastral: data.situacao_cadastral,
          naturezaJuridica: data.natureza_juridica,
        }));
      } catch (error) {
        setIsValid(false);
        console.error('Error validating CNPJ:', error);
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
