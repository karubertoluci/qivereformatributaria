
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../FormDialog';
import { Building2 } from 'lucide-react';

interface CNPJFieldProps {
  form: UseFormReturn<FormValues>;
}

const CNPJField: React.FC<CNPJFieldProps> = ({ form }) => {
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
  );
};

export default CNPJField;
