
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../FormDialog';

interface ContactFieldsProps {
  form: UseFormReturn<FormValues>;
}

const ContactFields: React.FC<ContactFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="email" className="block mb-2 font-medium">E-mail corporativo:</Label>
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
            <Label htmlFor="telefone" className="block mb-2 font-medium">Telefone (opcional):</Label>
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
      
      <FormField
        control={form.control}
        name="desafios"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="desafios" className="block mb-2 font-medium">Quais são suas maiores dúvidas sobre a reforma tributária? (opcional)</Label>
            <FormControl>
              <Textarea
                id="desafios"
                placeholder="Conte-nos quais aspectos da reforma tributária mais preocupam sua empresa..."
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

export default ContactFields;
