
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

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
          
          <div className="space-y-2">
            <p className="text-sm font-medium flex items-center">
              <span className={`mr-2 ${progress >= 20 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
              Identificando seu segmento de atuação
            </p>
            <p className="text-sm font-medium flex items-center">
              <span className={`mr-2 ${progress >= 40 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
              Analisando artigos relevantes para {razaoSocial || 'sua empresa'}
            </p>
            <p className="text-sm font-medium flex items-center">
              <span className={`mr-2 ${progress >= 60 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
              Calculando impacto dos artigos no seu negócio
            </p>
            <p className="text-sm font-medium flex items-center">
              <span className={`mr-2 ${progress >= 80 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
              Personalizando recomendações
            </p>
            <p className="text-sm font-medium flex items-center">
              <span className={`mr-2 ${progress >= 100 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
              Finalizando seu relatório
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
