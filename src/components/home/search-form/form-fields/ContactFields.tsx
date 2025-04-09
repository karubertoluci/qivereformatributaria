
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../types/companyData';
import { Mail, Phone } from 'lucide-react';

interface ContactFieldsProps {
  form: UseFormReturn<FormValues>;
}

const ContactFields: React.FC<ContactFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="email" className="block mb-2 font-medium flex items-center">
              <Mail className="h-4 w-4 mr-2 text-orange-500" />
              E-mail corporativo:
            </Label>
            <FormControl>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@empresa.com.br"
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
        name="telefone"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="telefone" className="block mb-2 font-medium flex items-center">
              <Phone className="h-4 w-4 mr-2 text-orange-500" />
              Telefone (opcional):
            </Label>
            <FormControl>
              <Input
                id="telefone"
                placeholder="(XX) XXXXX-XXXX"
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

export default ContactFields;
