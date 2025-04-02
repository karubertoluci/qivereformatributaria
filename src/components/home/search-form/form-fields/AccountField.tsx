
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../FormDialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';

interface AccountFieldProps {
  form: UseFormReturn<FormValues>;
}

const AccountField: React.FC<AccountFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="possuiContaQive"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-gray-100 rounded-md bg-gray-50">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <Label htmlFor="possuiContaQive" className="font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-orange-500" />
              Já possuo uma conta na Qive
            </Label>
            <p className="text-sm text-gray-500">
              Marque esta opção se já possui uma conta na nossa plataforma
            </p>
          </div>
        </FormItem>
      )}
    />
  );
};

export default AccountField;
