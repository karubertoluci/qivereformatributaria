
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
  
  // Atualiza o progresso e as mensagens de status com atraso simulado
  useEffect(() => {
    if (!open) return;
    
    console.log("Dialog de carregamento aberto, iniciando progresso");
    
    // Reset progress when dialog opens
    setProgress(0);
    setStatusMessages([]);
    
    const stages = [
      { threshold: 5, message: `Buscando dados do CNPJ ${companyData?.cnpj || '...'}`, delay: 500 },
      { threshold: 30, message: `Razão Social encontrada: ${truncateText(companyData?.razaoSocial || '', 25)}`, delay: 1500 },
      { threshold: 50, message: `CNAE principal identificado: ${companyData?.cnaePrincipal?.codigo || ''}`, delay: 2000 },
      { threshold: 70, message: `Analisando impactos da Reforma Tributária...`, delay: 3000 },
      { threshold: 95, message: `Relatório pronto!`, delay: 1500 }
    ];
    
    // Função para incrementar o progresso gradualmente
    const incrementProgress = () => {
      setProgress((prevProgress) => {
        // Se já chegamos a 100%, pare de incrementar
        if (prevProgress >= 100) return 100;
        
        // Incrementa em 1 a 3 pontos aleatoriamente
        const increment = Math.floor(Math.random() * 3) + 1;
        return Math.min(prevProgress + increment, 100);
      });
    };
    
    // Inicia o timer para incrementar o progresso
    const progressTimer = setInterval(incrementProgress, 100);
    
    // Monitora os estágios de carregamento
    const checkStages = () => {
      stages.forEach((stage, index) => {
        if (progress >= stage.threshold) {
          setTimeout(() => {
            setStatusMessages(prev => {
              // Verifica se a mensagem já existe para não duplicar
              if (!prev.some(msg => msg.message === stage.message)) {
                return [
                  ...prev,
                  { message: stage.message, completed: progress >= (stages[index + 1]?.threshold || 100) }
                ];
              }
              
              // Atualiza o status de "completado" para mensagens existentes
              return prev.map(msg => 
                msg.message === stage.message 
                  ? { ...msg, completed: progress >= (stages[index + 1]?.threshold || 100) } 
                  : msg
              );
            });
          }, stage.delay);
        }
      });
    };
    
    // Verifica estágios a cada avanço no progresso
    const stageTimer = setInterval(checkStages, 200);
    
    // Quando atingir 100%, aguarde mais alguns segundos antes de fechar
    if (progress >= 100) {
      setTimeout(() => {
        clearInterval(progressTimer);
        clearInterval(stageTimer);
        // Garante que todas as mensagens apareçam como completas
        setStatusMessages(prev => prev.map(msg => ({ ...msg, completed: true })));
        
        // Aguarda 2 segundos após completar antes de chamar onComplete
        setTimeout(() => {
          console.log("Carregamento completo, chamando onComplete");
          onComplete();
        }, 2000);
      }, 500);
    }
    
    // Limpa os timers quando o componente for desmontado
    return () => {
      clearInterval(progressTimer);
      clearInterval(stageTimer);
    };
  }, [open, progress, companyData, companyName, onComplete]);

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
