
import React from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import CompanyInfoForm from './CompanyInfoForm';
import { FormValues } from './types/companyData';

interface FormDialogProps {
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const FormDialog: React.FC<FormDialogProps> = ({ 
  onSubmit, 
  isLoading,
  open,
  onOpenChange
}) => {
  console.log("FormDialog renderizado");
  
  const handleSubmit = (data: FormValues) => {
    console.log("Formulário enviado, fechando modal e iniciando carregamento");
    onSubmit(data);
  };
  
  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Dados para seu relatório personalizado</DialogTitle>
        <DialogDescription>
          Forneça suas informações para gerarmos um relatório personalizado sobre os impactos da reforma tributária para sua empresa.
        </DialogDescription>
      </DialogHeader>
      
      <CompanyInfoForm onSubmit={handleSubmit} isLoading={isLoading} />
    </DialogContent>
  );
};

export default FormDialog;
