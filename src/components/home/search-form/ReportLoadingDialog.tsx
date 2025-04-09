
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2 } from 'lucide-react';

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
  
  // Reinicia o progresso quando o modal é aberto
  useEffect(() => {
    if (!open) return;
    
    console.log("Dialog de carregamento aberto, iniciando progresso");
    
    // Reset progress when dialog opens
    setProgress(0);
    setStatusMessages([]);
    
    // Sequência de mensagens e seus limiares de progresso
    const stages = [
      { threshold: 5, message: `Buscando dados do CNPJ ${companyData?.cnpj || '...'}`, delay: 500 },
      { threshold: 30, message: `Razão Social encontrada: ${truncateText(companyData?.razaoSocial || '', 25)}`, delay: 1500 },
      { threshold: 50, message: `CNAE principal identificado: ${companyData?.cnaePrincipal?.codigo || ''}`, delay: 2000 },
      { threshold: 70, message: `Analisando impactos da Reforma Tributária...`, delay: 3000 },
      { threshold: 95, message: `Relatório pronto!`, delay: 1500 }
    ];
    
    // Temporizador para incrementar o progresso gradualmente
    const progressTimer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        
        // Incrementa de 1 a 3 pontos por vez
        const increment = Math.floor(Math.random() * 3) + 1;
        return Math.min(prevProgress + increment, 100);
      });
    }, 120);
    
    // Temporizadores para adicionar mensagens em momentos específicos
    stages.forEach((stage, index) => {
      setTimeout(() => {
        setStatusMessages(prev => {
          // Verifica se essa mensagem já existe
          if (prev.some(msg => msg.message === stage.message)) return prev;
          
          return [...prev, { message: stage.message, completed: false }];
        });
        
        // Marca como concluído após um tempo
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
      // Acumula os atrasos anteriores para criar uma sequência
      stages.slice(0, index).reduce((sum, s) => sum + s.delay, 500));
    });
    
    // Quando o progresso atinge 100%, marca todas as mensagens como concluídas e chama onComplete
    const completeTimeout = setTimeout(() => {
      setProgress(100);
      setStatusMessages(prev => prev.map(msg => ({ ...msg, completed: true })));
      
      // Espera mais 2 segundos antes de concluir
      setTimeout(() => {
        console.log("Carregamento completo, chamando onComplete");
        onComplete();
      }, 2000);
    }, 
    // Define o tempo total para completar todo o processo
    stages.reduce((sum, stage) => sum + stage.delay, 2000));
    
    // Limpa os temporizadores quando o componente é desmontado
    return () => {
      clearInterval(progressTimer);
      clearTimeout(completeTimeout);
      stages.forEach((_, i) => clearTimeout(i));
    };
  }, [open, companyData, companyName, onComplete]);

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

export default ReportLoadingDialog;
