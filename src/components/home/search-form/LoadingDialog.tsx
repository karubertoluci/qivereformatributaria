
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Building2, FileSpreadsheet, BarChart4, Lightbulb, FileCheck, Badge as BadgeIcon, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CompanyData {
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

interface LoadingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  progress: number;
  companyName: string;
  companyData?: CompanyData;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({ 
  open, 
  onOpenChange, 
  progress,
  companyName,
  companyData
}) => {
  const [statusMessages, setStatusMessages] = useState<{message: string, completed: boolean}[]>([]);
  
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
      messages.push({
        message: `Razão Social encontrada: ${companyData.razaoSocial}`,
        completed: true
      });
    }
    
    if (progress >= 40 && companyData?.cnaePrincipal) {
      messages.push({
        message: `CNAE principal identificado: ${companyData.cnaePrincipal.codigo}`,
        completed: true
      });
      
      messages.push({
        message: `Descrição: ${companyData.cnaePrincipal.descricao}`,
        completed: true
      });
    }
    
    if (progress >= 60) {
      messages.push({
        message: `Analisando impactos da Reforma Tributária para o setor...`,
        completed: progress >= 80
      });
    }
    
    if (progress >= 80) {
      messages.push({
        message: `Personalizando relatório para ${companyData?.razaoSocial || companyName}...`,
        completed: progress >= 95
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gerando seu relatório personalizado</DialogTitle>
          <DialogDescription>
            Estamos analisando os impactos da reforma tributária para {companyData?.razaoSocial || companyData?.nomeFantasia || companyName || 'sua empresa'}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <div className="mb-6">
            <div className="h-2 w-full bg-gray-200 rounded-full mb-2">
              <div 
                className="h-2 bg-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 text-right">{progress}%</p>
          </div>
          
          <div className="space-y-4 max-h-[50vh] overflow-auto pr-2">
            {statusMessages.map((status, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full ${status.completed ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'}`}>
                  {status.completed ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <div className="w-3 h-3 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"></div>
                  )}
                </div>
                <p className={`text-sm ${status.completed ? 'text-gray-800' : 'text-gray-600'}`}>
                  {status.message}
                </p>
              </div>
            ))}
          </div>
          
          {progress >= 40 && companyData?.situacaoCadastral && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-green-50 text-green-700 border-green-200">
                  {companyData.situacaoCadastral}
                </Badge>
                {companyData.naturezaJuridica && (
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                    {companyData.naturezaJuridica}
                  </Badge>
                )}
              </div>
              {progress >= 90 && (
                <p className="text-sm text-gray-600 italic mt-2">
                  Seu relatório está quase pronto. Você será redirecionado em instantes...
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
