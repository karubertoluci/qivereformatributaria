
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

export const formSchema = z.object({
  cnpj: z.string().min(14, { message: 'CNPJ inválido' }).max(18),
  cnae: z.string().min(2, { message: 'CNAE inválido' }),
  razaoSocial: z.string().min(3, { message: 'Razão social deve ter pelo menos 3 caracteres' }),
  nome: z.string().min(2, { message: 'Por favor, informe seu nome' }),
  cargo: z.string().min(2, { message: 'Por favor, informe seu cargo' }),
  email: z.string().email({ message: 'Email inválido' }),
  telefone: z.string().min(10, { message: 'Telefone inválido' }).optional(),
  desafios: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
}

const FormDialog: React.FC<FormDialogProps> = ({ 
  open, 
  onOpenChange, 
  onSubmit, 
  isLoading 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Dados para seu relatório personalizado</DialogTitle>
          <DialogDescription>
            Forneça informações sobre sua empresa para gerarmos um relatório mais preciso sobre os impactos da reforma tributária.
          </DialogDescription>
        </DialogHeader>
        
        <CompanyInfoForm onSubmit={onSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
