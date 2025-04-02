
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../FormDialog';

interface PersonalFieldsProps {
  form: UseFormReturn<FormValues>;
}

const PersonalFields: React.FC<PersonalFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="nome" className="block mb-2 font-medium">Seu nome:</Label>
            <FormControl>
              <Input
                id="nome"
                placeholder="Seu nome completo"
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
        name="cargo"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="cargo" className="block mb-2 font-medium">Seu cargo:</Label>
            <FormControl>
              <Input
                id="cargo"
                placeholder="Ex: Diretor Financeiro, CEO, etc."
                className="border-gray-300 focus-visible:ring-primary"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalFields;
