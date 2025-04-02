
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { FileText } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormValues } from './FormDialog';

interface CompanyInfoFormProps {
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
}

const CompanyInfoForm: React.FC<CompanyInfoFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cnpj: '',
      cnae: '',
      razaoSocial: '',
      nome: '',
      cargo: '',
      email: '',
      telefone: '',
      desafios: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
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
        
        <div className="pt-4">
          <Button 
            type="submit" 
            className="bg-orange-500 hover:bg-orange-600 transition-colors w-full py-6"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </span>
            ) : (
              <span className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Gerar meu relatório personalizado
              </span>
            )}
          </Button>
          <p className="text-xs text-center text-gray-500 mt-2">
            Ao clicar em "Gerar meu relatório personalizado", você concorda com nossa política de privacidade 
            e permite que entremos em contato para apresentar soluções.
          </p>
        </div>
      </form>
    </Form>
  );
};

export default CompanyInfoForm;
