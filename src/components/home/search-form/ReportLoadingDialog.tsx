
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface CompanyData {
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  cnaePrincipal?: {
    codigo: string;
    descricao: string;
  };
}

interface ReportLoadingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
  companyName: string;
  companyData?: CompanyData;
}

const ReportLoadingDialog: React.FC<ReportLoadingDialogProps> = ({ 
  open, 
  onOpenChange, 
  onComplete,
  companyName,
  companyData
}) => {
  const [progress, setProgress] = useState(0);
  const [statusMessages, setStatusMessages] = useState<{message: string, completed: boolean}[]>([]);
  
  // Function to truncate text if it's too long
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  
  const displayName = truncateText(
    companyData?.razaoSocial || companyData?.nomeFantasia || companyName || 'sua empresa',
    30
  );
  
  console.log("ReportLoadingDialog - Estado do modal:", open);
  console.log("ReportLoadingDialog - Dados da empresa:", companyData);
  
  // Reset progress when the modal is opened
  useEffect(() => {
    if (!open) return;
    
    console.log("Dialog de carregamento aberto, iniciando progresso");
    
    // Reset progress when dialog opens
    setProgress(0);
    setStatusMessages([]);
    
    // Sequence of messages and their progress thresholds
    const stages = [
      { threshold: 15, message: `Buscando dados do CNPJ ${companyData?.cnpj || '...'}`, delay: 800 },
      { threshold: 40, message: `CNAE principal identificado: ${companyData?.cnaePrincipal?.codigo || '6463800'}`, delay: 1500 },
      { threshold: 65, message: `Razão Social encontrada: ${truncateText(companyData?.razaoSocial || 'MERCADOLIVRE.COM', 25)}`, delay: 1800 },
      { threshold: 85, message: `Analisando impactos da Reforma Tributária...`, delay: 2000 },
      { threshold: 98, message: `Relatório pronto!`, delay: 1200 }
    ];
    
    // Timer to increment progress gradually
    const progressTimer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        
        // Increment by 1 to 2 points at a time
        const increment = Math.floor(Math.random() * 2) + 1;
        return Math.min(prevProgress + increment, 100);
      });
    }, 120);
    
    // Timers to add messages at specific times
    stages.forEach((stage, index) => {
      setTimeout(() => {
        setStatusMessages(prev => {
          // Check if this message already exists
          if (prev.some(msg => msg.message === stage.message)) return prev;
          
          return [...prev, { message: stage.message, completed: false }];
        });
        
        // Mark as completed after a time
        if (index < stages.length - 1) {
          setTimeout(() => {
            setStatusMessages(prev => 
              prev.map(msg => 
                msg.message === stage.message ? { ...msg, completed: true } : msg
              )
            );
          }, stages[index + 1].delay);
        }
      }, 
      // Accumulate previous delays to create a sequence
      stages.slice(0, index).reduce((sum, s) => sum + s.delay, 800));
    });
    
    // When progress reaches 100%, mark all messages as completed and call onComplete
    const completeTimeout = setTimeout(() => {
      setProgress(100);
      setStatusMessages(prev => prev.map(msg => ({ ...msg, completed: true })));
      
      // Wait 1.5 more seconds before completing
      setTimeout(() => {
        console.log("Loading complete, calling onComplete");
        onComplete();
      }, 1500);
    }, 
    // Define the total time to complete the whole process
    stages.reduce((sum, stage) => sum + stage.delay, 2000) + 1000);
    
    // Clear timers when the component unmounts
    return () => {
      clearInterval(progressTimer);
      clearTimeout(completeTimeout);
      stages.forEach((_, i) => clearTimeout(i));
    };
  }, [open, companyData, companyName, onComplete]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-[90vw] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center">Gerando seu relatório personalizado</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <Progress value={progress} className="h-2 w-full bg-gray-200 rounded-full" />
            <p className="text-xs text-gray-500 text-right mt-1">{progress}%</p>
          </div>
          
          <div className="space-y-4 max-h-[40vh] overflow-auto pr-2">
            {statusMessages.map((status, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full ${status.completed ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'}`}>
                  {status.completed ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <Loader2 size={16} className="animate-spin" />
                  )}
                </div>
                <p className={`text-sm ${status.completed ? 'text-gray-800' : 'text-gray-600'}`}>
                  {status.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportLoadingDialog;
