
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CompanyLoadingAnimation from './CompanyLoadingAnimation';

interface ReportLoadingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
  companyName: string;
  companyData?: any;
}

const ReportLoadingDialog: React.FC<ReportLoadingDialogProps> = ({
  open,
  onOpenChange,
  onComplete,
  companyName,
  companyData,
}) => {
  console.log("ReportLoadingDialog - Estado do modal:", open);
  console.log("ReportLoadingDialog - Dados da empresa:", companyData);

  // Control body scroll based on dialog state
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  
  // Simulate loading and then call onComplete
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        console.log("Carregamento completo, chamando onComplete");
        onComplete();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [open, onComplete]);
  
  // Certifique-se de que temos um callback válido
  const handleOpenChange = (isOpen: boolean) => {
    console.log("Dialog openChange:", isOpen);
    onOpenChange(isOpen);
    
    // Se o diálogo estiver sendo fechado manualmente, garantimos que o callback é chamado
    if (!isOpen && open) {
      console.log("Dialog fechado manualmente, chamando onComplete");
      onComplete();
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Processando informações</DialogTitle>
        </DialogHeader>
        <CompanyLoadingAnimation 
          companyName={companyName || "sua empresa"} 
          companyData={companyData}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ReportLoadingDialog;
