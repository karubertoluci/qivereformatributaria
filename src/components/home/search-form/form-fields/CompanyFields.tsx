
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../FormDialog';

interface CompanyFieldsProps {
  form: UseFormReturn<FormValues>;
}

const CompanyFields: React.FC<CompanyFieldsProps> = ({ form }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="cnpj"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="cnpj" className="block mb-2 font-medium">CNPJ da empresa:</Label>
              <FormControl>
                <Input
                  id="cnpj"
                  placeholder="XX.XXX.XXX/XXXX-XX"
                  className="border-gray-300 focus-visible:ring-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="cnae"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="cnae" className="block mb-2 font-medium">CNAE:</Label>
              <FormControl>
                <Input
                  id="cnae"
                  placeholder="Código CNAE"
                  className="border-gray-300 focus-visible:ring-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="razaoSocial"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="razaoSocial" className="block mb-2 font-medium">Razão Social:</Label>
            <FormControl>
              <Input
                id="razaoSocial"
                placeholder="Nome da sua empresa"
                className="border-gray-300 focus-visible:ring-primary"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CompanyFields;
