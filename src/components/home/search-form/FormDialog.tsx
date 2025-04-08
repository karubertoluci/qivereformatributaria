
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import CompanyInfoForm from './CompanyInfoForm';
import { z } from 'zod';

// Define the form schema
export const formSchema = z.object({
  nome: z.string().min(2, { message: 'Por favor, informe seu nome' }),
  cargo: z.string().min(2, { message: 'Por favor, informe seu cargo' }),
  email: z.string().email({ message: 'Email inválido' }),
  telefone: z.string().min(10, { message: 'Telefone inválido' }).optional(),
  cnpj: z.string().min(14, { message: 'CNPJ inválido' }).max(18),
  possuiContaQive: z.boolean().default(false),
});

// Additional company data that will be fetched from the API
export interface CompanyData {
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  endereco?: string;
  cnaePrincipal?: {
    codigo: string;
    descricao: string;
  };
  cnaeSecundarios?: {
    codigo: string;
    descricao: string;
  }[];
  situacaoCadastral?: string;
  naturezaJuridica?: string;
}

// Base form values
export type FormValues = z.infer<typeof formSchema> & {
  companyData?: CompanyData;
};

interface FormDialogProps {
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
}

const FormDialog: React.FC<FormDialogProps> = ({ 
  onSubmit, 
  isLoading 
}) => {
  console.log("FormDialog renderizado");
  
  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Dados para seu relatório personalizado</DialogTitle>
        <DialogDescription>
          Forneça suas informações para gerarmos um relatório personalizado sobre os impactos da reforma tributária para sua empresa.
        </DialogDescription>
      </DialogHeader>
      
      <CompanyInfoForm onSubmit={onSubmit} isLoading={isLoading} />
    </DialogContent>
  );
};

export default FormDialog;
