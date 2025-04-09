
import React, { useEffect, useRef } from 'react';
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
  
  // Use a ref to track if onComplete has been called
  const hasCompletedRef = useRef(false);

  // Control body scroll based on dialog state
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // Reset the completed status when opening
      hasCompletedRef.current = false;
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
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete();
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [open, onComplete]);
  
  // Ensure onComplete is called when dialog is closed manually
  const handleOpenChange = (isOpen: boolean) => {
    console.log("Dialog openChange:", isOpen);
    onOpenChange(isOpen);
    
    // Se o diálogo estiver sendo fechado manualmente, garantimos que o callback é chamado
    if (!isOpen && open && !hasCompletedRef.current) {
      console.log("Dialog fechado manualmente, chamando onComplete");
      hasCompletedRef.current = true;
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
