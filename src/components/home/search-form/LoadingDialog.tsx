
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Building2, FileSpreadsheet, BarChart4, Lightbulb, FileCheck } from 'lucide-react';

interface LoadingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  progress: number;
  razaoSocial: string;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({ 
  open, 
  onOpenChange, 
  progress,
  razaoSocial
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gerando seu relatório personalizado</DialogTitle>
          <DialogDescription>
            Estamos analisando os impactos da reforma tributária para sua empresa.
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
                {progress >= 20 ? <span>✓</span> : <Building2 size={14} />}
              </span>
              Identificando seu segmento de atuação
            </p>
            <p className="text-sm font-medium flex items-center">
              <span className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full ${progress >= 40 ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-400'}`}>
                {progress >= 40 ? <span>✓</span> : <FileSpreadsheet size={14} />}
              </span>
              Analisando artigos relevantes para {razaoSocial || 'sua empresa'}
            </p>
            <p className="text-sm font-medium flex items-center">
              <span className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full ${progress >= 60 ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-400'}`}>
                {progress >= 60 ? <span>✓</span> : <BarChart4 size={14} />}
              </span>
              Calculando impacto dos artigos no seu negócio
            </p>
            <p className="text-sm font-medium flex items-center">
              <span className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full ${progress >= 80 ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-400'}`}>
                {progress >= 80 ? <span>✓</span> : <Lightbulb size={14} />}
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
