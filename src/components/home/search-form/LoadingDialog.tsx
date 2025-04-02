
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Building2, FileSpreadsheet, BarChart4, Lightbulb, FileCheck, MapPin, Building, BookOpen, BadgeCheck } from 'lucide-react';

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
  const [statusMessages, setStatusMessages] = useState<string[]>([]);

  // Atualiza as mensagens de status dinamicamente baseado no progresso e nos dados da empresa
  useEffect(() => {
    const messages: string[] = [];
    
    if (progress >= 10) {
      messages.push(`Identificando dados do CNPJ ${companyData?.cnpj || '...'}`);
    }
    
    if (progress >= 20 && companyData?.razaoSocial) {
      messages.push(`Encontrando informações sobre ${companyData.razaoSocial}`);
    }
    
    if (progress >= 30 && companyData?.cnaePrincipal) {
      messages.push(`CNAE principal identificado: ${companyData.cnaePrincipal.codigo} - ${companyData.cnaePrincipal.descricao.substring(0, 40)}${companyData.cnaePrincipal.descricao.length > 40 ? '...' : ''}`);
    }
    
    if (progress >= 50 && companyData?.cnaeSecundarios && companyData?.cnaeSecundarios.length > 0) {
      messages.push(`Analisando ${companyData.cnaeSecundarios.length} CNAEs secundários`);
    }
    
    if (progress >= 60) {
      messages.push(`Buscando artigos relevantes para o setor de atuação`);
    }
    
    if (progress >= 70 && companyData?.razaoSocial) {
      messages.push(`Calculando impactos da reforma tributária para ${companyData.razaoSocial}`);
    }
    
    setStatusMessages(messages);
  }, [progress, companyData]);

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
          <div className="mb-4">
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm font-medium flex items-center">
              <span className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full ${progress >= 20 ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-400'}`}>
                {progress >= 20 ? <BadgeCheck size={14} /> : <Building2 size={14} />}
              </span>
              Identificando dados da empresa {companyData?.razaoSocial || companyName || 'sua empresa'}
            </p>
            
            {statusMessages.length > 0 && (
              <div className="bg-gray-50 p-3 rounded-md border border-gray-100 text-sm mb-4">
                {statusMessages.map((message, index) => (
                  <p key={index} className="text-xs text-gray-600 py-1">{message}</p>
                ))}
              </div>
            )}
            
            {progress >= 30 && companyData?.razaoSocial && (
              <div className="bg-gray-50 p-3 rounded-md border border-gray-100 text-sm">
                <p className="flex items-center mb-1">
                  <Building className="h-4 w-4 mr-2 text-orange-500" /> 
                  <strong>Razão Social:</strong> {companyData.razaoSocial}
                </p>
                {companyData.nomeFantasia && (
                  <p className="flex items-center mb-1">
                    <Building2 className="h-4 w-4 mr-2 text-orange-500" /> 
                    <strong>Nome Fantasia:</strong> {companyData.nomeFantasia}
                  </p>
                )}
                {companyData.situacaoCadastral && (
                  <p className="flex items-center mb-1">
                    <FileCheck className="h-4 w-4 mr-2 text-orange-500" /> 
                    <strong>Situação:</strong> {companyData.situacaoCadastral}
                  </p>
                )}
                {companyData.endereco && (
                  <p className="flex items-center mb-1">
                    <MapPin className="h-4 w-4 mr-2 text-orange-500" /> 
                    <strong>Endereço:</strong> {companyData.endereco}
                  </p>
                )}
              </div>
            )}
            
            <p className="text-sm font-medium flex items-center">
              <span className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full ${progress >= 40 ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-400'}`}>
                {progress >= 40 ? <span>✓</span> : <BookOpen size={14} />}
              </span>
              Analisando CNAEs e atividades
            </p>
            
            {progress >= 50 && companyData?.cnaePrincipal && (
              <div className="bg-gray-50 p-3 rounded-md border border-gray-100 text-sm">
                <p className="flex items-center mb-1">
                  <BookOpen className="h-4 w-4 mr-2 text-orange-500" /> 
                  <strong>CNAE Principal:</strong> {companyData.cnaePrincipal.codigo} - {companyData.cnaePrincipal.descricao}
                </p>
                {companyData.cnaeSecundarios && companyData.cnaeSecundarios.length > 0 && (
                  <>
                    <p className="mb-1"><strong>CNAEs Secundários:</strong></p>
                    <ul className="list-disc list-inside ml-6 text-xs">
                      {companyData.cnaeSecundarios.slice(0, 2).map((cnae, index) => (
                        <li key={index}>{cnae.codigo} - {cnae.descricao}</li>
                      ))}
                      {companyData.cnaeSecundarios.length > 2 && (
                        <li>+ {companyData.cnaeSecundarios.length - 2} outros CNAEs</li>
                      )}
                    </ul>
                  </>
                )}
              </div>
            )}
            
            <p className="text-sm font-medium flex items-center">
              <span className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full ${progress >= 60 ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-400'}`}>
                {progress >= 60 ? <span>✓</span> : <FileSpreadsheet size={14} />}
              </span>
              Analisando artigos relevantes para {companyData?.razaoSocial || companyName || 'sua empresa'}
            </p>
            
            <p className="text-sm font-medium flex items-center">
              <span className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full ${progress >= 80 ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-400'}`}>
                {progress >= 80 ? <span>✓</span> : <BarChart4 size={14} />}
              </span>
              Calculando impacto dos artigos no seu negócio
            </p>
            
            <p className="text-sm font-medium flex items-center">
              <span className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full ${progress >= 90 ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-400'}`}>
                {progress >= 90 ? <span>✓</span> : <Lightbulb size={14} />}
              </span>
              Personalizando recomendações
            </p>
            
            <p className="text-sm font-medium flex items-center">
              <span className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full ${progress >= 100 ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-400'}`}>
                {progress >= 100 ? <span>✓</span> : <FileCheck size={14} />}
              </span>
              Finalizando seu relatório
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
