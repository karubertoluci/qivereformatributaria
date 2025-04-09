
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
  
  // Check for company data in localStorage when component mounts
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('companyData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setCompanyData(parsedData);
      }
    } catch (error) {
      console.error('Error loading company data:', error);
    }
  }, []);

  // Handle CNPJ validation on blur
  const handleCNPJBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cnpj = event.target.value;
    const result = await validateCNPJ(cnpj, form, setIsValid, setIsValidating);
    
    // After validation, refresh the company data from localStorage
    try {
      const storedData = localStorage.getItem('companyData');
      if (storedData) {
        setCompanyData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading company data after validation:', error);
    }
  };

  const handleCNPJChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Format CNPJ as user types
    const formatted = formatCNPJInput(event.target.value);
    form.setValue('cnpj', formatted);
  };

  // Get company name, segment, and CNPJ (if available)
  const companyName = companyData?.nomeFantasia || companyData?.nome_fantasia || companyData?.razao_social || '';
  const segment = companyData?.cnae_fiscal_descricao || '';
  const cnpj = companyData?.cnpj || form.getValues('cnpj') || '';

  return (
    <>
      {/* Company Card - shows when loading or when company data is available */}
      {(isValidating || (companyData && companyName)) && (
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
