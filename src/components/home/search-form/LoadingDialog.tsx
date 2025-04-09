
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface CompanyData {
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  cnaePrincipal?: {
    codigo: string;
    descricao: string;
  };
}

interface LoadingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  progress: number;
  companyName: string;
  companyData?: CompanyData;
}

// Este componente foi substituído pelo ReportLoadingDialog.tsx, mas mantido para compatibilidade
const LoadingDialog: React.FC<LoadingDialogProps> = ({ 
  open, 
  onOpenChange, 
  progress,
  companyName,
  companyData
}) => {
  const [statusMessages, setStatusMessages] = useState<{message: string, completed: boolean}[]>([]);
  
  // Function to truncate text if it's too long - ensure it never breaks into multiple lines
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  
  const displayName = truncateText(
    companyData?.razaoSocial || companyData?.nomeFantasia || companyName || 'sua empresa',
    30 // Reducing max length for better display
  );
  
  // Atualiza as mensagens de status dinamicamente baseado no progresso e nos dados da empresa
  useEffect(() => {
    const messages: {message: string, completed: boolean}[] = [];
    
    if (progress >= 5) {
      messages.push({
        message: `Buscando dados do CNPJ ${companyData?.cnpj || '...'}`,
        completed: progress >= 20
      });
    }
    
    if (progress >= 20 && companyData?.razaoSocial) {
      // Using a shorter truncation for company names to prevent line breaks
      messages.push({
        message: `Razão Social encontrada: ${truncateText(companyData.razaoSocial, 25)}`,
        completed: true
      });
    }
    
    if (progress >= 40 && companyData?.cnaePrincipal) {
      messages.push({
        message: `CNAE principal identificado: ${companyData.cnaePrincipal.codigo}`,
        completed: true
      });
    }
    
    if (progress >= 60) {
      messages.push({
        message: `Analisando impactos da Reforma Tributária...`,
        completed: progress >= 80
      });
    }
    
    if (progress >= 95) {
      messages.push({
        message: `Relatório pronto!`,
        completed: progress >= 100
      });
    }
    
    setStatusMessages(messages);
  }, [progress, companyData, companyName]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-[90vw]">
        <DialogHeader>
          <DialogTitle>Gerando seu relatório personalizado</DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <div className="mb-8">
            <Progress value={progress} className="h-2 w-full bg-gray-200 rounded-full" />
            <p className="text-xs text-gray-500 text-right mt-1">{progress}%</p>
          </div>
          
          <div className="space-y-6 max-h-[60vh] overflow-auto pr-2">
            {statusMessages.map((status, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full ${status.completed ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'}`}>
                  {status.completed ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <div className="w-3 h-3 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"></div>
                  )}
                </div>
                <p className={`text-base ${status.completed ? 'text-gray-800' : 'text-gray-600'} whitespace-nowrap overflow-hidden text-ellipsis`}>
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

export default LoadingDialog;
